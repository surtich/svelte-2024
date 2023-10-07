<script>
	import { onMount } from 'svelte';

	import playersStore from '$stores/players';

	import Player from './Player.svelte';
	import Game from './Game.svelte';

	let players = [];

	onMount(() => {
		return playersStore.subscribe((data) => {
			players = data.players;
		});
	});

	function onLevelUp(playerName) {
		return () => {
			playersStore.update((data) => {
				const player = data.players.find(
					(player) => player.name === playerName
				);
				if (
					!player ||
					player.experience ===
						data.levels[data.levels.length - 1]
				) {
					return data;
				}
				let level = data.levels.indexOf(
					player.experience
				);
				player.experience = data.levels[level + 1];
				return data;
			});
			const player = players.find(
				(player) => player.name === playerName
			);
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
