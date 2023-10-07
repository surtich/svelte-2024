import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		// see: https://stackoverflow.com/questions/76577665/vitest-and-svelte-components-onmount
		alias: [
			{
				find: /^svelte$/,
				replacement: 'svelte/internal'
			}
		],
		environment: 'jsdom',
		setupFiles: [
			'src/vitest/cleanupDom.js',
			'src/vitest/registerMatchers.js'
		],

		restoreMocks: true,
		reporter: 'verbose'
	},
	resolve: {
		alias: {
			$lib: path.resolve(__dirname, './src/lib'),
			$stores: path.resolve(
				__dirname,
				'./src/stores'
			),
			$utils: path.resolve(
				__dirname,
				'./src/lib/utils'
			),
			$data: path.resolve(__dirname, './src/data')
		}
	}
});
