<script lang="ts">
	import { goto } from '$app/navigation';
	import { toDateString } from '$lib/common/date-utils';
	import { movieClient } from '$lib/movies/movies.client';
	import { GENRES_MAP, mapGenre, type Genre } from '$lib/movies/movies.model';
	import Button from '../../../components/common/button.svelte';

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
			goto('/movies');
		} catch (error) {
			alert('Failed to create movie!');
		}
	};
</script>

<h2>New Movie</h2>

<div class="container">
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

		<Button text="Submit" class="create-movie-form-submit" />
	</form>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border: 1px solid #000;
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

	form.create-movie-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	form.create-movie-form > span {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		justify-content: space-between;
	}

	form.create-movie-form > span > input,
	form.create-movie-form > span > select {
		width: 10rem;
		max-width: 20rem;
	}
</style>
