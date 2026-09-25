/**
 * Minimal inline Markdown for short draft texts: HTML-escapes the input and
 * turns *emphasis* into <em>. Full Markdown bodies go through Astro's content
 * collections from Phase 2 onward.
 */
export function inlineMarkdown(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
