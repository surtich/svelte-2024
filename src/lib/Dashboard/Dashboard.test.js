import { describe, expect, it, vi } from 'vitest';
import {
	render,
	screen,
	within
} from '@testing-library/svelte';
import Dashboard from './Dashboard.svelte';
import { click } from '@testing-library/user-event';

import * as samples from '$data/samples.js';

describe('Dashboard', () => {
	const games = samples.games || {};
	const players = samples.players;
	const levels = samples.levels || [];

	it.todo(
		'renders the players and games',
		async () => {
			const { getByText } = render(Dashboard, {
				levels,
				players
			});

			const pepeElement = getByText('Pepe (newbie)');
			const lucasElement = getByText(
				'Lucas (expert)'
			);
		}
	);

	it("increases the player's experience when the onLevelUp function is called", async () => {
		vi.mock('$lib/Dashboard/Game.svelte');

		render(Dashboard, {
			levels,
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
		render(Dashboard, {
			levels: ['newbie', 'expert'],
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
