<script lang="ts">
	import { movieClient } from '$lib/movies/movies.client';
	import type { Movie } from '$lib/movies/movies.model';
	import { toMovie } from '$lib/movies/movies.view';
	import { reviewClient } from '$lib/reviews/reviews.client';
	import type { Review } from '$lib/reviews/reviews.model';
	import { toReview } from '$lib/reviews/reviews.view';
	import { onMount } from 'svelte';
	import Button from '../../../components/common/button.svelte';
	import MovieDetail from '../../../components/movies/movie-detail.svelte';
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
			reviews = (await reviewClient.findReviews({ movieId: data.id })).map(toReview);
		} catch (error) {
			alert('Failed to create review!');
		}
	};
</script>

<div class="page-header">Movie: {movie?.title}</div>

{#if movie}
	<MovieDetail {movie} />

	<div class="reviews-header">
		<span class="reviews-header-title">Reviews ({reviews.length})</span>

		<Button
			text={createReviewButtonPressed ? 'Close' : 'Create Review'}
			class="create-review-button"
			onClick={() => {
				createReviewButtonPressed = !createReviewButtonPressed;
			}}
		/>
	</div>

	{#if createReviewButtonPressed}
		<div class="create-review-container">
			<CreateReviewForm {movie} {onSubmitCreateReview} />
		</div>
	{/if}

	<ReviewList {reviews} />
{/if}

<style>
	.page-header {
		font-size: 2rem;
		font-weight: bold;
		margin-bottom: 1.6rem;
	}

	.reviews-header {
		margin-top: 2rem;
		margin-bottom: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.reviews-header-title {
		font-size: 1.6rem;
		font-weight: bold;
	}

	.create-review-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1rem;
		border: 1px solid black;
		padding: 1rem;
		background-color: #fff;
	}
</style>
