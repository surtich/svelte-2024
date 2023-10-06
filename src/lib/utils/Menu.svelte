<script>
	export let menus;
	export let active;
</script>

<ul class="clear-fix">
	{#each menus as menu}
		<li>
			<a
				aria-label="menu {menu}"
				href="/"
				on:click|preventDefault={() => {
					active = menu;
				}}
				class:active={active == menu}>{menu}</a
			>
		</li>
	{/each}
</ul>

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
