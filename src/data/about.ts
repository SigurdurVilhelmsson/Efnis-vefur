/**
 * "Um Efnís" / "About" copy, verbatim from _input/content/efnis-about-content.md
 * (Draft v1, May 2026). Phase 2 moves it into the `sidur` collection.
 */
import type { Section } from './sections';

export const aboutIs = {
	title: 'Um Efnafræðifélag Íslands',
	intro:
		'Efnafræðifélag Íslands (Efnís) er fagfélag efnafræðinga, efnaverkfræðinga, lífefnafræðinga, kennara og nemenda. Félagið var stofnað árið 1999 og hefur aðsetur í Reykjavík. Efnís er vettvangur fyrir alla sem starfa við efnafræði á Íslandi eða hafa áhuga á henni — hvort sem er í skólum, háskólum, rannsóknum eða atvinnulífi.',
	sections: [
		{
			id: 'hlutverk',
			heading: 'Hlutverk félagsins',
			paragraphs: [
				'Hlutverk Efnís er að efla efnafræðiþekkingu á Íslandi og vera fagvettvangur efnafræðinga og annarra áhugamanna um efnafræði. Félagið vinnur meðal annars að því að:',
			],
			list: [
				'efla efnafræðikennslu í íslenskum skólum og stuðla að framförum á því sviði;',
				'styrkja innlend og erlend samskipti efnafræðinga og koma fram fyrir hönd félagsmanna gagnvart skyldum erlendum félagasamtökum;',
				'beita sér fyrir fræðslu um efnafræði með fyrirlestrum og í rituðu máli;',
				'kynna og efla efnafræðirannsóknir á Íslandi.',
			],
			after: [
				'Þessum markmiðum sinnir félagið meðal annars með árlegri ráðstefnu, stuðningi við efnafræðikennslu og raunvísindakeppnir, og með því að halda utan um íðorðastarf í efnafræði.',
			],
		},
		{
			id: 'merki',
			heading: 'Merki félagsins — kolsýrujónin',
			paragraphs: [
				'Merki Efnís er kolsýrujónin (CO₃²⁻) — efnafræði kalsíts, steindarinnar sem þekkt er um allan heim undir nafninu silfurberg. Tærustu kristallarnir komu úr Helgustaðanámu við Reyðarfjörð, og árið 1669 lýsti danski fræðimaðurinn Rasmus Bartholin tvíbroti ljóss í fyrsta sinn með slíkum kristal — uppgötvun sem lagði grunn að vísindum um skautað ljós.',
				'Sama kolsýruefnafræði liggur nú að baki kolefnisföngun á Íslandi, þar sem koltvísýringi er breytt í stein. Ein sameind tengir þannig vísindasögu Íslands við nútímann: efnafræði sem er í senn óaðskiljanleg frá landinu og í fremstu röð á heimsvísu.',
			],
		},
		{
			id: 'felagsadild',
			heading: 'Félagsaðild',
			paragraphs: [
				'Félagsaðild er opin öllum sem lokið hafa háskólaprófi í efnafræði, efnaverkfræði, lífefnafræði eða skyldum greinum, sem og raungreinakennurum í grunn- og framhaldsskólum sem lokið hafa háskólaprófi. Háskólanemar í efnafræði, efnaverkfræði eða lífefnafræði geta sótt um aukaaðild að félaginu.',
				'Árgjald félagsins er 3.000 kr. Þeir sem óska eftir að gerast félagsmenn geta haft samband við stjórn í gegnum netfangið efnis1@gmail.com.',
			],
			links: [{ label: 'Nánari upplýsingar um félagsaðild', href: '/um-efnis/felagsadild/' }],
		},
		{
			id: 'stjorn',
			heading: 'Stjórn og aðalfundur',
			paragraphs: [
				'Félaginu er stýrt af fimm manna stjórn sem kjörin er á aðalfundi: formanni, varaformanni, ritara, gjaldkera og meðstjórnanda. Aðalfundur fer með æðsta vald í málefnum félagsins og er haldinn ár hvert á tímabilinu febrúar–mars.',
				'Efnís er rekið í sjálfboðavinnu og byggir starf sitt á framlagi félagsmanna.',
			],
			links: [
				{ label: 'Núverandi stjórn', href: '/um-efnis/stjorn/' },
				{ label: 'Lög félagsins', href: '/um-efnis/log/' },
			],
		},
		{
			id: 'hafdu-samband',
			heading: 'Hafðu samband',
			lines: ['Efnafræðifélag Íslands', 'Netfang: efnis1@gmail.com', 'Reykjavík · stofnað 1999'],
		},
	] satisfies Section[],
};

export const aboutEn = {
	title: 'About the Icelandic Chemical Society',
	intro:
		'The Icelandic Chemical Society — Efnafræðifélag Íslands, known as Efnís — is a professional society for chemists, chemical engineers, biochemists, teachers, and students in Iceland. Founded in 1999 and based in Reykjavík, Efnís is a meeting point for everyone who works with chemistry in Iceland or takes an interest in it, whether in schools, universities, research, or industry.',
	sections: [
		{
			id: 'what-we-do',
			heading: 'What we do',
			paragraphs: [
				'The purpose of Efnís is to strengthen chemistry knowledge in Iceland and to serve as a professional forum for chemists and others interested in the field. Among other things, the society works to:',
			],
			list: [
				'strengthen chemistry teaching in Icelandic schools and support its advancement;',
				'build connections among chemists at home and abroad, and represent its members to related international organisations;',
				'promote public understanding of chemistry through lectures and in writing;',
				'present and advance chemistry research in Iceland.',
			],
			after: [
				'In practice, this means an annual conference, support for chemistry education and science competitions, and the upkeep of Icelandic chemistry terminology.',
			],
		},
		{
			id: 'emblem',
			heading: 'Our emblem — the carbonate ion',
			paragraphs: [
				'The Efnís emblem is the carbonate ion (CO₃²⁻) — the chemistry of calcite, the mineral known worldwide as Iceland spar. The clearest specimens came from the Helgustaðir mine by Reyðarfjörður in the East Fjords, and in 1669 the Danish scholar Rasmus Bartholin used such a crystal to describe double refraction for the first time — a discovery that helped found the science of polarised light.',
				"The same carbonate chemistry now underpins carbon capture in Iceland, where carbon dioxide is turned into stone. A single molecule connects Iceland's scientific past to its present: chemistry that is at once inseparable from the country and at the forefront worldwide.",
			],
		},
		{
			id: 'membership',
			heading: 'Membership',
			paragraphs: [
				'Membership is open to anyone who holds a university degree in chemistry, chemical engineering, biochemistry, or related fields, as well as science teachers in primary and secondary schools with a university degree. University students in chemistry, chemical engineering, or biochemistry may apply for associate membership.',
				'The annual membership fee is 3,000 ISK (approx. €20). To join or enquire, contact the board at efnis1@gmail.com.',
			],
		},
		{
			id: 'board',
			heading: 'Board and annual general meeting',
			paragraphs: [
				"Efnís is led by a five-member board elected at the annual general meeting: a chair, vice-chair, secretary, treasurer, and one further board member. The annual general meeting holds the highest authority in the society's affairs and is held each year between February and March.",
				'The society is run entirely by volunteers and depends on the contributions of its members.',
			],
		},
		{
			id: 'contact',
			heading: 'Contact',
			lines: ['The Icelandic Chemical Society (Efnafræðifélag Íslands)', 'Email: efnis1@gmail.com', 'Reykjavík · founded 1999'],
		},
	] satisfies Section[],
};
