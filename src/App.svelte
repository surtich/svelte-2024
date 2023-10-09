<script>
	import { Dashboard, Admin } from '$lib';
	import { Menu } from '$utils';

	let mainMenu = [
		{ title: 'Admin', component: Admin },
		{ title: 'Dashboard', component: Dashboard }
	];
	let activeMainMenu = 'Dashboard';
</script>

<Menu bind:active={activeMainMenu} menus={mainMenu} />
