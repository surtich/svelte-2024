import { writable } from 'svelte/store';

import * as samples from '$data/samples.js';

const levels = samples.levels || [];
const players = samples.players || [];
const games = samples.games || {};

const playersStore = writable({
	levels,
	players,
	games
});

function updatePlayer(playerName, selectedGames) {
	playersStore.update((data) => {
		const player = data.players.find(
			(player) => player.name === playerName
		);
		if (player) {
			player.games = selectedGames.map(
				(gameName) => data.games[gameName]
			);
		}
		return data;
	});
}

function onLevelUp(playerName) {
	return () => {
		playersStore.update((data) => {
			const playerIndex = data.players.findIndex(
				(player) => {
					return player.name === playerName;
				}
			);

			const player = data.players[playerIndex];

			if (
				player.experience ===
				data.levels[data.levels.length - 1]
			) {
				return data;
			}
			let level = data.levels.indexOf(
				player.experience
			);
			data.players[playerIndex].experience =
				data.levels[level + 1];

			return data;
		});
	};
}

export default {
	...playersStore,
	updatePlayer,
	onLevelUp
};
