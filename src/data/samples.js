export const levels = [
	'newbie',
	'beginner',
	'junior',
	'senior',
	'expert',
	'master',
	'GOAT!'
];

export const games = {
	chess: {
		name: 'chess',
		key: 'chess',
		inc: 1,
		color: 'green'
	},
	blackjack: {
		name: 'blackjack',
		key: 'blackjack',
		inc: 2,
		color: 'blue'
	},
	monopoly: {
		name: 'monopoly',
		key: 'monopoly',
		inc: 3,
		color: '#DC143C'
	},
	sudoku: {
		name: 'sudoku',
		key: 'sudoku',
		inc: 2,
		color: '#FFA500'
	}
};

export const players = [
	{
		name: 'Pepe',
		experience: 'newbie',
		games: [games.chess, games.blackjack]
	},
	{
		name: 'Lucas',
		experience: 'expert',
		games: [games.blackjack]
	}
];
