// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://efn.is',
	output: 'static',
	// WordPress URLs end in a slash (/um-efnis/); keep them identical.
	trailingSlash: 'always',
});
