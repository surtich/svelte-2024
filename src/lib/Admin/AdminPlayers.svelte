<script>
	import { onMount } from 'svelte';

	import FuncionalSet from '$utils/FunctionalSet';
	import Select from '$lib/utils/Select.svelte';
	import playersStore from '$stores/players';

	export let games = {};
	let players = [];

	onMount(() => {
		return playersStore.subscribe((data) => {
			games = data.games;
			players = data.players;
		});
	});

	$: gameNames = Object.keys(games);

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

	let selectedPlayer = undefined;
	let selectedGames = [];
	let hasChanges = false;

	function onSelectPlayer(selectedPlayer) {
		selectedGames = getGames(selectedPlayer);
	}

	function getGames(player) {
		return player
			? players
					.find((p) => p.name === player)
					.games.map((g) => g.key)
			: [];
	}

	function onCancel() {
		selectedGames = getGames(selectedPlayer);
	}

	$: {
		if (!selectedPlayer) {
			hasChanges = false;
		} else {
			const playerGames = getGames(selectedPlayer);
			hasChanges = !FuncionalSet.sameElements(
				selectedGames,
				playerGames
			);
		}
	}
</script>

<Select
	label="Players"
	size={Math.max(10, gameNames.length + 2)}
	values={players.map((p) => p.name)}
	bind:selectedValue={selectedPlayer}
	disabled={hasChanges}
	onClick={onSelectPlayer}
></Select>

<div class="container clear-fix">
	<div class="games">
		<span>Game Selector</span><br />
		{#each gameNames as gameName (gameName)}
			<label>
				<input
					aria-label="game"
					type="checkbox"
					bind:group={selectedGames}
					value={gameName}
					disabled={!selectedPlayer}
				/>
				<span style="color:{games[gameName].color};"
					>{gameName}</span
				> <span>(+{games[gameName].inc})</span>
			</label>
			<br />
		{/each}
	</div>
</div>
<button
	aria-label="accept games changes"
	disabled={!hasChanges}
	on:click={() => {
		updatePlayer(selectedPlayer, selectedGames);
		hasChanges = false;
	}}>Accept</button
>
<button
	aria-label="cancel games changes"
	disabled={!hasChanges}
	on:click={onCancel}>Cancel</button
>

<style>
	.clear-fix::after {
		content: '';
		display: table;
		clear: both;
	}

	.games {
		float: left;
	}
</style>
