<script lang="ts">
	import { goto } from '$app/navigation';
	import { toDateString } from '$lib/common/date-utils';
	import { mapGenre, type Movie } from '$lib/movies/movies.model';

	export let movie: Movie;

	const onNavigateUpdateMovie = () => {
		goto(`/movies/${movie.id}/update`);
	};
</script>

<div class="movie-item">
	<span>
		Genre: {mapGenre(movie.genre)}
	</span>

	<span>
		Title: {movie.title}
	</span>

	<span>
		Released At: {toDateString(movie.releasedAt)}
	</span>

	<span>
		End At: {toDateString(movie.endAt)}
	</span>

	<button type="button" class="navigate-update-review-button" on:click={onNavigateUpdateMovie}>
		Update Movie
	</button>
</div>

<style>
	.movie-item {
		display: flex;
		border: 1px solid black;
		padding: 1rem;
		flex-direction: column;
		justify-content: center;
		gap: 1rem;
	}
</style>
