import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
	await page.getByLabel('menu Dashboard').click();
});

test.describe('Dashboard', () => {
	test('When the player reaches ten or more points in a game, their experience increases, and the points reset to zero.', async ({
		page
	}) => {
		await page
			.getByRole('button', { name: 'Play chess' })
			.click({
				clickCount: 6
			});
		await expect(
			page.getByText('Pepe (newbie) 6')
		).toBeVisible();
		await page
			.getByRole('button', { name: 'Play chess' })
			.click({
				clickCount: 4
			});
		await expect(
			page.getByText('Pepe (beginner) 0')
		).toBeVisible();
	});

	test('When the player reaches the maximum experience, even if she scores an additional 10 points, the experience remains unchanged.', async ({
		page
	}) => {
		await page
			.getByRole('button', {
				name: 'Play blackjack'
			})
			.first()
			.click({
				clickCount: 100
			});
		await expect(
			page.getByText('Pepe (GOAT!) 0')
		).toBeVisible();

		await page.getByLabel('menu Dashboard').click();
	});
});
