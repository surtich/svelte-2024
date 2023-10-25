import { test, expect } from '@playwright/test';

import FuncionalSet from '$utils/FunctionalSet';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
	await page.getByLabel('menu Admin').click();
	await page
		.getByLabel('players', { exact: false })
		.getByRole('option')
		.first()
		.click();
	await page
		.locator('label')
		.filter({ hasText: 'monopoly' })
		.getByLabel('game')
		.check();
});

test.describe('Admin players', () => {
	test("When the player adds games and clicks 'accept,' the new games are added as favorites.", async ({
		page
	}) => {
		await page.getByLabel('accept').click();

		await page.getByLabel('menu Dashboard').click();

		const games = await page
			.getByLabel('player Pepe')
			.getByRole('button')
			.allTextContents();

		expect(
			FuncionalSet.sameElements(games, [
				'Play chess',
				'Play blackjack',
				'Play monopoly'
			])
		);
	});
	test("When the player adds games and clicks 'cancel,' the players games are not modified.", async ({
		page
	}) => {
		await page.getByLabel('cancel').click();

		await page.getByLabel('menu Dashboard').click();

		const games = await page
			.getByLabel('player Pepe')
			.getByRole('button')
			.allTextContents();

		expect(
			FuncionalSet.sameElements(games, [
				'Play chess',
				'Play blackjack'
			])
		).toBe(true);
	});
});
