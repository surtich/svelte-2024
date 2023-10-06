<script>
	export let label = '';
	export let size = 10;
	export let values = [];
	export let selectedValue = '';
	export let disabled = false;
	export let onClick = (_) => {};

	function selectValue(value) {
		selectedValue =
			value === selectedValue ? undefined : value;
		onClick(selectedValue);
	}
</script>

<label>
	<span>{label}</span><br />

	<select
		aria-label={label}
		{size}
		value={selectedValue}
		{disabled}
		on:click={() => selectValue()}
		{...$$restProps}
	>
		{#each values as value (value)}
			<option
				{disabled}
				on:click|stopPropagation={() =>
					selectValue(value)}
				{value}>{value}</option
			>
		{/each}
	</select>
</label>

<style>
	label {
		float: left;
		margin-right: 20px;
	}
	select {
		width: 120px;
		overflow: hidden;
		outline: none;
	}
</style>
