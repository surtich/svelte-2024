import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
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
			$utils: path.resolve(
				__dirname,
				'./src/lib/utils'
			),
			$data: path.resolve(__dirname, './src/data')
		}
	}
});
