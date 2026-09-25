/**
 * Plain text → safe HTML for copy stored in src/data/: escapes HTML,
 * turns *emphasis* into <em> and email addresses into mailto links.
 * Full Markdown bodies go through Astro's content collections (Phase 2).
 */
export function inlineMarkdown(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/\*([^*]+)\*/g, '<em>$1</em>')
		.replace(/\b([\w.+-]+@[\w-]+(?:\.[\w-]+)+)\b/g, '<a href="mailto:$1">$1</a>');
}
