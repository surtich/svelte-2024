<script>
	import { Menu } from '$utils';
	import AdminLevels from './AdminLevels.svelte';
	import AdminGames from './AdminGames.svelte';
	import AdminPlayers from './AdminPlayers.svelte';

	let adminMenu = ['Levels', 'Games', 'Players'];
	let activeAdminMenu = 'Players';
</script>

<Menu
	bind:active={activeAdminMenu}
	menus={adminMenu}
/>

{#if activeAdminMenu === 'Levels'}
	<AdminLevels />
{:else if activeAdminMenu === 'Games'}
	<AdminGames />
{:else if activeAdminMenu === 'Players'}
	<AdminPlayers />
{/if}
