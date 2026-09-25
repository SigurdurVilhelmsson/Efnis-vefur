/**
 * Homepage copy, verbatim from _input/content/efnis-homepage-content.md, except
 * where noted: the fourth card and the membership band use
 * _input/content/efnis-about-content.md, because membership is not open to
 * everyone (bylaws, 3. grein). Phase 2 moves this into content files.
 */
import type { Section } from './sections';

export const homepageIs = {
	hero: {
		eyebrow: 'Efnafræðifélag Íslands',
		title: 'Efnafræðifélag Íslands',
		tagline: 'Fagvettvangur efnafræðinga — í kennslu, rannsóknum og atvinnulífi',
		intro:
			'Efnafræðifélag Íslands (Efnís) er fagfélag efnafræðinga, efnaverkfræðinga, kennara og nemenda. Félagið hefur starfað frá árinu 1999 og vinnur að því að efla efnafræði á Íslandi — í skólum, háskólum, rannsóknum og atvinnulífi. Efnís heldur árlega ráðstefnu, styður við efnafræðikennslu og er tengiliður íslenskra efnafræðinga við alþjóðlegt fagsamfélag.',
	},
	cards: [
		{ title: 'Efnafræði á Íslandi', text: 'Rannsóknir, iðnaður og nýsköpun — frá jarðhita til lyfjaþróunar.', href: '/efnafradi-a-islandi/' },
		{ title: 'Menntun og úrræði', text: 'Fyrir kennara og nemendur: keppnir, námsefni, íðorðabanki og fleira.', href: '/menntun/' },
		{ title: 'Ráðstefnur Efnís', text: 'Árleg ráðstefna félagsins — erindi, veggspjöld og fagleg samvera.', href: '/radstefnur/' },
		// Was "Gerðu þig félag — Opið öllum …", which contradicts the bylaws.
		// Text from the About page intro.
		{ title: 'Um Efnís', text: 'Efnís er vettvangur fyrir alla sem starfa við efnafræði á Íslandi eða hafa áhuga á henni.', href: '/um-efnis/' },
	],
	rules: {
		title: 'Þumalputtareglur um efnafræði',
		text: 'Fimmtán stuttar reglur til að ræða efnafræði af skynsemi og nákvæmni — án hræðslu eða oftrúar.',
	},
	// Membership information band (replaces the UI kit's "Gerstu félagi" call to
	// action). Text from the About page, "Félagsaðild".
	membership: {
		title: 'Félagsaðild',
		text: [
			'Félagsaðild er opin öllum sem lokið hafa háskólaprófi í efnafræði, efnaverkfræði, lífefnafræði eða skyldum greinum, sem og raungreinakennurum í grunn- og framhaldsskólum sem lokið hafa háskólaprófi. Háskólanemar í efnafræði, efnaverkfræði eða lífefnafræði geta sótt um aukaaðild að félaginu.',
			'Árgjald félagsins er 3.000 kr.',
		],
		linkLabel: 'Nánari upplýsingar um félagsaðild',
		href: '/um-efnis/felagsadild/',
	},
};

/** English homepage, from the "ENGLISH PAGE" section of the same file. */
export const homepageEn = {
	title: 'The Icelandic Chemical Society (Efnís)',
	sections: [
		{
			paragraphs: [
				'Efnafræðifélag Íslands — the Icelandic Chemical Society, known as Efnís — is a professional society for chemists, chemical engineers, biochemists, teachers, and students in Iceland. Founded in 1999 and based in Reykjavík, Efnís serves as a meeting point for everyone working with chemistry in Iceland, whether in education, academic research, or industry.',
			],
		},
		{
			heading: 'What we do',
			paragraphs: [
				'Efnís works to strengthen chemistry across Icelandic society. The society organises an annual national conference bringing together researchers, educators, and industry professionals. Efnís supports chemistry education through partnerships with schools, a national chemistry competition for secondary students, and the Icelandic team at the International Chemistry Olympiad. The society also maintains an Icelandic chemistry terminology database in collaboration with the Árni Magnússon Institute.',
			],
		},
		{
			heading: 'Chemistry in Iceland',
			paragraphs: [
				"Iceland has a distinctive chemistry landscape shaped by its geology and energy resources. Geothermal energy powers much of the country and supports industries including aluminium smelting, silicon production, and carbon capture. Icelandic researchers work on topics ranging from geothermal fluid chemistry and volcanology to pharmaceutical sciences and computational chemistry. Companies like Carbon Recycling International, which produces methanol from captured CO₂, reflect Iceland's role in green chemistry innovation. The Efnís website features an overview of chemistry research and industry in Iceland at efn.is/efnafradi-a-islandi/ (in Icelandic — English version planned).",
			],
		},
		{
			id: 'membership',
			heading: 'Membership',
			paragraphs: [
				'Membership in Efnís is open to anyone who holds a university degree in chemistry, chemical engineering, biochemistry, or related fields, as well as science teachers in primary and secondary schools with a university degree. University students in chemistry, chemical engineering, or biochemistry may apply for associate membership.',
				'Annual membership fee: 3,000 ISK (approx. €20).',
				'To join or enquire about membership, contact us at efnis1@gmail.com.',
			],
		},
		{
			heading: 'The Efnís Conference',
			paragraphs: [
				'The annual Efnís conference is the main gathering of the Icelandic chemistry community. The conference features oral presentations and a poster session covering the full breadth of chemistry in Iceland — from fundamental research to industrial applications and education. The 10th conference was held in October 2024 in collaboration with FÍN (the Icelandic Natural Scientists\' Association), with the theme "Chemistry in Iceland — education, research, and industry."',
				'Information about upcoming conferences is published on this site and circulated to members by email. Conference presentations are welcome in both Icelandic and English.',
			],
		},
		{
			heading: 'Education resources',
			paragraphs: ['Efnís supports chemistry education in Iceland through several initiatives:'],
			list: [
				'Landskeppni í efnafræði — the national chemistry competition for upper-secondary students, held annually since 2003.',
				'The Icelandic Chemistry Olympiad team — Iceland has participated in the International Chemistry Olympiad (IChO) since 2005.',
				'Bókagjafir Efnís — the society awards chemistry books to outstanding students.',
				'Íðorðabanki — an Icelandic chemistry terminology database, developed by the Efnís terminology committee and hosted at the Árni Magnússon Institute (idord.arnastofnun.is).',
			],
			after: [
				'Additional educational resources, including Icelandic-language chemistry tools and translated textbook materials, can be found at efnafraedi.app and namsbokasafn.is.',
			],
		},
		{
			heading: 'Contact',
			paragraphs: [
				'Efnafræðifélag Íslands (The Icelandic Chemical Society)',
				'Email: efnis1@gmail.com',
				'Website: efn.is',
				'The society is governed by a volunteer board elected at the annual general meeting. The current board and the society\'s bylaws can be found under "Um félagið" on the main site.',
			],
		},
	] satisfies Section[],
};
