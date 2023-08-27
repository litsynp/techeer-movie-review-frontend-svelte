<script lang="ts">
	import { goto } from '$app/navigation';
	import { toDateString } from '$lib/common/date-utils';
	import { movieClient } from '$lib/movies/movies.client';
	import { GENRES_MAP, mapGenre, type Genre, type Movie } from '$lib/movies/movies.model';

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

<form class="update-movie-form" on:submit|preventDefault={onSubmitUpdateMovie}>
	<span>
		<label for="genre">Genre:</label>
		<select name="genres" id="genres">
			{#each Object.keys(GENRES_MAP) as genre}
				<option value={genre} selected={movie.genre === genre}>{mapGenre(genre)}</option>
			{/each}
		</select>
	</span>

	<span>
		<label for="title">Title:</label>
		<input type="text" name="title" placeholder="Movie Title" value={movie.title} required />
	</span>

	<span>
		<label for="releasedAt">Released At:</label>
		<input
			type="date"
			name="releasedAt"
			value={toDateString(new Date(movie.releasedAt))}
			required
		/>
	</span>

	<span>
		<label for="endAt">End At:</label>
		<input type="date" name="endAt" value={toDateString(new Date(movie.endAt))} required />
	</span>

	<span>
		<button type="submit" class="update-movie-form-submit">Update</button>
	</span>
</form>

<button class="delete-movie-button" on:click={onDeleteMovie}>Delete</button>

<style>
	form.update-movie-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	button.delete-movie-button {
		align-self: flex-start;
		margin-top: 1rem;
	}
</style>
