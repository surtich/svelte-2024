<script>
	export let games = {};
	export let players = [];
	export let updatePlayer = () => {};

	let selectedPlayer = undefined;
	const gameNames = Object.keys(games);
	let selectedGames = [];
	let hasChanges = false;

	function selectPlayer(playerName) {
		selectedPlayer =
			playerName === selectedPlayer
				? undefined
				: playerName;
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

<label>
	<span>Players</span><br />

	<select
		aria-label="players"
		size={Math.max(10, gameNames.length + 2)}
		value={selectedPlayer}
		on:click={() => selectPlayer()}
		disabled={hasChanges}
	>
		{#each players as player (player.name)}
			<option
				disabled={hasChanges}
				on:click|stopPropagation={() =>
					selectPlayer(player.name)}
				value={player.name}>{player.name}</option
			>
		{/each}
	</select>
</label>

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
	label {
		display: inline-block;
		float: left;
		margin-right: 20px;
	}
	label:not(:last-of-type) {
	}
	select {
		width: 120px;
		overflow: hidden;
		outline: none;
	}
	.games {
		float: left;
	}
</style>
