<script lang="ts">
	import { goto } from '$app/navigation';
	import { toDateString } from '$lib/common/date-utils';
	import { mapGenre, type Movie } from '$lib/movies/movies.model';

	export let movie: Movie;

	const gotoMovie = () => {
		goto(`/movies/${movie.id}`);
	};
</script>

<div
	class="container"
	on:click={gotoMovie}
	on:keyup={(e) => {
		if (e.key === 'Enter') {
			gotoMovie();
		}
	}}
	tabindex="0"
	role="button"
>
	<div class="info">
		<span class="title">
			{movie.title}
		</span>
		<span class="genre">
			#{mapGenre(movie.genre)}
		</span>
	</div>

	<div class="dates">
		<span>
			Released At: {toDateString(movie.releasedAt)}
		</span>

		<span>
			End At: {toDateString(movie.endAt)}
		</span>
	</div>
</div>

<style>
	.container {
		display: flex;
		border: 1px solid black;
		padding: 1rem;
		gap: 1rem;
		cursor: pointer;
		justify-content: space-between;
		background-color: #fff;
	}

	span,
	div {
		font-size: 1.4rem;
	}

	.container:hover,
	.container:focus {
		outline: none;
		background-color: rgb(255, 255, 177);;
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.info > .title {
		font-style: italic;
	}

	.dates {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: end;
		gap: 0.5rem;
	}
</style>
