<script>
	import { Dashboard, Admin } from '$lib';
	import { Menu } from '$utils';
	import * as samples from './data/samples.js';

	export let levels = samples.levels || [];
	export let games = samples.games || {};
	export let players = samples.players;

	let mainMenu = ['Admin', 'Dashboard'];
	let activeMainMenu = 'Dashboard';

	function updatePlayer(playerName, selectedGames) {
		const player = players.find(
			(player) => player.name === playerName
		);
		if (player) {
			player.games = selectedGames.map(
				(gameName) => games[gameName]
			);
		}
		players = players;
	}
</script>

<Menu bind:active={activeMainMenu} menus={mainMenu} />

{#if activeMainMenu === 'Admin'}
	<Admin {levels} {games} {players} {updatePlayer} />
{:else if activeMainMenu === 'Dashboard'}
	<Dashboard {levels} {players} />
{/if}
