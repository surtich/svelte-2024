import { render } from '@testing-library/svelte';
import {
	beforeEach,
	expect,
	describe,
	it,
	test,
	vi
} from 'vitest';
import { click } from '@testing-library/user-event';

import Select from './Select.svelte';

describe('Select', () => {
	const chars = ['A', 'B', 'C'];

	let component;
	const onClick = vi.fn();

	beforeEach(() => {
		component = render(Select, {
			values: chars,
			label: 'Chars',
			onClick
		});
	});

	describe('when the component is rendered', () => {
		it('should render the values', async () => {
			expect(
				await component.findByRole('listbox', {
					name: /chars/i
				})
			).toBeInTheDocument();
		});

		it('renders the chars in the select element', async () => {
			const charsElement = component.getByRole(
				'listbox',
				{
					name: /chars/i
				}
			);

			chars.forEach((char) => {
				const optionElement =
					charsElement.querySelector(
						`option[value="${char}"]`
					);
				expect(optionElement).toBeInTheDocument();
				expect(optionElement.textContent).toBe(char);
			});
		});
	});

	describe('when a char is selected', () => {
		it('selects the clicked char', async () => {
			const optionElement = document.querySelector(
				`option[value="${chars[0]}"]`
			);

			await click(optionElement);

			expect(optionElement.selected).toBe(true);
		});

		test('when I click again on the selected char,the char should be deselected.', async () => {
			const optionElement = document.querySelector(
				`option[value="${chars[0]}"]`
			);

			await click(optionElement);
			await click(optionElement);

			expect(optionElement.selected).toBe(false);
		});

		test('when I click on the list, the char is deselected.', async () => {
			const charsElement = component.getByRole(
				'listbox',
				{
					name: /chars/i
				}
			);
			const optionElement = document.querySelector(
				`option[value="${chars[0]}"]`
			);

			await click(optionElement);
			await click(charsElement);

			expect(optionElement.selected).toBe(false);
		});

		it('the onClick function should be called', async () => {
			const optionElement = document.querySelector(
				`option[value="${chars[0]}"]`
			);

			await click(optionElement);

			expect(onClick).toHaveBeenCalledWith(chars[0]);
		});
	});
});
