import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { nodeLoaderPlugin } from '@vavite/node-loader/plugin';

export default defineConfig({
	server:{
		// proxy: {
		// 	"/api/": {
		// 	  target: "http://server:3000",
		// 	  secure: false,
		// 	}
		// }
	},
	plugins: [sveltekit(), nodeLoaderPlugin()]
});
