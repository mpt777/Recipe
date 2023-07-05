import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server:{
		// proxy: {
		// 	"/api/": {
		// 	  target: "http://server:3000",
		// 	  secure: false,
		// 	}
		// }
	},
	plugins: [sveltekit()]
});
