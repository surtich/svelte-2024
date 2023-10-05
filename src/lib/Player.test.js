import { describe, it, expect } from 'vitest';
import {
	render,
	screen
} from '@testing-library/svelte';
import Player from './Player.svelte';

describe('Player', () => {
	const examplePlayer = {
		name: 'Ares',
		experience: 'junior'
	};

	it('displays the name of the player', () => {
		render(Player, {
			...examplePlayer,
			name: 'Hercules'
		});
		expect(
			screen.queryByText('Hercules')
		).toBeVisible();
	});

	it("Show the player's experience in parentheses.", () => {
		render(Player, {
			...examplePlayer,
			experience: 'junior'
		});
		expect(
			screen.queryByText('(junior)')
		).toBeVisible();
	});
});
