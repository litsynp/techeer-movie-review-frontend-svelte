<footer>
	<div class="container">
		<span class="developer-text">
			<span>Developed by</span>
			<a href="https://github.com/litsynp" class="developer-link">@litsynp</a>
		</span>
	</div>
</footer>

<style>
	footer {
		display: flex;
		padding: 2rem 2rem;
		width: 100%;
		box-sizing: border-box;
		gap: 1rem;

		position: sticky;
		bottom: 0;

		justify-content: space-between;
		align-items: center;
		background-color: #141414;
	}

	footer .container {
		display: flex;
		flex-direction: column;
		width: 100%;
		justify-content: space-between;
		align-items: center;
	}

	span.developer-text {
		display: flex;
		gap: 0.1rem;
		color: rgb(255, 255, 0);
	}

	span.developer-text > * {
		font-size: 1.2rem;
	}

	span.developer-text > a.developer-link {
		text-decoration: none;
		color: rgb(255, 255, 0);
		font-style: italic;
	}
</style>
