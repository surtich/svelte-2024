import { render } from '@testing-library/svelte';
import App from './App.svelte';
import { describe, it, expect } from 'vitest';

describe('sum test', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});

	// This test verifies that the name prop in the component is being used.
	it('renders hello, svelte', () => {
		render(App, { name: 'Svelte' });
		expect(document.body).toHaveTextContent(
			'Hello, Svelte!'
		);
	});

	it('skips the rendering of hello, svelte', () => {
		// render(Hello, { name: 'Svelte' });
		expect(document.body).not.toHaveTextContent(
			'Svelte!'
		);
	});
});
