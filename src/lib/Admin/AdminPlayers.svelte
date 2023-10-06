<script>
	import Select from '$lib/utils/Select.svelte';

	export let games = {};
	export let players = [];
	export let updatePlayer = () => {};

	let selectedPlayer = undefined;
	const gameNames = Object.keys(games);
	let selectedGames = [];
	let hasChanges = false;

	function selectPlayer(selectedPlayer) {
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
			hasChanges =
				playerGames.length !== selectedGames.length ||
				new Set([...selectedGames, ...playerGames])
					.size > selectedGames.length;
		}
	}
</script>

<Select
	aria-label="players"
	label="Players"
	disabled={hasChanges}
	size={Math.max(10, gameNames.length + 2)}
	values={players.map((p) => p.name)}
	bind:selectedValue={selectedPlayer}
	onClick={selectPlayer}
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
