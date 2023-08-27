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
		max-width: 1536px;
		min-height: 100vh;
		margin: 0 auto;
	}

	main {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		padding: 1rem 2rem;
	}
</style>
