/**
 * Zod schemas for every content collection.
 *
 * Each schema here has a matching collection (or file) in
 * public/admin/config.yml; `npm run check:cms` fails if a field exists in one
 * but not the other. Kept in a plain module (not src/content.config.ts) so
 * that check script can import it outside Astro.
 *
 * Invalid content fails `npm run build`, so a broken edit never goes live:
 * Cloudflare keeps serving the last good deploy.
 */
import { z } from 'astro/zod';

/** The CMS (or Decap, the fallback) may write '' or null for an empty field. */
const blankToUndefined = (value: unknown) => (value === '' || value === null ? undefined : value);

/** An optional field where '' and null count as "not set". */
function optional<T extends z.ZodType>(schema: T) {
	return z.preprocess(blankToUndefined, schema.optional());
}

const text = z.string().trim().min(1);

/** Uploaded media lives in public/images/uploads/ and is referenced by URL path. */
const imagePath = z.string().regex(/^\/images\/uploads\/[^/]+$/, {
	error: 'Myndir eiga að vera í /images/uploads/',
});

/** Uploaded documents (e.g. an abstract template) share the images folder. */
const uploadPath = z.string().regex(/^\/images\/uploads\/[^/]+$/, {
	error: 'Skrár eiga að vera í /images/uploads/',
});

/** The 15 rule icons in src/icons/. */
export const RULE_ICONS = [
	'rule-01-natturulegt',
	'rule-02-skammtur',
	'rule-03-enumera',
	'rule-04-thungmalmur',
	'rule-05-geislun',
	'rule-06-co2',
	'rule-07-lifraent',
	'rule-08-jardhitavatn',
	'rule-09-klor',
	'rule-10-efnavorur',
	'rule-11-ph',
	'rule-12-surtregn',
	'rule-13-vetni',
	'rule-14-aburdur',
	'rule-15-albraeddsla',
] as const;

// ——— Folder collections: one Markdown file per entry and language ———

export const frettir = z.object({
	title: text,
	date: z.coerce.date(),
	summary: optional(text),
	image: optional(imagePath),
	image_alt: optional(text),
	featured: z.boolean().default(false),
});

export const vidburdir = z.object({
	title: text,
	start: z.coerce.date(),
	place: text,
	registration_url: optional(z.url()),
});

export const sidur = z.object({
	title: text,
	description: optional(text),
});

export const radstefnur = z.object({
	number: z.number().int().positive(),
	year: z.number().int().min(1999),
	date: z.coerce.date(),
	/** Unknown for the earliest conferences. */
	theme: optional(text),
	venue: optional(text),
	/** Registration and abstract submission happen in external forms; the
	 * site only links to them. Buttons disappear after the deadline. */
	registration_url: optional(z.url()),
	registration_deadline: optional(z.coerce.date()),
	abstract_url: optional(z.url()),
	abstract_deadline: optional(z.coerce.date()),
	abstract_template: optional(uploadPath),
	programme: z
		.array(
			z.object({
				time: text,
				code: optional(text),
				title: text,
				speaker: optional(text),
			}),
		)
		.default([]),
	sponsors: z
		.array(
			z.object({
				name: text,
				logo: optional(imagePath),
				url: optional(z.url()),
			}),
		)
		.default([]),
	prices: z.array(z.object({ label: text, amount: text })).default([]),
	committee: z.array(text).default([]),
});

export const stjorn = z.object({
	name: text,
	role: text,
	order: z.number().int(),
});

export const reglur = z.object({
	n: z.number().int().min(1),
	title: text,
	card_title: text,
	card_text: text,
	icon: z.enum(RULE_ICONS),
});

// ——— Single files ———

export const settings = z.object({
	contact_email: z.email(),
	membership_fee: z.number().int().nonnegative(),
	next_event_fallback: text,
	next_event_fallback_en: optional(text),
	emblem_teaser: text,
	emblem_teaser_en: text,
});

export const forsida = z.object({
	hero: z.object({
		eyebrow: text,
		title: text,
		tagline: text,
		intro: text,
	}),
	cards: z.array(z.object({ title: text, text: text, link: text })).min(1),
	rules: z.object({ title: text, text: text }),
	membership: z.object({
		title: text,
		text: text,
		link_label: text,
		link: text,
	}),
});

export const forsida_en = z.object({
	title: text,
	description: text,
	intro: text,
});

/** Every schema by collection name (used by content.config.ts and the check script). */
export const schemas = {
	frettir,
	vidburdir,
	sidur,
	radstefnur,
	stjorn,
	reglur,
	settings,
	forsida,
	forsida_en,
};
