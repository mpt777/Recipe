import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$components: "src/lib/components",
			$utils: "src/utils",
			$static: "src/lib/static",
			$scripts: "src/lib/scripts",
			$stores: "src/stores",
		},
		csp : {
			mode: "auto",
			directives: {
				'script-src': ['self']
			},
			// reportOnly: {
			// 	'script-src': ['self']
			// }
		}
	},
	preprocess: [vitePreprocess()]
};

export default config;