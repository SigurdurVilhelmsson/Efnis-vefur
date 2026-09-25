/**
 * Þumalputtareglur — Phase 1 data.
 *
 * Generated verbatim from the DRAFT
 * _input/design-system/project/source-docs/thumalputtareglur-drog.md
 * (útgáfa 2, apríl 2026). Not yet proofread or approved: see
 * docs/thumalputtareglur-yfirlestur.md for proposed corrections.
 * Phase 2 moves this into a content collection editable in the CMS.
 *
 * `body` is Markdown (only *emphasis* is used).
 */

export interface Rule {
	n: number;
	title: string;
	body: string;
	cardTitle: string;
	cardText: string;
	icon: string;
}

export const rulesIntro = "Fimmtán stuttar reglur sem Efnafræðifélag Íslands vill að allir þekki — til að ræða efnafræði af skynsemi, nákvæmni og án hræðslu. Hugmyndin er sótt í „Tumregler\" á vef Svenska Kemisamfundet en reglurnar eru frumsamdar með tilliti til íslenskra aðstæðna og umræðu hér á landi.";

export const rules: Rule[] = [
	{
		"n": 1,
		"title": "Náttúrulegt er ekki sjálfkrafa öruggt",
		"body": "Sú hugmynd að náttúruleg efni séu öll góð og manngerð efni öll slæm er algeng — og röng. Eiginleikar efnis ráðast af byggingu sameindarinnar, ekki af uppruna hennar. Nokkur allra hættulegustu efni sem við þekkjum koma beint úr náttúrunni: botulin-eitur, rísín úr laxerbaunum, tetródótoxín úr kúlufiski. Á hinn bóginn hafa manngerð efni á borð við sýklalyf og bóluefni bjargað óteljandi mannslífum.",
		"cardTitle": "Náttúrulegt ≠ öruggt",
		"cardText": "Eiginleikar efnis ráðast af byggingu sameindarinnar, ekki uppruna hennar. Sum hættulegustu efni heims koma úr náttúrunni — sýklalyf og bóluefni eru manngerð.",
		"icon": "rule-01-natturulegt"
	},
	{
		"n": 2,
		"title": "Allt er eitur — í nógu stórum skammti",
		"body": "Paracelsus orðaði þetta fyrir nærri fimm öldum: *„Skammturinn skilur á milli eiturs og lyfs.\"* Jafnvel hreint vatn getur verið banvænt í nógu stórum skömmtum (vatnseitrun raskar saltajafnvægi líkamans). Þegar við ræðum hættu af efni þarf alltaf að tala um styrk, skammt og útsetningu — ekki aðeins efnið sjálft.",
		"cardTitle": "Skammturinn skilur á milli",
		"cardText": "Paracelsus: „Skammturinn skilur á milli eiturs og lyfs.\" Jafnvel vatn getur verið banvænt í nægu magni. Styrkur og skammtur skipta alltaf máli.",
		"icon": "rule-02-skammtur"
	},
	{
		"n": 3,
		"title": "E-númer eru ekki vond, þvert á móti",
		"body": "Þegar efni fær E-númer í matvælum þýðir það að Matvælaöryggisstofnun Evrópu hefur rannsakað það og samþykkt til neyslu. E-númer segja ekkert um hvort efnið komi úr náttúrunni eða sé framleitt á rannsóknarstofu. Sítrónusýra er E330 — sama sýran og gefur sítrónum súra bragðið. Litarefnið úr rauðrófum er E162. E-númer eru í raun gæðastimpill.",
		"cardTitle": "E-númer eru gæðastimpill",
		"cardText": "E-númer þýðir að Matvælaöryggisstofnun Evrópu hefur rannsakað og samþykkt efnið. Sítrónusýra er E330. Það er í raun gæðastimpill.",
		"icon": "rule-03-enumera"
	},
	{
		"n": 4,
		"title": "„Þungmálmur\" er ekki efnafræðilegt hugtak",
		"body": "Orðið „þungmálmur\" er oftast notað um málmsambönd sem eru hættuleg heilsu eða umhverfi. Slík sambönd geta þó myndast af bæði léttum og þungum frumefnum. Efnafræðilega séð er hugtakið ónákvæmt. Notið heldur „hættuleg málmsambönd\" þegar það á við — eða nefnið efnið sjálft: blý, kadmíum, kvikasilfur, arsen.",
		"cardTitle": "Þungmálmur er óljóst",
		"cardText": "Hugtakið er ónákvæmt í efnafræði. Nefndu frekar efnið sjálft: blý, kadmíum, kvikasilfur, arsen — eða segðu „hættuleg málmsambönd\".",
		"icon": "rule-04-thungmalmur"
	},
	{
		"n": 5,
		"title": "Jónandi geislun og geislavirk efni eru ekki það sama",
		"body": "Það er ekki til neitt sem heitir „geislavirk geislun\". Hins vegar eru til geislavirk efni sem gefa frá sér jónandi geislun — geislun sem hefur næga orku til að slá rafeindir úr öðrum efnum. Ef þú vilt ræða kjarneðlisfræði og geislavörn af nákvæmni, haltu þessum hugtökum aðgreindum.",
		"cardTitle": "Geislun vs. geislavirkt efni",
		"cardText": "„Geislavirk geislun\" er ekki til. Geislavirk efni gefa frá sér jónandi geislun — geislun með næga orku til að slá rafeindir úr öðrum efnum.",
		"icon": "rule-05-geislun"
	},
	{
		"n": 6,
		"title": "Koltvísýringur er alltaf sama efnið",
		"body": "Stundum heyrist talað um „endurnýjanlegan CO₂\" og „jarðefna-CO₂\". Efnafræðilega er þetta sama sameindin — CO₂ er CO₂, sama hvaðan hún kemur. Það er *eldsneytið* eða *upprunaferlið* sem er annaðhvort jarðefna- eða endurnýjanlegt. Þetta skiptir máli fyrir Ísland, þar sem Carbfix bindur CO₂ í berggrunninn hvort sem það kemur frá jarðhitavirkjun eða iðnaði.",
		"cardTitle": "CO₂ er alltaf CO₂",
		"cardText": "Sama sameindin, sama hvaðan hún kemur. Það er eldsneytið eða ferlið sem er jarðefna eða endurnýjanlegt, ekki koldíoxíðið sjálft.",
		"icon": "rule-06-co2"
	},
	{
		"n": 7,
		"title": "Lífræn efnafræði er ekki lífrænn matur",
		"body": "„Lífræn efnafræði\" er grein sem rannsakar efnasambönd sem innihalda kolefni — allt frá bensíni til DNA. „Lífrænt ræktaður matur\" vísar til búskaparaðferða án tilbúinna áburða og varnarefna. Þetta eru tvö gjörólík hugtök sem deila sama lýsingarorðinu. Efnin í lífrænt ræktuðum mat eru að sjálfsögðu lífræn — en það eru efnin í öllum mat.",
		"cardTitle": "Lífræn efnafræði ≠ lífrænt",
		"cardText": "„Lífræn efnafræði\" rannsakar kolefnissambönd — allt frá bensíni til DNA. „Lífrænn matur\" vísar til búskaparaðferða. Tvö gjörólík hugtök.",
		"icon": "rule-07-lifraent"
	},
	{
		"n": 8,
		"title": "Jarðhitavatn er vatn",
		"body": "Jarðhitavatn á Íslandi inniheldur uppleyst sölt, kísil, lítið magn brennisteinsefna og önnur steinefni — en grunnurinn er einfaldlega H₂O. Engin töfraefni, engin leynileg samsetning. Jarðhitinn sjálfur er varmaorka, ekki sérstakt efni. Góð áhrif baða í Bláa lóninu stafa af steinefnum, hita og slökun — ekki af dulrænum efnafræðilegum krafti.",
		"cardTitle": "Jarðhitavatn er vatn",
		"cardText": "Jarðhitavatn er H₂O með uppleystum söltum og steinefnum. Jarðhitinn er varmaorka, ekki sérstakt efni. Góð áhrif Bláa lónsins skýrast af steinefnum, hita og slökun.",
		"icon": "rule-08-jardhitavatn"
	},
	{
		"n": 9,
		"title": "Klór í sundlaug og klór í bleikiefni eru ekki sama efnið",
		"body": "„Klór\" er stundum notað sem samheiti yfir mörg mismunandi klórsambönd. Klórið sem sótthreinsar sundlaugarvatn er venjulega natríumhýpóklórít (NaOCl) í mjög lágum styrk. Bleikiefni í þvotti er styrktari útgáfa af sama hýpóklóríti. Saltið í matnum (NaCl) inniheldur líka klór — en í jónabundnu formi sem er alveg öruggt og raunar lífsnauðsynlegt.",
		"cardTitle": "Klór er mörg efni",
		"cardText": "„Klór\" er samheiti yfir mörg efni. Sundlaugarklór er venjulega natríumhýpóklórít í lágum styrk. Matarsalt (NaCl) inniheldur klór — í öruggu jónaformi.",
		"icon": "rule-09-klor"
	},
	{
		"n": 10,
		"title": "„Efnavörur\" er misvísandi samheiti",
		"body": "Þegar orðið „efnavörur\" er notað yfir eitthvað eitrað eða hættulegt gleymist að *allt* — vatn, súrefni, sykur, DNA — er efni. Hættan liggur í tilteknu efni, tilteknum styrk og tiltekinni útsetningu. Notið heldur nöfnin á efnunum sjálfum, eða „hættuleg efni\" ef leggja á áherslu á hættuna. Efnafræði er allt — ekki bara það sem er eitrað.",
		"cardTitle": "Allt er efni",
		"cardText": "Allt er efni — vatn, súrefni, DNA. Hættan felst í tilteknu efni í tilteknum styrk og útsetningu. Notaðu frekar nöfn efnanna sjálfra.",
		"icon": "rule-10-efnavorur"
	},
	{
		"n": 11,
		"title": "pH-kvarðinn er logaritmískur, ekki línulegur",
		"body": "Þegar pH lækkar úr 4 niður í 3 er vökvinn ekki „25% súrari\" — hann er tíu sinnum súrari. pH-kvarðinn byggir á tugarlogaritma vetnisjónastyrks, þannig að hvert þrep er tíu-falt. Kóladrykkur (pH ~2,5) er um tífalt súrari en appelsínusafi (pH ~3,5) og um þrjátíu þúsund sinnum súrari en hreint vatn (pH 7). Þegar talað er um súrnun sjávar úr pH 8,2 niður í 8,1 er það rúmlega 25% aukning á vetnisjónastyrk — ekki 1%. Þetta skiptir sköpum þegar rædd eru áhrif á sjávarlífverur umhverfis Ísland.",
		"cardTitle": "pH er logaritmískur",
		"cardText": "pH 3 er 10× súrra en pH 4, og pH 2 er 100.000× súrra en pH 7. Þetta skiptir máli þegar rætt er um súrnun sjávar.",
		"icon": "rule-11-ph"
	},
	{
		"n": 12,
		"title": "Súrt regn og náttúrulega súrt vatn er ekki það sama",
		"body": "Hreint regnvatn er alltaf örlítið súrt (pH ~5,6) af því að CO₂ úr lofti leysist upp í því og myndar kolsýru — þetta er náttúrulegt. Með „súru regni\" er átt við mun súrari úrkomu (pH 4 eða lægra) sem myndast þegar brennisteinsdíoxíð (SO₂) og nituroxíð (NOₓ) úr mengun blandast vatni í andrúmsloftinu. Hér á Íslandi er líka að finna náttúrulega súrt vatn á jarðhitasvæðum þar sem pH getur farið niður í 2–3 — en þar er uppruninn jarðefnafræðilegur, ekki mengun. Það að eitthvað sé súrt segir ekkert um það hvort það sé manngert eða náttúrulegt.",
		"cardTitle": "Súrt regn ≠ náttúrulega súrt",
		"cardText": "Hreint regn er örlítið súrt vegna CO₂. Súrt regn frá SO₂/NOₓ-mengun er mun súrra. Náttúrulega súrt jarðhitavatn er enn annað fyrirbæri.",
		"icon": "rule-12-surtregn"
	},
	{
		"n": 13,
		"title": "Vetni er bara vetni — framleiðsluferlið skiptir máli",
		"body": "Sameindin H₂ er alltaf sú sama, sama hvort hún er kölluð grátt, blátt eða grænt vetni. Munurinn liggur eingöngu í því hvernig hún er framleidd. *Grátt vetni* er unnið úr jarðgasi og losar CO₂ út í andrúmsloftið. *Blátt vetni* er sama ferli en CO₂ er fangað og bundið (til dæmis með Carbfix). *Grænt vetni* er framleitt með rafgreiningu vatns og endurnýjanlegri orku — eitthvað sem Ísland hefur einstakar forsendur fyrir. Loftslagsáhrifin eru því gjörólík, þótt eldsneytið sjálft sé það sama.",
		"cardTitle": "Vetni er eitt — ferlið ólíkt",
		"cardText": "H₂ er alltaf sama sameindin. Munurinn á gráu, bláu og grænu vetni liggur eingöngu í framleiðsluferlinu. Loftslagsáhrifin eru hins vegar ólík.",
		"icon": "rule-13-vetni"
	},
	{
		"n": 14,
		"title": "Áburður er efnafræði — og hún hefur bjargað milljörðum mannslífa",
		"body": "Haber-Bosch-ferlið (1909) gerir kleift að binda köfnunarefni úr andrúmslofti við vetni og mynda ammoníak, grunnefni tilbúins áburðar. Áætlað er að nærri helmingur jarðarbúa í dag sé beinlínis háður matvælaframleiðslu sem byggir á þessum áburði. Þegar rætt er um „manngerð efni\" er gott að muna að þetta er eitt þeirra — og án þess væru hungursneyðir mun algengari. Á Íslandi var Áburðarverksmiðjan í Gufunesi (1954–2001) gott dæmi: áburður framleiddur með íslenskri vatnsorku.",
		"cardTitle": "Áburður = lífsnauðsyn",
		"cardText": "Haber-Bosch-ferlið breytti nituríofti í ammoníak og stækkaði matvælaframleiðslu heimsins. Án tilbúins áburðar væri mannkynið mun færra í dag.",
		"icon": "rule-14-aburdur"
	},
	{
		"n": 15,
		"title": "Álbræðsla er rafgreining, ekki bruni",
		"body": "Ál er unnið úr báxíti með rafgreiningu: rafstraumur er leiddur gegnum bráðið áloxíð (Al₂O₃) og klýfur það í málmál og súrefni. Ekkert eldsneyti er brennt í sjálfu ferlinu. Sú CO₂-losun sem tengist álbræðslu kemur að miklu leyti frá kolefnisstautum (anóðum) sem eyðast hægt og bítandi í ferlinu, ásamt óbeinni losun frá raforkuframleiðslu. Íslensk álver nota vatnsorku og jarðhita, sem gerir íslenskt ál með því sporléttasta í heiminum. Þess vegna er villandi að setja alla álframleiðslu í sama flokk og hefðbundinn eldsneytisiðnað.",
		"cardTitle": "Álbræðsla = rafgreining",
		"cardText": "Ál er unnið með rafgreiningu, ekki bruna. Íslensk álver nota endurnýjanlega orku, sem gerir íslenskt ál eitt það sporléttasta í heimi.",
		"icon": "rule-15-albraeddsla"
	}
];
