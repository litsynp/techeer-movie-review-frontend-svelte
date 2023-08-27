<script>
	import Footer from '../components/common/footer.svelte';
	import Header from '../components/common/header.svelte';
</script>

<body>
	<Header />

	<main>
		<slot />
	</main>

	<Footer />
</body>

<style>
	body {
		position: relative;
		min-height: 100%;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 100vh;
		background: url(https://grainy-gradients.vercel.app/noise.svg);
	}

	main {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		padding: 4rem 2rem;
	}
</style>
