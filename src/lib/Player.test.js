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

	it("shows the player's experience in parentheses.", () => {
		render(Player, {
			...examplePlayer,
			experience: 'junior'
		});
		expect(
			screen.queryByText('(junior)')
		).toBeVisible();
	});

	it('displays the name of another person', () => {
		render(Player, {
			...examplePlayer,
			name: 'Athena'
		});
		expect(
			screen.queryByText('Athena')
		).toBeVisible();
	});

	/* Currently, @testing-library/svelte does not support using slots. */
	it.skip('checks that the slot has been rendered.', async () => {
		const { getByText } = render(Player, {
			props: {
				name: 'John',
				experience: 42
			},
			slots: {
				default: '¡Hola, mundo!'
			}
		});

		const playerElement = document.body.firstChild;
		const slotElement = getByText('¡Hola, mundo!');

		expect(playerElement).toContainElement(
			slotElement
		);
	});
});
