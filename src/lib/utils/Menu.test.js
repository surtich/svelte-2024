import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Menu from './Menu.svelte';
import { click } from '@testing-library/user-event';

describe('Menu', () => {
	it('renders the list of menus', async () => {
		const menus = ['Home', 'About', 'Contact'];
		const { getByText } = render(Menu, {
			menus,
			active: 'Home'
		});

		const homeElement = getByText('Home');
		const aboutElement = getByText('About');
		const contactElement = getByText('Contact');

		expect(homeElement).toBeInTheDocument();
		expect(aboutElement).toBeInTheDocument();
		expect(contactElement).toBeInTheDocument();
	});

	it('sets the active menu when a menu is clicked', async () => {
		const menus = ['Home', 'About'];
		const { getByText } = render(Menu, {
			menus,
			active: 'Home'
		});

		const homeElement = getByText('Home');
		const aboutElement = getByText('About');

		expect(homeElement).toHaveClass('active');
		expect(aboutElement).not.toHaveClass('active');

		await click(aboutElement);

		expect(homeElement).not.toHaveClass('active');
		expect(aboutElement).toHaveClass('active');
	});
});
