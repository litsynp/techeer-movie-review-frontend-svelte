<script lang="ts">
	import { API_BASE_URL } from '$lib/config';
	import { GENRES_MAP, mapGenre, type Genre } from '$lib/movie';
	import { toDateString } from '$lib/common/date-utils';
	import { movieClient } from '$lib/api/movie.client';

	const onSubmit = async ({ target }: Event) => {
		const formData = new FormData(target as HTMLFormElement);

		try {
			await movieClient.createMovie({
				genre: formData.get('genres') as Genre,
				title: formData.get('title') as string,
				releasedAt: new Date(formData.get('releasedAt') as string),
				endAt: new Date(formData.get('endAt') as string)
			});
			alert('Movie created!');
		} catch (error) {
			alert('Failed to create movie!');
		}
	};
</script>

<h2>New Movie</h2>
<a href="/movies">Back</a>

<form class="create-movie-form" on:submit|preventDefault={onSubmit}>
	<span>
		<label for="genre">Genre:</label>
		<select name="genres" id="genres">
			{#each Object.keys(GENRES_MAP) as genre}
				<option value={genre}>{mapGenre(genre)}</option>
			{/each}
		</select>
	</span>

	<span>
		<label for="title">Title:</label>
		<input type="text" name="title" id="title" placeholder="Movie Title" required />
	</span>

	<span>
		<label for="releasedAt">Released At:</label>
		<input
			type="date"
			name="releasedAt"
			id="releasedAt"
			value={toDateString(new Date())}
			required
		/>
	</span>

	<span>
		<label for="endAt">End At:</label>
		<input type="date" name="endAt" id="endAt" value={toDateString(new Date())} required />
	</span>

	<button type="submit" class="create-movie-form-submit">Submit</button>
</form>

<style>
	form.create-movie-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	button.create-movie-form-submit {
		align-self: flex-start;
	}
</style>
