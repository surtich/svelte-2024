<script>
	export let name = 'game';
	export let color = 'red';

	$: title = `Play ${name}`;
</script>

<button style="color:{color};" on:click
	>{title}</button
>
