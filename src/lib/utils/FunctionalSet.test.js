import { describe, it, expect } from 'vitest';
import FunctionalSet from './FunctionalSet';

describe('FunctionalSet', () => {
	const equalsFunction = (x, y) =>
		'name' in x &&
		'name' in y &&
		x.name.toLowerCase() === y.name.toLowerCase();
	const uniqueNamesSet = new FunctionalSet(
		equalsFunction
	).add(
		{ name: 'pepe', age: 30 },
		{ name: 'luis', age: 40 },
		{ name: 'pepe', age: 50 },
		{ name: 'Luis', age: 50 }
	);

	it('has function', () => {
		expect(uniqueNamesSet.has({ name: 'pepe' })).toBe(
			true
		);
		expect(uniqueNamesSet.has({ name: 'Pepe' })).toBe(
			true
		);
		expect(uniqueNamesSet.has({ name: 'luis' })).toBe(
			true
		);
		expect(uniqueNamesSet.has({ name: 'Ana' })).toBe(
			false
		);
		expect(uniqueNamesSet.size()).toBe(2);
	});

	it('remove function', () => {
		const set = uniqueNamesSet.remove({
			name: 'pepe'
		});
		expect(set.has({ name: 'Pepe' })).toBe(false);
		expect(set.size()).toBe(1);
	});

	it('immutability test', () => {
		uniqueNamesSet.add({
			name: 'ana'
		});

		uniqueNamesSet.remove({
			name: 'Pepe'
		});

		expect(uniqueNamesSet.has({ name: 'ana' })).toBe(
			false
		);
		expect(uniqueNamesSet.has({ name: 'pepe' })).toBe(
			true
		);
		expect(uniqueNamesSet.size()).toBe(2);
	});

	it('union function', () => {
		const set = uniqueNamesSet.union([
			{
				name: 'ana'
			}
		]);

		expect(set.has({ name: 'Pepe' })).toBe(true);
		expect(set.has({ name: 'Ana' })).toBe(true);
		expect(set.has({ name: 'Juan' })).toBe(false);
		expect(set.size()).toBe(3);
	});

	it('difference function', () => {
		const set = uniqueNamesSet.difference([
			{ name: 'Pepe' },
			{
				name: 'ana'
			}
		]);

		expect(set.has({ name: 'Pepe' })).toBe(false);
		expect(set.has({ name: 'Ana' })).toBe(false);
		expect(set.has({ name: 'Luis' })).toBe(true);
		expect(set.size()).toBe(1);
	});

	it('intersection function', () => {
		const set = uniqueNamesSet.intersection([
			{ name: 'Pepe' },
			{
				name: 'ana'
			}
		]);

		expect(set.has({ name: 'Pepe' })).toBe(true);
		expect(set.has({ name: 'Ana' })).toBe(false);
		expect(set.has({ name: 'Luis' })).toBe(false);
		expect(set.size()).toBe(1);
	});

	it('equals function', () => {
		expect(
			uniqueNamesSet.equals([
				{ name: 'Pepe' },
				{
					name: 'ana'
				}
			])
		).toBe(false);
		expect(
			uniqueNamesSet.equals([
				{ name: 'Pepe' },
				{
					name: 'Luis'
				}
			])
		).toBe(true);
		expect(
			uniqueNamesSet.equals([
				{ name: 'Luis' },
				{
					name: 'Pepe'
				}
			])
		).toBe(true);
		expect(
			uniqueNamesSet.equals([
				{ name: 'Pepe' },
				{
					name: 'ana'
				},
				{
					name: 'Luis'
				}
			])
		).toBe(false);
		expect(
			new FunctionalSet(equalsFunction)
				.add(
					{ name: 'Pepe' },
					{
						name: 'ana'
					},
					{
						name: 'Luis'
					}
				)
				.equals(uniqueNamesSet)
		).toBe(false);
	});
	it('includes function', () => {
		expect(
			uniqueNamesSet.includes([
				{ name: 'Pepe' },
				{
					name: 'ana'
				}
			])
		).toBe(false);
		expect(
			uniqueNamesSet.includes([
				{ name: 'Pepe' },
				{
					name: 'Luis'
				}
			])
		).toBe(true);
		expect(
			uniqueNamesSet.includes([{ name: 'Luis' }])
		).toBe(true);
		expect(uniqueNamesSet.includes([])).toBe(true);
		expect(
			new FunctionalSet(equalsFunction)
				.add(
					{ name: 'Pepe' },
					{
						name: 'ana'
					},
					{
						name: 'Luis'
					}
				)
				.includes(uniqueNamesSet)
		).toBe(true);
	});
});
