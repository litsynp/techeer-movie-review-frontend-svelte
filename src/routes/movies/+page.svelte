<script lang="ts">
	import { goto } from '$app/navigation';
	import { movieClient } from '$lib/movies/movies.client';
	import type { Movie } from '$lib/movies/movies.model';
	import { toMovie } from '$lib/movies/movies.view';
	import { onMount } from 'svelte';
	import MovieItem from '../../components/movies/movie-item.svelte';
	import Button from '../../components/common/button.svelte';

	let movies: Movie[] = [];

	onMount(async () => {
		movies = (await movieClient.findMovies()).map(toMovie);
	});
</script>

<div class="page-header">Movie Home</div>

<div class="movies-header">
	<span class="movies-header-title">Movies</span>
	<span>
		<Button text="New Movie" onClick={() => goto('/movies/new')} />
	</span>
</div>

<div class="movies-container">
	{#if movies.length === 0}
		<div>No movies found</div>
	{/if}

	{#each movies as movie}
		<MovieItem {movie} />
	{/each}
</div>

<style>
	.page-header {
		font-size: 2rem;
		font-weight: bold;
		margin-bottom: 1rem;
	}

	.movies-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.movies-header-title {
		font-size: 1.6rem;
		font-weight: bold;
	}

	.movies-header > span {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}

	.movies-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
