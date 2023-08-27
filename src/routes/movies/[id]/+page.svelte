<script lang="ts">
	import { movieClient } from '$lib/movies/movies.client';
	import type { Movie } from '$lib/movies/movies.model';
	import { toMovie } from '$lib/movies/movies.view';
	import { reviewClient } from '$lib/reviews/reviews.client';
	import type { Review } from '$lib/reviews/reviews.model';
	import { toReview } from '$lib/reviews/reviews.view';
	import { onMount } from 'svelte';
	import MovieItem from '../../../components/movies/movie-item.svelte';
	import CreateReviewForm from '../../../components/reviews/create-review-form.svelte';
	import ReviewList from '../../../components/reviews/review-list.svelte';

	export let data: { id: number };

	let createReviewButtonPressed = false;

	let movie: Movie | null = null;
	let reviews: Review[] = [];

	onMount(async () => {
		movie = await movieClient.findMovieById(data.id).then(toMovie);
		reviews = (await reviewClient.findReviews({ movieId: data.id })).map(toReview);
	});

	const onSubmitCreateReview = async (event: Event) => {
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		try {
			await reviewClient.createReview({
				movieId: Number(formData.get('movieID')),
				comment: formData.get('comment') as string,
				score: Number(formData.get('score'))
			});
			alert('Review created!');
		} catch (error) {
			alert('Failed to create review!');
		}
	};
</script>

<h2>Movie: {movie?.title}</h2>
<a href="/movies">Back</a>
{#if movie}
	<MovieItem {movie} />

	<h3>Reviews</h3>

	<div class="create-review-container">
		<button
			class="create-review-button"
			on:click={() => (createReviewButtonPressed = !createReviewButtonPressed)}
		>
			{#if createReviewButtonPressed}
				Close
			{:else}
				Create Review
			{/if}
		</button>

		{#if createReviewButtonPressed}
			<CreateReviewForm {movie} {onSubmitCreateReview} />
		{/if}
	</div>

	<ReviewList {reviews} />

	<style>
		form.create-movie-form {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		button.create-movie-form-submit {
			align-self: flex-start;
		}

		button.create-movie-delete-button {
			align-self: flex-start;
			margin-top: 1rem;
		}

		.create-review-container {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			margin-bottom: 1rem;
			border: 1px solid black;
			padding: 1rem;
		}

		button.create-review-button {
			align-self: flex-start;
		}
	</style>
{/if}
