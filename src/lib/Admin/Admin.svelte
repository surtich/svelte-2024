<script>
	import { Menu } from '$utils';
	import AdminLevels from './AdminLevels.svelte';
	import AdminGames from './AdminGames.svelte';
	import AdminPlayers from './AdminPlayers.svelte';

	let adminMenu = [
		{ title: 'Levels', component: AdminLevels },
		{ title: 'Games', component: AdminGames },
		{ title: 'Players', component: AdminPlayers }
	];
	let activeAdminMenu = 'Players';
</script>

<Menu
	key="AdminMenu"
	bind:defaultActive={activeAdminMenu}
	menus={adminMenu}
/>
