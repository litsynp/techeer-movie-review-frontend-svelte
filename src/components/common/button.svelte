<script lang="ts">
	export let text: string;
	export let onClick: (() => void) | null = null;
</script>

<button {...$$restProps} {...$$props} on:click={onClick}>
	{text}
</button>

<style>
	button {
		padding: 0.5rem 1rem;
		border: 1px solid #000;
		cursor: pointer;
		background-color: #fff;
		font-size: 1.2rem;
		font-weight: bold;
	}

	button:hover,
	button:focus {
		background-color: rgb(255, 255, 177);
	}
</style>
