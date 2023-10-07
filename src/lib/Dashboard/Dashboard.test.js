import { describe, expect, it, vi } from 'vitest';
import {
	render,
	screen,
	within
} from '@testing-library/svelte';
import { click } from '@testing-library/user-event';
import { beforeEach } from 'node:test';

import playersStore from '$stores/players';
import * as samples from '$data/samples.js';
import Dashboard from './Dashboard.svelte';

const levels = samples.levels || [];
const players = samples.players || [];
const games = samples.games || {};

describe('Dashboard', () => {
	beforeEach(() => {
		playersStore.set({
			levels,
			players,
			games
		});
	});
	it.todo(
		'renders the players and games',
		async () => {
			const { getByText } = render(Dashboard);

			const pepeElement = getByText('Pepe (newbie)');
			const lucasElement = getByText(
				'Lucas (expert)'
			);
		}
	);

	it("increases the player's experience when the onLevelUp function is called", async (ctx) => {
		vi.mock('$lib/Dashboard/Game.svelte');

		render(Dashboard);

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
		playersStore.update((data) => ({
			...data,
			levels: ['newbie', 'expert'],
			players: [
				{
					name: 'Pepe',
					experience: 'expert',
					games: [Object.values(data.games)[0]]
				}
			]
		}));
		render(Dashboard);

		expect(
			screen.queryByText('(expert)')
		).toBeVisible();
	});
});
