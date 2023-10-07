<script>
	import { Dashboard, Admin } from '$lib';
	import { Menu } from '$utils';

	let mainMenu = ['Admin', 'Dashboard'];
	let activeMainMenu = 'Dashboard';
</script>

<Menu bind:active={activeMainMenu} menus={mainMenu} />

{#if activeMainMenu === 'Admin'}
	<Admin />
{:else if activeMainMenu === 'Dashboard'}
	<Dashboard />
{/if}
