<script>
	import { createEventDispatcher } from 'svelte';
	export let name = 'game';
	export let inc = 1;
	let points = 0;

	const dispatch = createEventDispatcher();

	$: {
		if (points >= 10) {
			points -= 10;
			dispatch('levelUp');
		}
	}

	function addPoints() {
		points += inc;
	}
</script>

<div>
	{points}
	<button on:click={addPoints}>Play {name}</button>
</div>

<style>
	div {
		display: inline-block;
		margin-left: 5px;
	}
</style>
