<script lang="ts">
	import { movieClient } from '$lib/movies/movies.client';
	import type { Movie } from '$lib/movies/movies.model';
	import { toMovie } from '$lib/movies/movies.view';
	import { onMount } from 'svelte';

	let movies: Movie[] = [];

	onMount(async () => {
		movies = (await movieClient.findMovies()).map(toMovie);
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
