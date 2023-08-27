<script lang="ts">
	import { API_BASE_URL } from '$lib/config';
	import { GENRES_MAP, mapGenre } from '$lib/movie';
	import { toDateString } from '$lib/common/date-utils';

	const onSubmit = async (event: Event) => {
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		const data = {
			genre: formData.get('genres'),
			title: formData.get('title'),
			releasedAt: new Date(formData.get('releasedAt') as string).toISOString(),
			endAt: new Date(formData.get('endAt') as string).toISOString()
		};

		const response = await fetch(`${API_BASE_URL}/movies`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		if (response.ok) {
			form.reset();
			alert('Movie created!');
		} else {
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
