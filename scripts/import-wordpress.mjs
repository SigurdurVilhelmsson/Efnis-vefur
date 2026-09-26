/**
 * One-off import of the public content of the old WordPress site (efn.is).
 *
 * Read-only: GET requests to the public REST API (https://efn.is/wp-json/wp/v2/),
 * no credentials. Nothing on the WordPress site is changed.
 *
 * Writes:
 *  - wp-import/pages/*.md, wp-import/posts/*.md — every published page and post,
 *    converted to Markdown, for review. Not part of the site.
 *  - src/content/frettir/ — news items. The WordPress front page was the news
 *    archive (one <h2> + date per item), so it is split into one file per item.
 *  - src/content/radstefnur/ — conferences 1–9 from "Fyrri ráðstefnur", and the
 *    English page of the 9th conference (2022).
 *  - src/content/stjorn/ — the current board.
 *  - public/images/uploads/ — every image the content refers to.
 *  - redirects-draft.txt — old URL → new URL (Cloudflare _redirects syntax, not active).
 *  - docs/wordpress-import.md — report: what went where, what needs a human decision.
 *
 * Files that already exist in src/content/ are kept (Siggi's inputs win over
 * WordPress) unless --overwrite is given. Everything else is regenerated.
 * Every generated entry is checked against its Zod schema before it is written.
 *
 * Run: npm run import:wp            (or: npm run import:wp -- --overwrite)
 */
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import TurndownService from 'turndown';
import { stringify } from 'yaml';
import { schemas } from '../src/lib/schemas.ts';

const API = 'https://efn.is/wp-json/wp/v2';
const ROOT = new URL('../', import.meta.url);
const OVERWRITE = process.argv.includes('--overwrite');
/** Cloudflare Pages refuses files over 25 MiB. */
const PAGES_FILE_LIMIT = 25 * 1024 * 1024;

/** Where each WordPress page lives on the new site (by WordPress slug). Missing = no home yet. */
const NEW_PATH = {
	'frettir-fra-starfi-felagsins': '/frettir/', // the WordPress front page (/), a news archive
	'um-felagid': '/um-efnis/',
	'log-efnafraedifelags-islands': '/um-efnis/log/',
	'stjorn-efnafraedifelags-islands': '/um-efnis/stjorn/',
	'hafdu-samband-contact-us': '/um-efnis/',
	'fyrri-radstefnur-a-vegum-efnis': '/radstefnur/',
	'efnis-conferences': '/radstefnur/',
	'9th-efnis-conference': '/en/radstefnur/2022/',
	'efnis-conference-2024': '/radstefnur/2024/',
};

/**
 * Venue (nominative) of conferences 1–9. "Fyrri ráðstefnur" gives most venues
 * in the dative ("á Hótel Sögu"), which reads wrongly as a field value; the
 * 2022 venue comes from the English 9th-conference page.
 */
const VENUES = {
	1: 'Reykholt',
	2: 'Hótel KEA, Akureyri',
	3: 'Nesjavellir',
	4: 'Hótel Loftleiðir',
	5: 'Hótel Loftleiðir',
	6: 'Hótel Saga',
	7: 'Grand Hótel',
	9: 'Askja, Sturlugata 7, 101 Reykjavík',
};

const MONTHS_IS = ['janúar', 'febrúar', 'mars', 'apríl', 'maí', 'júní', 'júlí', 'ágúst', 'september', 'október', 'nóvember', 'desember'];
const MONTHS_EN = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

// ——— Small helpers ———

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

function decode(text) {
	return text.replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (match, e) => {
		if (e[0] !== '#') return ENTITIES[e] ?? match;
		return String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
	});
}

