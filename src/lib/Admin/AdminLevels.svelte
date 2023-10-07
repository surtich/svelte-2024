<script>
	import { get } from 'svelte/store';
	import playersStore from '$stores/players';
</script>

<ul>
	<!--
		Generally, you should read the value of a store by subscribing to it and using the value as it changes over time.
		Occasionally, you may need to retrieve the value of a store to which you're not subscribed.
		get allows you to do so. In this case, levels does not never change so we can use get to retrieve its value.
	-->

	{#each get(playersStore).levels as level}
		<li>{level}</li>
	{/each}
</ul>
