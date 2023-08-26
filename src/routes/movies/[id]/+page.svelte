<script lang="ts">
	import { GENRES_MAP, mapGenre, type Movie } from '$lib/movie';
	import { onMount } from 'svelte';

	export let data: { id: number };

	function fetchMovie(id: number): Promise<Movie> {
		return fetch(`http://localhost:8080/api/v1/movies/${id}`).then((res) => res.json());
	}

	let movie: Movie | null = null;

	onMount(async () => {
		movie = await fetchMovie(data.id);
	});

	const onSubmit = async (event: Event) => {
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		const payload = {
			genre: formData.get('genres'),
			title: formData.get('title'),
			releasedAt: new Date(formData.get('releasedAt') as string).toISOString(),
			endAt: new Date(formData.get('endAt') as string).toISOString()
		};

		const response = await fetch(`http://localhost:8080/api/v1/movies/${data.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});

		if (response.ok) {
			form.reset();
			alert('Movie updated!');
		} else {
			alert('Failed to update movie!');
		}
	};

	const onDelete = async () => {
		const response = await fetch(`http://localhost:8080/api/v1/movies/${data.id}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			alert('Movie deleted!');
		} else {
			alert('Failed to delete movie!');
		}
	};
</script>

<h2>Movie: {movie?.title}</h2>
<a href="/movies">Back</a>
{#if movie}
	<form class="create-movie-form" on:submit|preventDefault={onSubmit}>
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
			<input
				type="text"
				name="title"
				id="title"
				placeholder="Movie Title"
				value={movie.title}
				required
			/>
		</span>

		<span>
			<label for="releasedAt">Released At:</label>
			<input
				type="date"
				name="releasedAt"
				id="releasedAt"
				value={new Date(movie.releasedAt).toISOString().slice(0, 10)}
				required
			/>
		</span>

		<span>
			<label for="endAt">End At:</label>
			<input
				type="date"
				name="endAt"
				id="endAt"
				value={new Date(movie.endAt).toISOString().slice(0, 10)}
				required
			/>
		</span>

		<button type="submit" class="create-movie-form-submit">Submit</button>
	</form>

	<button on:click={onDelete}>Delete</button>

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
{/if}