/** Text content of an HTML fragment, whitespace collapsed. */
const plain = (html) => decode(html.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();

/** URL slug rule from CLAUDE.md: þ→th, ð→d, æ→ae, ö→o, other diacritics stripped. */
function slugify(text) {
	return text
		.toLowerCase()
		.replace(/þ/g, 'th')
		.replace(/ð/g, 'd')
		.replace(/æ/g, 'ae')
		.replace(/ö/g, 'o')
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

const pad = (n) => String(n).padStart(2, '0');

/** "8. september, 2024" or "October 25th 2024" → "2024-09-08". Throws if neither. */
function parseDate(text) {
	let m = /^(\d{1,2})\.\s*([a-záéíóúýþæö]+),?\s+(\d{4})$/i.exec(text);
	if (m && MONTHS_IS.includes(m[2].toLowerCase())) return `${m[3]}-${pad(MONTHS_IS.indexOf(m[2].toLowerCase()) + 1)}-${pad(m[1])}`;
	m = /^([a-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})$/i.exec(text);
	if (m && MONTHS_EN.includes(m[1].toLowerCase())) return `${m[3]}-${pad(MONTHS_EN.indexOf(m[1].toLowerCase()) + 1)}-${pad(m[2])}`;
	throw new Error(`Can't read the date "${text}"`);
}

async function fetchOk(url) {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`GET ${url} → ${res.status}`);
	return res;
}

/** Every item of a REST collection, following x-wp-totalpages. */
async function getAll(type) {
	const items = [];
	for (let page = 1, pages = 1; page <= pages; page++) {
		const res = await fetchOk(`${API}/${type}?per_page=100&page=${page}`);
		pages = Number(res.headers.get('x-wp-totalpages')) || 1;
		items.push(...(await res.json()));
	}
	return items;
}

// ——— Fetch ———

console.log('Reading the WordPress REST API…');
const [pages, posts, media] = await Promise.all([getAll('pages'), getAll('posts'), getAll('media')]);
const published = (items) => items.filter((i) => i.status === 'publish');
const wpItems = [...published(pages).map((p) => ({ ...p, kind: 'pages' })), ...published(posts).map((p) => ({ ...p, kind: 'posts' }))];
const byId = new Map(wpItems.map((i) => [i.id, i]));
const mediaSize = new Map(media.map((m) => [m.source_url, m.media_details?.filesize ?? null]));

// ——— Report state ———

const report = {
	written: [], // [path, what]
	kept: [], // existing files left alone
	images: new Map(), // original URL → local path
	documents: new Map(), // URL → size in bytes (or null)
	unresolved: new Set(), // links to efn.is pages with no new home
	noAlt: 0,
};

/** Paths of the news items that replace WordPress posts, by post slug (filled in below). */
const postPaths = new Map();

// ——— Links and media ———

/** Local path for an uploaded image: flat folder, "YYYY-MM-" prefix so equal names from different months don't collide. */
function localImage(url) {
	const m = /\/wp-content\/uploads\/(\d{4})\/(\d{2})\/([^/]+)$/.exec(url.pathname);
	if (!m) throw new Error(`Unexpected upload URL: ${url}`);
	const local = `/images/uploads/${m[1]}-${m[2]}-${m[3]}`;
	report.images.set(`https://efn.is${url.pathname}`, local);
	return local;
}

/** New path for a link to an efn.is page, or null. */
function pagePath(url) {
	const id = url.searchParams.get('page_id') ?? url.searchParams.get('p');
	const slug = id ? byId.get(Number(id))?.slug : url.pathname.replace(/^\/|\/$/g, '');
	if (url.pathname === '/' && !id) return '/';
	return NEW_PATH[slug] ?? postPaths.get(slug) ?? null;
}

/** Rewrites one link or image URL for the new site. */
function mapUrl(href) {
	let url;
	try {
		url = new URL(href, 'https://efn.is/');
	} catch {
		return href;
	}
	// Outlook "safe links" wrap the real address.
	if (url.hostname.endsWith('safelinks.protection.outlook.com') && url.searchParams.get('url')) {
		return mapUrl(url.searchParams.get('url'));
	}
	// Jetpack's image CDN: i0.wp.com/efn.is/wp-content/… → the original file.
	if (/^i\d\.wp\.com$/.test(url.hostname)) url = new URL(`https://${url.pathname.slice(1)}`);
	if (!/^(www\.)?efn\.is$/.test(url.hostname)) return url.href;

	if (url.pathname.startsWith('/wp-content/uploads/')) {
		if (/\.(jpe?g|png|gif|webp|svg)$/i.test(url.pathname)) return localImage(url);
		const original = `https://efn.is${url.pathname}`;
		report.documents.set(original, mediaSize.get(original) ?? null);
		return original; // documents stay on efn.is for now (see the report)
	}
	const path = pagePath(url);
	if (path) return path;
	report.unresolved.add(url.href);
	return url.href;
}

// ——— HTML → Markdown ———

const turndown = new TurndownService({
	headingStyle: 'atx',
	bulletListMarker: '-',
	emDelimiter: '_',
	strongDelimiter: '**',
	br: '\\',
});
turndown.remove(['style', 'script', 'object']);
// wp-block-file: keep the file link, drop the "Download" button next to it.
turndown.addRule('fileButton', {
	filter: (node) => node.nodeName === 'A' && /wp-block-file__button/.test(node.getAttribute('class') ?? ''),
	replacement: () => '',
});
turndown.addRule('link', {
	filter: (node) => node.nodeName === 'A' && node.getAttribute('href'),
	replacement: (content, node) => (content.trim() ? `[${content.trim()}](${mapUrl(node.getAttribute('href'))})` : ''),
});
turndown.addRule('image', {
	filter: 'img',
	replacement: (_, node) => {
		const alt = (node.getAttribute('alt') ?? '').trim();
		if (!alt) report.noAlt++;
		return `![${alt}](${mapUrl(node.getAttribute('src'))})`;
	},
});
turndown.addRule('figcaption', {
	filter: 'figcaption',
	replacement: (content) => `\n\n${content.trim()}\n\n`,
});

/** Converts Gutenberg HTML to Markdown. */
function toMarkdown(html) {
	const cleaned = html
		// A paragraph of underscores was used as a separator line.
		.replace(/<p[^>]*>\s*_{10,}\s*<\/p>/g, '<hr>')
		.replace(/&nbsp;/g, ' ')
		// Two line breaks in a row were used as a paragraph break; one at the end is noise.
		.replace(/(<br\s*\/?>\s*){2,}/g, '</p><p>')
		.replace(/<br\s*\/?>\s*<\/p>/g, '</p>');
	return turndown
		.turndown(cleaned)
		.replace(/ /g, ' ')
		.replace(/[ \t]+$/gm, '')
		.replace(/\n{3,}/g, '\n\n')
		.trim();
}

// ——— Writing files ———

async function write(relPath, text) {
	const url = new URL(relPath, ROOT);
	await mkdir(new URL('.', url), { recursive: true });
	await writeFile(url, text);
}

/** Writes a content entry after checking it against its schema. Keeps existing files unless --overwrite. */
async function writeEntry(collection, relPath, data, body, what) {
	const result = schemas[collection].safeParse(data);
	if (!result.success) throw new Error(`${relPath} does not match the ${collection} schema:\n${result.error.message}`);
	if (existsSync(new URL(relPath, ROOT)) && !OVERWRITE) {
		report.kept.push([relPath, what]);
		return;
	}
	const text = body === null ? stringify(data) : `---\n${stringify(data)}---\n\n${body}\n`;
	await write(relPath, text);
	report.written.push([relPath, what]);
}

// ——— News: the front page, split into items ———

const front = wpItems.find((i) => i.slug === 'frettir-fra-starfi-felagsins');
const news = front.content.rendered
	.split(/<h2[^>]*>/)
	.slice(1)
	.map((section) => {
		const [titleHtml, rest] = section.split(/<\/h2>/);
		const title = plain(titleHtml);
		const dateMatch = /<p[^>]*>\s*<em>([^<]+)<\/em>\s*<\/p>/.exec(rest);
		if (!dateMatch) throw new Error(`News item "${title}" has no date line`);
		const date = parseDate(plain(dateMatch[1]));
		// A WordPress post with the same date is the same item; keep its slug (and URL).
		const post = published(posts).find((p) => p.date.slice(0, 10) === date);
		const slug = post?.slug ?? slugify(title);
		if (post) postPaths.set(post.slug, `/frettir/${slug}/`);
		return { title, date, slug, post, html: rest.replace(dateMatch[0], '') };
	});

for (const item of news) {
	await writeEntry(
		'frettir',
		`src/content/frettir/${item.date}-${item.slug}.is.md`,
		{ title: item.title, date: item.date },
		toMarkdown(item.html),
		item.post ? `news (WordPress front page; also the post /${item.post.slug}/)` : 'news (WordPress front page)',
	);
}

// ——— Conferences 1–9 ———

const pastPage = wpItems.find((i) => i.slug === 'fyrri-radstefnur-a-vegum-efnis');
const conferences = pastPage.content.rendered
	.split(/<h2[^>]*>/)
	.slice(1)
	.map((section) => {
		const [headingHtml, rest] = section.split(/<\/h2>/);
		const heading = plain(headingHtml);
		const h = /^(\d+)\. Ráðstefna Efnís\s*(?:\((\d{4})\)|(\d{4}))(?:\s*–\s*(.+))?$/.exec(heading);
		if (!h) throw new Error(`Can't read the conference heading "${heading}"`);
		const text = plain(rest);
		const d = /haldin\s+(?:árið\s+)?(\d{1,2})\.(?:\s*-\s*\d{1,2}\.)?\s+([a-záéíóúýþæö]+)\s+(?:árið\s+)?(\d{4})/i.exec(text);
		if (!d) throw new Error(`Can't read the date of "${heading}": ${text}`);
		const number = Number(h[1]);
		return {
			number,
			year: Number(h[2] ?? h[3]),
			date: parseDate(`${d[1]}. ${d[2]} ${d[3]}`),
			theme: h[4],
			venue: VENUES[number],
			body: toMarkdown(rest),
		};
	});

for (const c of conferences) {
	const { body, ...fields } = c;
	const data = Object.fromEntries(Object.entries(fields).filter(([, v]) => v !== undefined));
	await writeEntry('radstefnur', `src/content/radstefnur/${c.year}.is.md`, data, body, `conference ${c.number} ("Fyrri ráðstefnur")`);
}

// The 9th conference's own page is in English: its English version.
const ninth = wpItems.find((i) => i.slug === '9th-efnis-conference');
const ninthIs = conferences.find((c) => c.number === 9);
await writeEntry(
	'radstefnur',
	'src/content/radstefnur/2022.en.md',
	{
		number: 9,
		year: 2022,
		date: ninthIs.date,
		theme: plain(ninth.title.rendered).split(' – ')[1],
		venue: ninthIs.venue,
	},
	toMarkdown(ninth.content.rendered),
	'conference 9, English (WordPress page /9th-efnis-conference/)',
);

// ——— Board: the current one, at the top of the Stjórn page ———

const boardPage = wpItems.find((i) => i.slug === 'stjorn-efnafraedifelags-islands');
const board = /<strong>(Stjórn EFNÍS[^<]*)<\/strong>\s*<\/p>\s*<ul[^>]*>([\s\S]*?)<\/ul>/.exec(boardPage.content.rendered);
if (!board) throw new Error('Can\'t find the current board on the Stjórn page');
const members = [...board[2].matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m, i) => {
	const text = plain(m[1]);
	const [role, name] = text.includes(': ') ? text.split(': ') : ['TODO(texti): hlutverk', text];
	return { name, role, order: i + 1 };
});
for (const m of members) {
	await writeEntry('stjorn', `src/content/stjorn/${slugify(m.name)}.yml`, m, null, `board member (${plain(board[1])})`);
}

