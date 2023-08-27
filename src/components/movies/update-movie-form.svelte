<script lang="ts">
	import { goto } from '$app/navigation';
	import { toDateString } from '$lib/common/date-utils';
	import { movieClient } from '$lib/movies/movies.client';
	import { GENRES_MAP, mapGenre, type Genre, type Movie } from '$lib/movies/movies.model';
	import Button from '../common/button.svelte';

	export let movie: Movie;

	const onSubmitUpdateMovie = async ({ target }: Event) => {
		const formData = new FormData(target as HTMLFormElement);

		try {
			await movieClient.updateMovieById(movie.id, {
				genre: formData.get('genres') as Genre,
				title: formData.get('title') as string,
				releasedAt: new Date(formData.get('releasedAt') as string),
				endAt: new Date(formData.get('endAt') as string)
			});
			alert('Movie updated!');
			goto(`/movies/${movie.id}`);
		} catch (error) {
			console.log(error);
			alert('Failed to update movie!');
		}
	};

	const onDeleteMovie = async () => {
		if (!confirm('Are you sure you want to delete this movie?')) {
			return;
		}

		try {
			await movieClient.deleteMovieById(movie.id);
			alert('Movie deleted!');
			goto('/movies');
		} catch (error) {
			alert('Failed to delete movie!');
		}
	};
</script>

<div class="container">
	<form class="update-movie-form" on:submit|preventDefault={onSubmitUpdateMovie}>
		<span class="input-group">
			<label for="genre">Genre:</label>
			<select name="genres" id="genres">
				{#each Object.keys(GENRES_MAP) as genre}
					<option value={genre} selected={movie.genre === genre}>{mapGenre(genre)}</option>
				{/each}
			</select>
		</span>

		<span class="input-group">
			<label for="title">Title:</label>
			<input type="text" name="title" placeholder="Movie Title" value={movie.title} required />
		</span>

		<span class="input-group">
			<label for="releasedAt">Released At:</label>
			<input type="date" name="releasedAt" value={toDateString(movie.releasedAt)} required />
		</span>

		<span class="input-group">
			<label for="endAt">End At:</label>
			<input type="date" name="endAt" value={toDateString(movie.endAt)} required />
		</span>

		<Button type="submit" text="Update Movie" class="update-movie-form-submit" />
	</form>

	<Button text="Delete" class="delete-movie-button" onClick={onDeleteMovie} />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border: 1px solid black;
		padding: 1rem;
		background-color: #fff;
	}

	span,
	div,
	label,
	input,
	select {
		font-size: 1.4rem;
	}

	form.update-movie-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	form.update-movie-form > span.input-group {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		align-items: center;
		justify-content: space-between;
	}

	form.update-movie-form > span.input-group > input,
	form.update-movie-form > span.input-group > select {
		max-width: 20rem;
	}
</style>
