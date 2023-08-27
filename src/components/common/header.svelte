<header>
	<span class="title">Movies & Reviews</span>
	<span class="links">
		<a href="/movies">Movies</a>
	</span>
</header>

<style>
	header {
		display: flex;
		position: sticky;
		top: 0;

		flex-direction: column;
		gap: 1rem;
		justify-content: space-between;
		align-items: center;
		background-color: #141414;
		padding: 1rem 2rem;
	}

	.title {
		font-weight: bold;
		color: rgb(255, 255, 0);
		font-size: 1.5rem;
	}

	.links {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.links a {
		color: rgb(255, 255, 0);
		text-decoration: none;
		font-size: 1rem;
	}

	.links a:hover {
		color: rgb(255, 255, 0);
		text-decoration: underline;
	}
</style>
