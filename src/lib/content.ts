/**
 * Helpers for reading content collections (see src/content.config.ts).
 *
 * Translated collections have one file per language, so an entry id looks
 * like "um-efnis.is" or "2024-10-25-frett.en". splitId() turns that into
 * { slug, lang }. Missing required content throws, so the build fails
 * instead of publishing a page with holes in it.
 */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import type { Lang } from './i18n';

export type Translated = 'frettir' | 'vidburdir' | 'sidur' | 'radstefnur';

export function splitId(id: string): { slug: string; lang: Lang } {
	const match = /^(.+)\.(is|en)$/.exec(id);
	if (!match) throw new Error(`Content file name must end in .is.md or .en.md: "${id}"`);
	return { slug: match[1], lang: match[2] as Lang };
}

/** Entries of one language, each with its slug (file name without language). */
export async function entriesIn<C extends Translated>(collection: C, lang: Lang) {
	const all = await getCollection(collection);
	return all
		.map((entry) => ({ entry: entry as CollectionEntry<C>, ...splitId(entry.id) }))
		.filter((item) => item.lang === lang);
}

/** True if the entry `slug` exists in `lang`. */
export async function exists(collection: Translated, slug: string, lang: Lang): Promise<boolean> {
	// getCollection, not getEntry: getEntry logs a warning for every missing translation.
	return (await getCollection(collection)).some((entry) => entry.id === `${slug}.${lang}`);
}

/** A page (sidur) entry that must exist; throws otherwise. */
export async function requirePage(slug: string, lang: Lang = 'is') {
	const entry = await getEntry('sidur', `${slug}.${lang}`);
	if (!entry) throw new Error(`Missing page: src/content/sidur/${slug}.${lang}.md`);
	return entry;
}

/** The single settings file. */
export async function getSettings() {
	const entry = await getEntry('settings', 'site');
	if (!entry) throw new Error('Missing settings file: src/content/settings/site.yml');
	return entry.data;
}

// ——— News ———

/**
 * News file names start with the date ("2024-10-25-slug"), which keeps them
 * sorted in the folder; the URL is the part after the date (/frettir/slug/),
 * like the WordPress URLs.
 */
export function newsSlug(fileSlug: string): string {
	return fileSlug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

/** News in one language, newest first, with URL slugs. Throws on duplicate URLs. */
export async function newsIn(lang: Lang) {
	const items = (await entriesIn('frettir', lang)).map((item) => ({ ...item, urlSlug: newsSlug(item.slug) }));
	const seen = new Map<string, string>();
	for (const item of items) {
		const other = seen.get(item.urlSlug);
		if (other) throw new Error(`Two news items would get the URL /frettir/${item.urlSlug}/: ${other} and ${item.entry.id}`);
		seen.set(item.urlSlug, item.entry.id);
	}
	return items.sort((a, b) => b.entry.data.date.getTime() - a.entry.data.date.getTime());
}

// ——— Dates ———

/** Midnight at the start of today, in ms. Iceland is UTC all year. */
export function startOfToday(now = new Date()): number {
	return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
}

/** A deadline is open through the whole of its day; no deadline means open. */
export function isOpen(deadline: Date | undefined, now = new Date()): boolean {
	return !deadline || deadline.getTime() >= startOfToday(now);
}

// ——— Events ———

/**
 * Events in one language, split into upcoming (soonest first) and past (latest first).
 * An event counts as upcoming for the whole of its day, so the daily rebuild
 * just after midnight doesn't drop it before it starts. Iceland is UTC all year.
 */
export async function eventsIn(lang: Lang, now = new Date()) {
	const items = await entriesIn('vidburdir', lang);
	const time = (item: (typeof items)[number]) => item.entry.data.start.getTime();
	const today = startOfToday(now);
	return {
		upcoming: items.filter((i) => time(i) >= today).sort((a, b) => time(a) - time(b)),
		past: items.filter((i) => time(i) < today).sort((a, b) => time(b) - time(a)),
	};
}

// ——— Fixed pages ———

/**
 * Where each fixed page (sidur entry) lives. The English version, if an
 * editor adds one, is served at /en + the same path.
 */
export const PAGE_PATHS: Record<string, { path: string; parent?: string }> = {
	'efnafradi-a-islandi': { path: '/efnafradi-a-islandi/' },
	menntun: { path: '/menntun/' },
	thumalputtareglur: { path: '/thumalputtareglur/' },
	'um-efnis': { path: '/um-efnis/' },
	felagsadild: { path: '/um-efnis/felagsadild/', parent: 'um-efnis' },
	log: { path: '/um-efnis/log/', parent: 'um-efnis' },
};

// ——— Conferences ———

export function conferenceTitle(data: { number: number; year: number }, lang: Lang): string {
	return lang === 'is' ? `${data.number}. ráðstefna Efnís — ${data.year}` : `Efnís Conference ${data.year}`;
}