// ——— Staging: every page and post, for review ———

for (const item of wpItems) {
	const front = {
		title: plain(item.title.rendered),
		wp_id: item.id,
		wp_url: item.link,
		date: item.date.slice(0, 10),
		modified: item.modified.slice(0, 10),
		new_path: NEW_PATH[item.slug] ?? postPaths.get(item.slug) ?? null,
	};
	await write(`wp-import/${item.kind}/${item.slug}.md`, `---\n${stringify(front)}---\n\n${toMarkdown(item.content.rendered)}\n`);
}

// ——— Images ———

let downloaded = 0;
for (const [original, local] of report.images) {
	const target = new URL(`public${local}`, ROOT);
	if (existsSync(target)) continue;
	const res = await fetchOk(original);
	await mkdir(new URL('.', target), { recursive: true });
	await writeFile(target, Buffer.from(await res.arrayBuffer()));
	downloaded++;
}

// ——— Redirects draft ———

const oldUrl = (item) => new URL(item.link).pathname;
const redirectLines = [
	'# DRAFT — not active. Old WordPress URLs → new URLs, in Cloudflare Pages',
	'# _redirects syntax. Generated by scripts/import-wordpress.mjs.',
	'# "# TODO" lines have no page on the new site yet.',
	'# Links of the form /?page_id=N can\'t be redirected here (_redirects',
	'# ignores query strings); see docs/wordpress-import.md.',
	'',
];
for (const item of wpItems) {
	const from = oldUrl(item);
	const to = NEW_PATH[item.slug] ?? postPaths.get(item.slug);
	if (from === '/') redirectLines.push(`# / stays the front page (it was the news archive; that is now /frettir/)`);
	else if (to) redirectLines.push(`${from} ${to} 301`);
	else redirectLines.push(`# TODO ${from}  (${plain(item.title.rendered)})`);
}
await write('redirects-draft.txt', `${redirectLines.join('\n')}\n`);

