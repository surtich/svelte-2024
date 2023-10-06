<script>
	import { createEventDispatcher } from 'svelte';

	$$restProps; // to avoid the anoying warning: "<Game> was created with unknown prop 'color'"
	export let name = 'game';
	export let inc = 1;

	const dispatch = createEventDispatcher();
</script>

<div>
	<button
		data-testid="addPoints-button"
		on:click={() => dispatch('levelUp')}
		>Play
	</button>
</div>
