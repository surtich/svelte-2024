<script>
	import Menu from '$lib/utils/Menu.svelte';
	import playersStore from '$stores/players';
	import Game from './Game.svelte';

	const gameMenu = Object.values(
		$playersStore.games
	).map((game) => ({
		title: game.name,
		component: Game,
		props: {
			gameName: game.name,
			gameColor: game.color
		}
	}));
</script>

<Menu key="GamesMenu" menus={gameMenu} />
