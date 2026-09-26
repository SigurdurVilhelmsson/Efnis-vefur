/**
 * Fails (exit 1) if the CMS config and the Zod schemas have drifted apart.
 *
 * Compares field names, both ways, for every collection in
 * public/admin/config.yml with the schema of the same name in
 * src/lib/schemas.ts, including fields nested in lists and objects.
 * Folder collections map by collection name; single files (`files:`) map by
 * file name. `body` is the Markdown body, not a frontmatter field: it must
 * exist in the CMS exactly when the content files are Markdown.
 *
 * Run: npm run check:cms (also runs as the first step of npm run build).
 * Needs Node ≥ 22.18 (or --experimental-strip-types) to import the .ts file.
 */
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { schemas } from '../src/lib/schemas.ts';

const config = parse(readFileSync(new URL('../public/admin/config.yml', import.meta.url), 'utf8'));
const errors = [];

/** Unwraps optional/default/preprocess wrappers down to the underlying schema. */
function unwrap(schema) {
	let s = schema;
	for (;;) {
		const def = s._zod.def;
		if (['optional', 'nullable', 'default', 'prefault', 'readonly', 'nonoptional'].includes(def.type)) s = def.innerType;
		else if (def.type === 'pipe') s = def.out;
		else return s;
	}
}

/** Nested shape of a Zod schema: object → { field: shape }, array → shape of its element, else null. */
function zodShape(schema) {
	const s = unwrap(schema);
	const def = s._zod.def;
	if (def.type === 'object') return Object.fromEntries(Object.entries(def.shape).map(([k, v]) => [k, zodShape(v)]));
	if (def.type === 'array') return zodShape(def.element);
	return null;
}

/** Same nested shape for a list of CMS fields. */
function cmsShape(fields) {
	return Object.fromEntries(
		fields.map((f) => {
			if (f.fields) return [f.name, cmsShape(f.fields)];
			if (f.field) return [f.name, cmsShape([f.field])[f.field.name]];
			return [f.name, null];
		}),
	);
}

function compare(where, cms, zod) {
	for (const key of Object.keys(cms)) {
		if (!(key in zod)) errors.push(`${where}: "${key}" is in config.yml but not in the Zod schema`);
	}
	for (const key of Object.keys(zod)) {
		if (!(key in cms)) {
			errors.push(`${where}: "${key}" is in the Zod schema but not in config.yml`);
			continue;
		}
		const [c, z] = [cms[key], zod[key]];
		if ((c === null) !== (z === null)) errors.push(`${where}.${key}: list/object in one, plain value in the other`);
		else if (c && z) compare(`${where}.${key}`, c, z);
	}
}

/** One CMS collection or file against its schema. */
function check(name, fields, isMarkdown) {
	const schema = schemas[name];
	if (!schema) {
		errors.push(`${name}: in config.yml but there is no schema called "${name}" in src/lib/schemas.ts`);
		return;
	}
	seen.add(name);
	const hasBody = fields.some((f) => f.name === 'body');
	if (isMarkdown && !hasBody) errors.push(`${name}: Markdown files need a "body" field in config.yml`);
	if (!isMarkdown && hasBody) errors.push(`${name}: "body" field, but the files are not Markdown`);
	compare(name, cmsShape(fields.filter((f) => f.name !== 'body')), zodShape(schema));
}

const seen = new Set();
for (const collection of config.collections) {
	if (collection.folder) {
		check(collection.name, collection.fields, (collection.extension ?? 'md') === 'md');
	} else {
		for (const file of collection.files) check(file.name, file.fields, file.file.endsWith('.md'));
	}
}
for (const name of Object.keys(schemas)) {
	if (!seen.has(name)) errors.push(`${name}: has a Zod schema but no collection or file in config.yml`);
}

if (errors.length) {
	console.error(`CMS config and Zod schemas differ (${errors.length}):\n  - ${errors.join('\n  - ')}`);
	process.exit(1);
}
console.log(`CMS config matches the Zod schemas (${seen.size} collections).`);
