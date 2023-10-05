<script>
	export let name = 'game';
	export let inc = 1;
	export let onLevelUp = () => {};
</script>

<div>
	<button
		data-testid="addPoints-button"
		on:click={onLevelUp}
		>Play
	</button>
</div>
