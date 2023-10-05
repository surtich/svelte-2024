import { render } from '@testing-library/svelte';
import App from './App.svelte';
import { describe, it, expect } from 'vitest';

describe('sum test', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});

	it('renders hello into the document', () => {
		document.body.innerHTML = '<h1>Hello, world!</h1>';
		expect(document.body).toHaveTextContent('Hello, world!');
	});

	it('renders hello into the document', () => {
		render(App, { name: 'world' });
		expect(document.body).toHaveTextContent('Hello, world!');
	});

	// This test verifies that the name prop in the component is being used.
	it('renders hello, svelte', () => {
		render(App, { name: 'Svelte' });
		expect(document.body).toHaveTextContent('Hello, Svelte!');
	});

	// Tests share the same document object, which is clearly not good for test independence.
	it('renders hello, svelte', () => {
		// render(Hello, { name: 'Svelte' });
		expect(document.body).toHaveTextContent('Hello, Svelte!');
	});
});
