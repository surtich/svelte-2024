<script>
	import Button from './Button.svelte';
	import { createEventDispatcher } from 'svelte';
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
	<Button on:click={addPoints} {...$$restProps} />
</div>

<style>
	div {
		display: inline-block;
		margin-left: 5px;
	}
</style>
