<script>
	import Player from './Player.svelte';
	import Game from './Game.svelte';

	export let levels;
	export let players;

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

<h1>Dashboard</h1>

{#each players as { name, experience, games }}
	<Player {name} {experience}>
		{#each games as game}
			<Game {...game} on:levelUp={onLevelUp(name)} />
		{/each}
	</Player>
	<br />
{/each}
