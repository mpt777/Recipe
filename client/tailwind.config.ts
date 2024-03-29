/** @type {import('tailwindcss').Config} */
import { join } from 'path';
import type { Config } from 'tailwindcss';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';

const config = {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	theme: {
		extend: {},
	},
	plugins: [
		// 4. Append the Skeleton plugin (after other plugins)
		require('@tailwindcss/forms'),
		skeleton({
			themes: {
				preset: [ { name: "skeleton", enhancements: true }] 
			}
		})
	],
	  safelist: [
		'variant-filled-success',
		'select',
		'textarea'
	],
} satisfies Config;

export default config;

