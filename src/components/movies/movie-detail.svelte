<script lang="ts">
	import { goto } from '$app/navigation';
	import { toDateString } from '$lib/common/date-utils';
	import { mapGenre, type Movie } from '$lib/movies/movies.model';
	import Button from '../common/button.svelte';

	export let movie: Movie;

	const onNavigateUpdateMovie = () => {
		goto(`/movies/${movie.id}/update`);
	};
</script>

<div class="container">
	<div class="info-row">
		<span class="info-row-name">Genre:</span>
		<span>{mapGenre(movie.genre)}</span>
	</div>

	<div class="info-row">
		<span class="info-row-name">Title:</span>
		<span>{movie.title}</span>
	</div>

	<div class="info-row">
		<span class="info-row-name">Released At:</span>
		<span>{toDateString(movie.releasedAt)}</span>
	</div>

	<div class="info-row">
		<span class="info-row-name">End At:</span>
		<span>{toDateString(movie.endAt)}</span>
	</div>

	<Button
		text="Update Movie"
		class="navigate-update-review-button"
		onClick={onNavigateUpdateMovie}
	/>
</div>

<style>
	.container {
		display: flex;
		border: 1px solid black;
		padding: 1rem;
		flex-direction: column;
		justify-content: center;
		gap: 1rem;
		background-color: #fff;
	}

	div,
	span {
		font-size: 1.4rem;
	}

	.info-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
