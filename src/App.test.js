import {
	beforeEach,
	describe,
	expect,
	it,
	vi
} from 'vitest';
import { render } from '@testing-library/svelte';
import App from './App.svelte';
import { click } from '@testing-library/user-event';

import * as samples from '$data/samples.js';

describe('App', () => {
	beforeEach(() => {
		vi.mock('$lib/Dashboard/Dashboard.svelte');
		vi.mock('$lib/Admin/Admin.svelte');
	});
	it('should render the Dashboard component initially', async () => {
		const component = render(App);

		expect(
			component.getByTestId('dashboard')
		).toBeInTheDocument();
		expect(
			component.queryByTestId('admin')
		).not.toBeInTheDocument();
	});

	it('should render the Admin component after the Admin menu was clicked', async () => {
		const { queryByTestId, getByTestId, getByRole } =
			render(App);

		const adminLink = getByRole('link', {
			name: /admin/i
		});

		await click(adminLink);

		expect(
			queryByTestId('dashboard')
		).not.toBeInTheDocument();
		expect(
			queryByTestId('admin')
		).toBeInTheDocument();
	});
});
