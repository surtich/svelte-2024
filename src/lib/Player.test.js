import { describe, it, expect } from 'vitest';
import {
	render,
	screen
} from '@testing-library/svelte';
import Player from './Player.svelte';

describe('Player', () => {
	it('displays the name of the player', () => {
		render(Player, {
			name: 'Hercules',
			experience: 'junior'
		});
		/*
        queryBy versus getBy query function variants
        If you have experience with Testing Library, you’ll know that each of the query functions has
        a getBy and queryBy variant. When I’m using TDD, I use queryBy in the first test that
        introduces a new element. That makes it clear that I don’t expect the element to exist yet. But
        once that test is green (and passing), subsequent tests can use getBy, which throws an exception
        if the element isn’t found. This helps make it clear that this test depends on a previous test to
        prove the existence of the element.
        */
		expect(
			/*
            	The screen object has a whole bunch of query functions like this,
	            all designed to find something individual elements in the DOM.
	        */
			screen.queryByText('Hercules')
		).toBeVisible();
	});
});
