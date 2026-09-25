/**
 * Phase 1 PLACEHOLDER entries so every route renders. Replaced by content
 * collections (frettir, vidburdir, radstefnur, stjorn) in Phase 2.
 * Every visible string is a TODO(texti) marker: no invented Icelandic copy.
 */

export interface NewsItem {
	slug: string;
	title: string;
	date: Date;
	summary: string;
	hasEnglish: boolean;
}

export interface EventItem {
	slug: string;
	title: string;
	start: Date;
	place: string;
	registrationUrl?: string;
}

export interface ConferenceItem {
	year: number;
	number: number;
	theme: string;
}

export interface BoardMember {
	name: string;
	role: string;
	order: number;
}

export const news: NewsItem[] = [
	{ slug: '2026-09-01-daemi-1', title: 'TODO(texti): fyrirsögn fréttar 1', date: new Date('2026-09-01'), summary: 'TODO(texti): samantekt fréttar 1', hasEnglish: false },
	{ slug: '2026-08-15-daemi-2', title: 'TODO(texti): fyrirsögn fréttar 2', date: new Date('2026-08-15'), summary: 'TODO(texti): samantekt fréttar 2', hasEnglish: false },
	{ slug: '2026-06-02-daemi-3', title: 'TODO(texti): fyrirsögn fréttar 3', date: new Date('2026-06-02'), summary: 'TODO(texti): samantekt fréttar 3', hasEnglish: false },
	{ slug: '2026-03-20-daemi-4', title: 'TODO(texti): fyrirsögn fréttar 4', date: new Date('2026-03-20'), summary: 'TODO(texti): samantekt fréttar 4', hasEnglish: false },
];

export const events: EventItem[] = [
	{ slug: 'daemi-vidburdur-1', title: 'TODO(texti): heiti viðburðar 1', start: new Date('2026-11-12T16:30:00Z'), place: 'TODO(texti): staður', registrationUrl: 'https://example.org/' },
	{ slug: 'daemi-vidburdur-2', title: 'TODO(texti): heiti viðburðar 2', start: new Date('2027-02-25T17:00:00Z'), place: 'TODO(texti): staður' },
	{ slug: 'daemi-vidburdur-lidinn', title: 'TODO(texti): liðinn viðburður', start: new Date('2026-05-15T12:00:00Z'), place: 'TODO(texti): staður' },
];

export const conferences: ConferenceItem[] = [
	{ year: 2024, number: 10, theme: 'TODO(texti): yfirskrift ráðstefnunnar 2024 (úr Ráðstefna_2024.pdf)' },
];

export const board: BoardMember[] = [
	{ name: 'TODO(texti): nafn', role: 'Formaður', order: 1 },
	{ name: 'TODO(texti): nafn', role: 'Varaformaður', order: 2 },
	{ name: 'TODO(texti): nafn', role: 'Ritari', order: 3 },
	{ name: 'TODO(texti): nafn', role: 'Gjaldkeri', order: 4 },
	{ name: 'TODO(texti): nafn', role: 'Meðstjórnandi', order: 5 },
];
