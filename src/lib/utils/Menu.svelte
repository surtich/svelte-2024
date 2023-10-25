<script>
	export let menus;
	export let active =
		menus && menus.length !== 0 && menus[0].title;
</script>

<ul class="clear-fix">
	{#each menus as { title } (title)}
		<li>
			<a
				aria-label="menu {title}"
				href="/"
				on:click|preventDefault={() => {
					active = title;
				}}
				class:active={active == title}>{title}</a
			>
		</li>
	{/each}
</ul>

{#each menus as { title, component, props = { } } (title)}
	{#if active == title}
		<svelte:component this={component} {...props} />
	{/if}
{/each}

<style>
	ul {
		list-style-type: none;
		display: block;
	}
	.clear-fix::after {
		content: '';
		display: table;
		clear: both;
	}
	li {
		float: left;
	}
	li:not(:last-child) {
		margin-right: 10px;
	}
	a {
		color: cornflowerblue;
		text-decoration: none;
	}
	a:visited {
		color: cornflowerblue;
	}
	a.active {
		text-decoration: underline;
	}
</style>
