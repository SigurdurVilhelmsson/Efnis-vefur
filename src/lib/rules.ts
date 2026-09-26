/** Þumalputtareglur from the `reglur` collection, in rule-number order. */
import { getCollection, type CollectionEntry } from 'astro:content';

export interface Rule {
	n: number;
	title: string;
	cardTitle: string;
	cardText: string;
	icon: string;
	entry: CollectionEntry<'reglur'>;
}

export async function getRules(): Promise<Rule[]> {
	const entries = await getCollection('reglur');
	if (entries.length === 0) throw new Error('No rules found in src/content/reglur/');
	const rules = entries
		.map((entry) => ({
			n: entry.data.n,
			title: entry.data.title,
			cardTitle: entry.data.card_title,
			cardText: entry.data.card_text,
			icon: entry.data.icon,
			entry,
		}))
		.sort((a, b) => a.n - b.n);
	rules.forEach((rule, i) => {
		if (rule.n !== i + 1) throw new Error(`Rules must be numbered 1, 2, 3, … without gaps; found ${rule.n} (${rule.entry.id})`);
	});
	return rules;
}
