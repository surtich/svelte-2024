<script>
	export let levels = [];
</script>

<ul>
	{#each levels as level}
		<li>{level}</li>
	{/each}
</ul>
