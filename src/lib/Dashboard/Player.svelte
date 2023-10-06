<script>
	export let name;
	export let experience;
</script>

<div aria-label="player {name}">
	<span>{name}</span> ({experience}) <slot />
</div>
