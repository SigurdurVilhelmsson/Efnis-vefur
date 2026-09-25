/**
 * Site-wide settings — Phase 1 stand-in for the `settings` file that becomes
 * editable in the CMS in Phase 2. Values agreed with Siggi, 2026-09-25.
 */
export const site = {
	contactEmail: 'efnis1@gmail.com',
	membershipFee: 5000, // kr/ár
	founded: 1999,
	/** Shown in "Næsti viðburður" when no upcoming event exists
	 *  (default text from efnis-homepage-content.md). */
	nextEventFallback: {
		is: 'Aðalfundur Efnís 2026 verður haldinn í febrúar–mars. Nánari upplýsingar birtast hér á síðunni og í tölvupósti til félagsmanna.',
	},
};
