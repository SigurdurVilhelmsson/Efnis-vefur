import type { Lang } from './i18n';

const LOCALES: Record<Lang, string> = { is: 'is-IS', en: 'en-GB' };

/** "25. október 2024" (is) / "25 October 2024" (en). */
export function formatDate(date: Date, lang: Lang): string {
	return new Intl.DateTimeFormat(LOCALES[lang], {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'Atlantic/Reykjavik',
	}).format(date);
}

/** "25. október 2024 kl. 17:00" style: date plus 24-hour time. */
export function formatDateTime(date: Date, lang: Lang): string {
	return new Intl.DateTimeFormat(LOCALES[lang], {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timeZone: 'Atlantic/Reykjavik',
	}).format(date);
}

/**
 * An event's start: date and time, or the date alone when the time is 00:00
 * (the convention for "time not decided yet"). Iceland is UTC all year.
 */
export function formatEventStart(date: Date, lang: Lang): string {
	const midnight = date.getUTCHours() === 0 && date.getUTCMinutes() === 0;
	return midnight ? formatDate(date, lang) : formatDateTime(date, lang);
}

/** ISO string for the <time datetime> attribute. */
export function isoDate(date: Date): string {
	return date.toISOString();
}

/** Icelandic number format: 5000 → "5.000". */
export function formatNumber(n: number, lang: Lang): string {
	return new Intl.NumberFormat(LOCALES[lang]).format(n);
}
