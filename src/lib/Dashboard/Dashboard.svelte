<script>
	import playersStore from '$stores/players';

	import Player from './Player.svelte';
	import Game from './Game.svelte';

	function onLevelUp(playerName) {
		return () => {
			const playerIndex =
				$playersStore.players.findIndex((player) => {
					return player.name === playerName;
				});

			const player =
				$playersStore.players[playerIndex];

			if (
				player.experience ===
				$playersStore.levels[
					$playersStore.levels.length - 1
				]
			) {
				return;
			}
			let level = $playersStore.levels.indexOf(
				player.experience
			);
			$playersStore.players[playerIndex].experience =
				$playersStore.levels[level + 1];
		};
	}
</script>

<h1>Dashboard</h1>

{#each $playersStore.players as { name, experience, games }}
	<Player {name} {experience}>
		{#each games as game}
			<Game {...game} on:levelUp={onLevelUp(name)} />
		{/each}
	</Player>
	<br />
{/each}
