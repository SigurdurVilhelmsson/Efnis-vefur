/**
 * Languages and UI strings.
 *
 * Icelandic is the default language (served at the site root), English lives
 * under /en/. UI strings are kept here, not in components, so they're easy to
 * review in one place. Icelandic strings come from Siggi's inputs where they
 * exist; the few short UI labels Claude had to write are marked "(UI)" and are
 * listed for review in the Phase 1 summary.
 */

export const LANGS = ['is', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'is';

/** Prefix a site path with the language folder: ('/frettir/', 'en') → '/en/frettir/'. */
export function localePath(path: string, lang: Lang): string {
	const clean = path.startsWith('/') ? path : `/${path}`;
	return lang === DEFAULT_LANG ? clean : `/${lang}${clean === '/' ? '/' : clean}`;
}

export const ui = {
	is: {
		siteName: 'Efnafræðifélag Íslands',
		siteNameEn: 'The Icelandic Chemical Society',
		skipToContent: 'Fara í meginmál', // (UI)
		menu: 'Valmynd', // (UI)
		mainNav: 'Aðalvalmynd', // (UI)
		breadcrumbs: 'Brauðmolar', // (UI)
		home: 'Forsíða',
		membership: 'Félagsaðild',
		emblemMore: 'Merki félagsins',
		otherLang: 'English',
		otherLangCode: 'en',
		news: 'Fréttir',
		allNews: 'Sjá allar fréttir →',
		nextEvent: 'Næsti viðburður',
		events: 'Viðburðir',
		conferences: 'Ráðstefnur',
		register: 'Skrá mig',
		rules: 'Þumalputtareglur',
		allRules: 'Sjá allar 15 reglurnar →',
		swipeHint: '← Strjúktu eða skrunaðu til að fletta →',
		footerQuickLinks: 'Flýtileiðir',
		footerAbout: 'Um félagið',
		bylaws: 'Lög félagsins',
		board: 'Stjórn',
		contact: 'Netfang', // (UI)
	},
	en: {
		siteName: 'The Icelandic Chemical Society',
		siteNameEn: 'The Icelandic Chemical Society',
		skipToContent: 'Skip to main content',
		menu: 'Menu',
		mainNav: 'Main navigation',
		breadcrumbs: 'Breadcrumbs',
		home: 'Home',
		membership: 'Membership',
		emblemMore: 'Our emblem',
		otherLang: 'Íslenska',
		otherLangCode: 'is',
		news: 'News',
		allNews: 'All news →',
		nextEvent: 'Next event',
		events: 'Events',
		conferences: 'Conferences',
		register: 'Register',
		rules: 'Rules of thumb',
		allRules: 'All 15 rules →',
		swipeHint: '← Swipe or scroll →',
		footerQuickLinks: 'Quick links',
		footerAbout: 'About the society',
		bylaws: 'Bylaws (in Icelandic)',
		board: 'Board (in Icelandic)',
		contact: 'Email',
	},
} as const satisfies Record<Lang, Record<string, string>>;

export type UIStrings = (typeof ui)[Lang];

export function t(lang: Lang): UIStrings {
	return ui[lang];
}

export interface NavItem {
	label: string;
	href: string;
}

/** Main navigation (agreed with Siggi, 2026-09-25). English only has pages
 *  that exist in English. */
export const mainNav: Record<Lang, NavItem[]> = {
	is: [
		{ label: 'Efnafræði á Íslandi', href: '/efnafradi-a-islandi/' },
		{ label: 'Menntun', href: '/menntun/' },
		{ label: 'Ráðstefnur', href: '/radstefnur/' },
		{ label: 'Fréttir', href: '/frettir/' },
		{ label: 'Um Efnís', href: '/um-efnis/' },
	],
	en: [{ label: 'About', href: '/en/um-efnis/' }],
};
