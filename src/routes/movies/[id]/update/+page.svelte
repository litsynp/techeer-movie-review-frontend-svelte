<script lang="ts">
	import { movieClient } from '$lib/movies/movies.client';
	import type { Movie } from '$lib/movies/movies.model';
	import { toMovie } from '$lib/movies/movies.view';
	import { onMount } from 'svelte';
	import UpdateMovieForm from '../../../../components/movies/update-movie-form.svelte';

	export let data: { id: number };

	let movie: Movie | null = null;

	onMount(async () => {
		movie = await movieClient.findMovieById(data.id).then(toMovie);
	});
</script>

<h2>Update Movie: {movie?.title}</h2>

{#if movie}
	<UpdateMovieForm {movie} />
{/if}
