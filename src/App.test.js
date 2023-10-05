import { describe, expect, it, vi } from 'vitest';
import {
	render,
	screen,
	within
} from '@testing-library/svelte';
import App from './App.svelte';
import { click } from '@testing-library/user-event';

import * as samples from './data/samples.js';

describe('Game', () => {
	const games = samples.games || {};
	const players = samples.players;
	const levels = samples.levels || [];

	vi.mock('./lib/Game.svelte');

	it.todo(
		'App renders the players and games',
		async () => {
			const { getByText } = render(App, {
				levels,
				games,
				players
			});

			const pepeElement = getByText('Pepe (newbie)');
			const lucasElement = getByText(
				'Lucas (expert)'
			);
		}
	);

	it("increases the player's experience when the onLevelUp function is called", async () => {
		render(App, {
			levels,
			games,
			players
		});

		const lucasElement =
			screen.queryByText('Lucas').parentElement;

		expect(
			within(lucasElement).queryByText('(expert)')
		).toBeVisible();

		const addPointsButton = within(
			lucasElement
		).getByTestId('addPoints-button');

		await click(addPointsButton);

		expect(
			within(lucasElement).queryByText('(master)')
		).toBeVisible();
	});

	it('should not increase the experience if the maximum experience has already been reached.', async () => {
		render(App, {
			levels: ['newbie', 'expert'],
			games,
			players: [
				{
					name: 'Pepe',
					experience: 'expert',
					games: [Object.values(games)[0]]
				}
			]
		});

		expect(
			screen.queryByText('(expert)')
		).toBeVisible();
	});
});
