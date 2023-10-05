<script>
	export let name = 'game';
	export let inc = 1;
	export let onLevelUp = () => {};
	let points = 0;

	function addPoints() {
		points += inc;
		if (points >= 10) {
			points -= 10;
			onLevelUp();
		}
	}
</script>

<div>{points} <button on:click={addPoints}>Play {name}</button></div>

<style>
	div {
		display: inline-block;
		margin-left: 5px;
	}
</style>