// ——— Report ———

const mb = (bytes) => (bytes == null ? '?' : `${(bytes / 1024 / 1024).toFixed(1)} MB`);
const table = (rows) => rows.map((r) => `| ${r.join(' | ')} |`).join('\n');
const docs = [...report.documents].sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0));
const docsTotal = docs.reduce((sum, [, s]) => sum + (s ?? 0), 0);

const md = `# WordPress import report

Generated by \`scripts/import-wordpress.mjs\` on ${new Date().toISOString().slice(0, 10)}. Do not edit by hand; re-run the script.

Source: ${wpItems.length} published items (${published(pages).length} pages, ${published(posts).length} posts) and ${media.length} media files from the public REST API.

## Where each WordPress item went

Every item is also in \`wp-import/\` as Markdown, whether or not it has a home on the new site.

| WordPress URL | Title | New URL |
| --- | --- | --- |
${table(wpItems.map((i) => [oldUrl(i), plain(i.title.rendered), NEW_PATH[i.slug] ?? postPaths.get(i.slug) ?? '**none yet**']))}

## Content files written

${report.written.length ? table([['File', 'From'], ['---', '---'], ...report.written.map(([p, w]) => [`\`${p}\``, w])]) : 'None.'}

${report.kept.length ? `### Kept (already existed; run with \`--overwrite\` to replace)\n\n${report.kept.map(([p, w]) => `- \`${p}\` — ${w}`).join('\n')}\n` : ''}
## Images

${report.images.size} images referenced, ${downloaded} downloaded this run, to \`public/images/uploads/\` as \`YYYY-MM-<original name>\` (the upload folder is flat; \`image.png\` exists in two months). ${report.noAlt} image tags have no alt text.

## Documents (PDF, Word)

Linked documents are **not** copied: links still point at efn.is. ${docs.length} files, ${mb(docsTotal)} in all; Cloudflare Pages refuses files over 25 MiB (marked ⚠).

| File | Size |
| --- | --- |
${table(docs.map(([u, s]) => [u.replace('https://efn.is/wp-content/uploads/', ''), `${mb(s)}${s > PAGES_FILE_LIMIT ? ' ⚠' : ''}`]))}

## Links to efn.is pages with no new home

${report.unresolved.size ? [...report.unresolved].map((u) => `- ${u}`).join('\n') : 'None.'}
`;
await write('docs/wordpress-import.md', md);

console.log(`Done: ${report.written.length} content files written, ${report.kept.length} kept, ${downloaded} images downloaded.`);
console.log('Report: docs/wordpress-import.md');
