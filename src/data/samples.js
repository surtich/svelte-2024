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
		inc: 1
	},
	blackYack: {
		name: 'black yack',
		inc: 2
	}
};

export const players = [
	{
		name: 'Pepe',
		experience: 'newbie',
		games: [games.chess, games.blackYack]
	},
	{
		name: 'Lucas',
		experience: 'expert',
		games: [games.blackYack]
	}
];
