/**
 * Icelandic-aware slugs, matching the existing WordPress URLs:
 * þ→th, ð→d, æ→ae, ö→o, other diacritics stripped (á→a, í→i, …).
 */
const MAP: Record<string, string> = { þ: 'th', ð: 'd', æ: 'ae', ö: 'o' };

export function slugify(input: string): string {
	return input
		.toLowerCase()
		.replace(/[þðæö]/g, (ch) => MAP[ch] ?? ch)
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}
