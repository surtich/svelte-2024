<script>
	import { Menu } from '$utils';
	import AdminLevels from './AdminLevels.svelte';
	import AdminGames from './AdminGames.svelte';
	import AdminPlayers from './AdminPlayers.svelte';

	export let levels;
	export let games;
	export let players;
	export let updatePlayer;

	let adminMenu = ['Levels', 'Games', 'Players'];
	let activeAdminMenu = 'Players';
</script>

<Menu
	bind:active={activeAdminMenu}
	menus={adminMenu}
/>

{#if activeAdminMenu === 'Levels'}
	<AdminLevels {levels} />
{:else if activeAdminMenu === 'Games'}
	<AdminGames />
{:else if activeAdminMenu === 'Players'}
	<AdminPlayers {games} {players} {updatePlayer} />
{/if}
