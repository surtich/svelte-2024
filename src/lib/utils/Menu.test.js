import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import { click } from '@testing-library/user-event';

import Menu from './Menu.svelte';

describe('Menu', () => {
	it('renders the list of menus', async () => {
		const menus = [
			{
				title: 'Home',
				component: null
			},
			{ title: 'About', component: null },
			{ title: 'Contact', component: null }
		];
		const { getByText } = render(Menu, {
			menus,
			defaultActive: 'Home'
		});

		const homeElement = getByText('Home');
		const aboutElement = getByText('About');
		const contactElement = getByText('Contact');

		expect(homeElement).toBeInTheDocument();
		expect(aboutElement).toBeInTheDocument();
		expect(contactElement).toBeInTheDocument();
	});

	it('sets the active menu when a menu is clicked', async () => {
		const menus = [
			{ title: 'Home', component: null },
			{ title: 'About', component: null }
		];
		const { getByText } = render(Menu, {
			menus,
			defaultActive: 'Home'
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
