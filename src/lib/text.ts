/**
 * Plain text → safe HTML for copy stored in src/data/: escapes HTML,
 * turns *emphasis* into <em> and email addresses into mailto links.
 * Full Markdown bodies go through Astro's content collections.
 */
export function inlineMarkdown(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/\*([^*]+)\*/g, '<em>$1</em>')
		.replace(/\b([\w.+-]+@[\w-]+(?:\.[\w-]+)+)\b/g, '<a href="mailto:$1">$1</a>');
}

/**
 * Multi-line text from a CMS "text" field → safe HTML paragraphs. A blank
 * line starts a new paragraph.
 */
export function paragraphs(text: string): string[] {
	return text
		.split(/\n\s*\n/)
		.map((p) => p.trim())
		.filter(Boolean)
		.map(inlineMarkdown);
}
