<script>
	import FuncionalSet from '$utils/FunctionalSet';
	import Select from '$lib/utils/Select.svelte';
	import playersStore from '$stores/players';

	$: gameNames = Object.keys($playersStore.games);

	let selectedPlayer = undefined;
	let selectedGames = [];
	let hasChanges = false;

	function onSelectPlayer(selectedPlayer) {
		selectedGames = getGames(selectedPlayer);
	}

	function getGames(player) {
		return player
			? $playersStore.players
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
	values={$playersStore.players.map((p) => p.name)}
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
				<span
					style="color:{$playersStore.games[gameName]
						.color};">{gameName}</span
				>
				<span
					>(+{$playersStore.games[gameName]
						.inc})</span
				>
			</label>
			<br />
		{/each}
	</div>
</div>
<button
	aria-label="accept games changes"
	disabled={!hasChanges}
	on:click={() => {
		playersStore.updatePlayer(
			selectedPlayer,
			selectedGames
		);
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
