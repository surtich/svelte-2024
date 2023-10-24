<script>
	import playersStore from '$stores/players';

	import Player from './Player.svelte';
	import Game from './Game.svelte';
</script>

<h1>Dashboard</h1>

{#each $playersStore.players as { name, experience, games }}
	<Player {name} {experience}>
		{#each games as game}
			<Game
				{...game}
				on:levelUp={playersStore.onLevelUp(name)}
			/>
		{/each}
	</Player>
	<br />
{/each}
