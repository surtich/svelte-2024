<script>
	import { Dashboard, Admin } from '$lib';
	import { Menu } from '$utils';
	import * as samples from './data/samples.js';

	export let levels = samples.levels || [];
	export let games = samples.games || {};
	export let players = samples.players;

	let mainMenu = ['Admin', 'Dashboard'];
	let activeMainMenu = 'Dashboard';
</script>

<Menu bind:active={activeMainMenu} menus={mainMenu} />

{#if activeMainMenu === 'Admin'}
	<Admin {levels} {players} />
{:else if activeMainMenu === 'Dashboard'}
	<Dashboard {levels} {players} />
{/if}
