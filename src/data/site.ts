/**
 * Site-wide settings — Phase 1 stand-in for the `settings` file that becomes
 * editable in the CMS in Phase 2. Fee and email from
 * _input/content/efnis-about-content.md.
 */
export const site = {
	contactEmail: 'efnis1@gmail.com',
	membershipFee: 3000, // kr/ár
	founded: 1999,
	/** Shown in "Næsti viðburður" when no upcoming event exists
	 *  (default text from efnis-homepage-content.md). */
	/** Footer teaser: first sentence of "Merki félagsins" on the About page. */
	emblemTeaser: {
		is: 'Merki Efnís er kolsýrujónin (CO₃²⁻) — efnafræði kalsíts, steindarinnar sem þekkt er um allan heim undir nafninu silfurberg.',
		en: 'The Efnís emblem is the carbonate ion (CO₃²⁻) — the chemistry of calcite, the mineral known worldwide as Iceland spar.',
	},
	nextEventFallback: {
		is: 'Aðalfundur Efnís 2026 verður haldinn í febrúar–mars. Nánari upplýsingar birtast hér á síðunni og í tölvupósti til félagsmanna.',
	},
};
