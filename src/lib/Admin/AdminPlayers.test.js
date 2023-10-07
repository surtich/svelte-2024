import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	test,
	vi
} from 'vitest';
import { render } from '@testing-library/svelte';
import { click } from '@testing-library/user-event';

import AdminPlayers from './AdminPlayers.svelte';
import * as samples from '$data/samples.js';
import playersStore from '$stores/players';

const levels = samples.levels || [];
const games = samples.games || {};
const players = samples.players || [];
const player = players[0] || {};

describe('AdminPlayers', async () => {
	const updatePlayer = vi.fn();

	let component;
	beforeEach(() => {
		playersStore.set({
			levels,
			players,
			games
		});
		component = render(AdminPlayers);
	});

	describe('when the component is rendered', () => {
		it('should render the players', async () => {
			expect(
				await component.findByRole('listbox', {
					name: /players/i
				})
			).toBeInTheDocument();
		});

		it('renders all the games in checkbox elements', async () => {
			const checkboxElements =
				await component.findAllByRole('checkbox', {
					name: /game/i
				});

			checkboxElements.forEach((gameElement) => {
				const gameKey = gameElement.value;
				expect(gameKey in games).toBe(true);
			});

			expect(checkboxElements.length).toBe(
				Object.keys(games).length
			);
		});

		test('the game selection and the buttons are initially be disabled, but the player list is enabled.', async () => {
			const playersElement = component.getByRole(
				'listbox',
				{
					name: /players/i
				}
			);

			expect(playersElement.disabled).toBe(false);

			const checkboxElements = component.getAllByRole(
				'checkbox',
				{
					name: /game/i
				}
			);

			checkboxElements.forEach((gameElement) => {
				expect(gameElement.disabled).toBe(true);
			});

			const buttons = await component.findAllByRole(
				'button',
				{
					name: /game/i
				}
			);

			expect(buttons.length).toBe(2);
			expect(buttons[0].disabled).toBe(true);
			expect(buttons[1].disabled).toBe(true);
		});
	});

	describe('when a player is selected', () => {
		it("selects the player's games", async () => {
			const optionElement = document.querySelector(
				`option[value="${player.name}"]`
			);

			await click(optionElement);

			const checkboxElements = component.getAllByRole(
				'checkbox',
				{
					name: /game/i
				}
			);

			checkboxElements.forEach((gameElement) => {
				const gameKey = gameElement.value;
				const theGameIIsMine = !!player.games.find(
					(game) => game.key === gameKey
				);
				expect(
					gameElement.checked == theGameIIsMine
				).toBe(true);
			});
		});

		test("when I click again on a selected user, the player's games should be deselected.", async () => {
			const optionElement = document.querySelector(
				`option[value="${players[0].name}"]`
			);

			await click(optionElement);
			await click(optionElement);

			const checkboxElements = component.getAllByRole(
				'checkbox',
				{
					name: /game/i
				}
			);

			checkboxElements.forEach((gameElement) => {
				expect(gameElement.checked).toBe(false);
			});
		});

		test('when I click on the list, the user and their games are deselected.', async () => {
			const playersElement = component.getByRole(
				'listbox',
				{
					name: /players/i
				}
			);
			const optionElement = document.querySelector(
				`option[value="${players[0].name}"]`
			);

			await click(optionElement);
			await click(playersElement);

			const checkboxElements = component.getAllByRole(
				'checkbox',
				{
					name: /game/i
				}
			);

			checkboxElements.forEach((gameElement) => {
				expect(gameElement.checked).toBe(false);
			});
		});

		test('the game selection is enabled but the buttons are disabled.', async () => {
			const optionElement = document.querySelector(
				`option[value="${players[0].name}"]`
			);

			const checkboxElements = component.getAllByRole(
				'checkbox',
				{
					name: /game/i
				}
			);

			await click(optionElement);

			checkboxElements.forEach((gameElement) => {
				expect(gameElement.disabled).toBe(false);
			});

			const buttons = component.getAllByRole(
				'button',
				{
					name: /game/i
				}
			);

			expect(buttons[0].disabled).toBe(true);
			expect(buttons[1].disabled).toBe(true);
		});
	});

	describe('when a game is clicked', () => {
		let playersElement;
		let optionElement;
		let checkboxElements;
		let buttons;

		beforeEach(async () => {
			playersElement = component.getByRole(
				'listbox',
				{
					name: /players/i
				}
			);
			optionElement = document.querySelector(
				`option[value="${player.name}"]`
			);

			checkboxElements = component.getAllByRole(
				'checkbox',
				{
					name: /game/i
				}
			);

			buttons = component.getAllByRole('button', {
				name: /game/i
			});

			// player is selected;
			await click(optionElement);
		});

		test('the buttons are enabled if it is a new game', async () => {
			await click(checkboxElements[2]);

			expect(playersElement.disabled).toBe(true);
			expect(checkboxElements[2].checked).toBe(true);

			expect(buttons[0].disabled).toBe(false);
			expect(buttons[1].disabled).toBe(false);
		});

		test('the buttons are enabled if a game is deselected from the player.', async () => {
			await click(checkboxElements[0]);

			expect(playersElement.disabled).toBe(true);
			expect(checkboxElements[0].checked).toBe(false);

			expect(buttons[0].disabled).toBe(false);
			expect(buttons[1].disabled).toBe(false);
		});

		test('when a game is checked and then unchecked, the buttons are disabled.', async () => {
			await click(checkboxElements[2]);
			await click(checkboxElements[2]);

			expect(playersElement.disabled).toBe(false);
			expect(checkboxElements[2].checked).toBe(false);

			expect(buttons[0].disabled).toBe(true);
			expect(buttons[1].disabled).toBe(true);
		});

		describe('when the buttons are clicked', () => {
			let acceptButton;
			let rejectButton;

			beforeEach(async () => {
				acceptButton = buttons.find(
					(button) => button.textContent === 'Accept'
				);

				rejectButton = buttons.find(
					(button) => button.textContent === 'Cancel'
				);

				await click(checkboxElements[2]);
			});

			afterEach(() => {
				expect(acceptButton.disabled).toBe(true);
				expect(acceptButton.disabled).toBe(true);
			});

			test.skip('the add button click calls the updatePlayer function', async () => {
				await click(acceptButton);

				expect(playersElement.disabled).toBe(false);
				expect(updatePlayer).toHaveBeenCalledWith(
					player.name,
					checkboxElements
						.slice(0, 3)
						.map((checkbox) => checkbox.value)
				);
			});

			test('the reject button click does not call the updatePlayer function', async () => {
				await click(rejectButton);
			});
		});
	});
});
