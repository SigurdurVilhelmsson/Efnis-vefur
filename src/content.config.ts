/**
 * Content collections. Files live in src/content/<collection>/ and are edited
 * with Sveltia CMS (/admin/). Schemas: src/lib/schemas.ts.
 *
 * Translated collections use one file per language: `<slug>.is.md` and,
 * optionally, `<slug>.en.md`. Entry ids keep the language suffix
 * ("um-efnis.is"); see splitId() in src/lib/content.ts.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { schemas } from './lib/schemas';

/** Id = file path without extension, dots kept ("2024-10-25-frett.is"). */
const byPath = ({ entry }: { entry: string }) => entry.replace(/\.(md|ya?ml)$/, '');

function folder(name: string, extension: 'md' | 'yml' = 'md') {
	return glob({ pattern: `*.${extension}`, base: `./src/content/${name}`, generateId: byPath });
}

function single(path: string) {
	const [dir, file] = [path.slice(0, path.lastIndexOf('/')), path.slice(path.lastIndexOf('/') + 1)];
	return glob({ pattern: file, base: `./src/content/${dir}`, generateId: byPath });
}

export const collections = {
	frettir: defineCollection({ loader: folder('frettir'), schema: schemas.frettir }),
	vidburdir: defineCollection({ loader: folder('vidburdir'), schema: schemas.vidburdir }),
	sidur: defineCollection({ loader: folder('sidur'), schema: schemas.sidur }),
	radstefnur: defineCollection({ loader: folder('radstefnur'), schema: schemas.radstefnur }),
	stjorn: defineCollection({ loader: folder('stjorn', 'yml'), schema: schemas.stjorn }),
	reglur: defineCollection({ loader: folder('reglur'), schema: schemas.reglur }),
	settings: defineCollection({ loader: single('settings/site.yml'), schema: schemas.settings }),
	forsida: defineCollection({ loader: single('forsida/is.yml'), schema: schemas.forsida }),
	forsida_en: defineCollection({ loader: single('forsida/en.md'), schema: schemas.forsida_en }),
};
