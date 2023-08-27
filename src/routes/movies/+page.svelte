<script lang="ts">
	import { API_BASE_URL } from '$lib/config';
	import type { MovieView } from '$lib/movie';
	import { onMount } from 'svelte';

	async function fetchMovies(): Promise<MovieView[]> {
		const movies = (await fetch(`${API_BASE_URL}/movies`).then((res) => res.json())) as
			| MovieView[]
			| null;

		if (movies) {
			return movies;
		} else {
			return [];
		}
	}

	let movies: MovieView[] = [];

	onMount(async () => {
		movies = await fetchMovies();
	});
</script>

<h2>Movie Home</h2>
<ul>
	<li>
		<a href="/movies/new">New Movie</a>
	</li>
</ul>

<h3>Movies</h3>

<ul>
	{#each movies as movie}
		<li>
			<a href="/movies/{movie.id}">{movie.title}</a>
		</li>
	{/each}
</ul>
