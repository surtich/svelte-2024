<script>
	import { createEventDispatcher } from 'svelte';
	export let title = 'Play game';
	export let color = 'red';

	const dispatch = createEventDispatcher();
</script>

<button
	style="color:{color};"
	on:click={() => dispatch('addPoints')}
	>{title}</button
>
