# Efnis-vefur
Git-based vefur Efnafræðifélags Íslands

## Development

- `npm run dev` — local site at http://localhost:4321
- `npm run build` — checks the CMS config against the schemas, type-checks, and builds to `dist/`. Invalid content fails the build.

## Editing content

Content is Markdown/YAML in `src/content/`, edited with [Sveltia CMS](https://sveltiacms.app) at `/admin/`.

- Schemas (what each field must contain): `src/lib/schemas.ts`
- CMS configuration: `public/admin/config.yml` — change it together with the schemas; `npm run check:cms` fails if they differ.
- Translations: `<name>.is.md` is Icelandic, `<name>.en.md` the optional English version.
- Uploaded images: `public/images/uploads/`

To edit locally without logging in: run `npm run dev`, open http://localhost:4321/admin/index.html in Chrome or Edge, click "Work with Local Repository" and pick this folder. Changes are written to the files; commit them with Git.
