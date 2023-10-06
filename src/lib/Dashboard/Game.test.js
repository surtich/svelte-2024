import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import { click } from '@testing-library/user-event';
import Game from './Game.svelte';

describe('Game', () => {
	const exampleGame = {
		name: 'My Game',
		inc: 2
	};

	it('renders the initial points and name', () => {
		const { getByText } = render(Game, exampleGame);

		const pointsElement = getByText('0');
		const buttonElement = getByText('Play My Game');

		expect(pointsElement).toBeInTheDocument();
		expect(buttonElement).toBeInTheDocument();
	});

	it('increments the points when the button is clicked', async () => {
		const { getByText } = render(Game, exampleGame);

		const pointsElement = getByText('0');
		const buttonElement = getByText('Play My Game');

		await click(buttonElement);
		await click(buttonElement);

		expect(pointsElement).toHaveTextContent('4');
	});

	it('ensures "levelUp" event is fired', async () => {
		const { getByText, component } = render(
			Game,
			exampleGame
		);

		const mock = vi.fn(() => {});
		component.$on('levelUp', mock);

		const buttonElement = getByText('Play My Game');

		await click(buttonElement);
		await click(buttonElement);
		await click(buttonElement);
		await click(buttonElement);
		await click(buttonElement);

		expect(mock).toHaveBeenCalled();
	});

	it('resets the points after the player levels up', async () => {
		const onLevelUp = vi.fn();

		const { getByText } = render(Game, exampleGame);

		const pointsElement = getByText('0');
		const buttonElement = getByText('Play My Game');

		await click(buttonElement);
		await click(buttonElement);
		await click(buttonElement);
		await click(buttonElement);

		expect(pointsElement).toHaveTextContent('8');

		await click(buttonElement);
		expect(pointsElement).toHaveTextContent('0');
	});
});
