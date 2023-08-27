<script lang="ts">
	import { movieClient } from '$lib/movies/movies.client';
	import type { Movie } from '$lib/movies/movies.model';
	import { onMount } from 'svelte';
	import UpdateMovieForm from '../../../../components/movies/update-movie-form.svelte';

	export let data: { id: number };

	let movie: Movie | null = null;

	onMount(async () => {
		movie = await movieClient.findMovieById(data.id);
	});
</script>

<h2>Movie: {movie?.title}</h2>
<a href="/movies">Back</a>
{#if movie}
	<UpdateMovieForm {movie} />
{/if}
