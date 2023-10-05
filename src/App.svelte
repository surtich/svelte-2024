<script>
	import Player from './lib/Player.svelte';
	import Game from './lib/Game.svelte';
	import * as samples from './data/samples.js';

	export let levels = samples.levels || [];
	export let games = samples.games || {};
	export let players = samples.players;

	function onLevelUp(playerName) {
		return () => {
			const player = players.find(
				(player) => player.name === playerName
			);
			if (
				!player ||
				player.experience ===
					levels[levels.length - 1]
			) {
				return;
			}
			let level = levels.indexOf(player.experience);
			player.experience = levels[level + 1];
			players = players;
		};
	}
</script>

{#each players as player}
	<Player
		name={player.name}
		experience={player.experience}
	>
		{#each player.games as game}
			<Game
				name={game.name}
				inc={game.inc}
				onLevelUp={onLevelUp(player.name)}
			/>
		{/each}
	</Player>
	<br />
{/each}
