/** A block of page copy: optional H2, paragraphs, an optional list, links. */
export interface Section {
	/** Anchor id, so other pages can link to the section. */
	id?: string;
	heading?: string;
	paragraphs?: string[];
	list?: string[];
	after?: string[];
	/** Lines rendered with <br> (addresses, contact blocks). */
	lines?: string[];
	links?: { label: string; href: string }[];
}
