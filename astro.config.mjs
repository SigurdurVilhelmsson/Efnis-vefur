// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

// Unicode ranges for the two Fontsource subsets (same as the design system's
// colors_and_type.css). Browsers only download the subset a page needs.
/** @type {[string, ...string[]]} */
const LATIN = [
	'U+0000-00FF', 'U+0131', 'U+0152-0153', 'U+02BB-02BC', 'U+02C6', 'U+02DA', 'U+02DC',
	'U+0304', 'U+0308', 'U+0329', 'U+2000-206F', 'U+20AC', 'U+2122', 'U+2191', 'U+2193',
	'U+2212', 'U+2215', 'U+FEFF', 'U+FFFD',
];
/** @type {[string, ...string[]]} */
const LATIN_EXT = [
	'U+0100-024F', 'U+0259', 'U+1E00-1EFF', 'U+2020', 'U+20A0-20AB', 'U+20AD-20CF',
	'U+2113', 'U+2C60-2C7F', 'U+A720-A7FF',
];

/**
 * Local font variants for one family: 4 weights × 2 subsets.
 * @param {string} file  file-name prefix in src/assets/fonts/, e.g. "dmsans"
 */
function variants(file) {
	const list = [400, 500, 600, 700].flatMap((weight) =>
		[
			{ subset: 'latin', unicodeRange: LATIN },
			{ subset: 'latin-ext', unicodeRange: LATIN_EXT },
		].map(({ subset, unicodeRange }) => ({
			weight,
			style: /** @type {const} */ ('normal'),
			unicodeRange,
			src: /** @type {[string]} */ ([`./src/assets/fonts/${file}-${weight}-${subset}.woff2`]),
		})),
	);
	// Astro's type wants a non-empty tuple.
	return /** @type {[typeof list[number], ...typeof list]} */ (list);
}

// https://astro.build/config
export default defineConfig({
	site: 'https://efn.is',
	output: 'static',
	// WordPress URLs end in a slash (/um-efnis/); keep them identical.
	trailingSlash: 'always',

	// Icelandic at the root, English under /en/.
	i18n: {
		locales: ['is', 'en'],
		defaultLocale: 'is',
		routing: { prefixDefaultLocale: false },
	},

	// Smart punctuation would turn straight quotes typed in the CMS into
	// English “…” quotes on Icelandic pages. Off: text is rendered as typed.
	markdown: {
		processor: satteri({ features: { smartPunctuation: false } }),
	},

	// Self-hosted fonts (no requests to Google). See src/assets/fonts/README.md.
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Source Serif 4',
			cssVariable: '--font-source-serif',
			fallbacks: ['Georgia', 'serif'],
			options: { variants: variants('sourceserif4') },
		},
		{
			provider: fontProviders.local(),
			name: 'DM Sans',
			cssVariable: '--font-dm-sans',
			fallbacks: ['system-ui', 'sans-serif'],
			options: { variants: variants('dmsans') },
		},
	],
});
