<script lang="ts">
	import { goto } from '$app/navigation';
	import { movieClient } from '$lib/api/movie.client';
	import { reviewClient } from '$lib/api/review.client';
	import { toDateString, toReadableDate } from '$lib/common/date-utils';
	import { GENRES_MAP, mapGenre, type Genre, type Movie } from '$lib/movie';
	import type { Review } from '$lib/review';
	import { onMount } from 'svelte';
	import CreateReviewForm from '../../../components/create-review-form.svelte';

	export let data: { id: number };

	let createReviewButtonPressed = false;

	let movie: Movie | null = null;
	let reviews: Review[] = [];

	onMount(async () => {
		movie = await movieClient.findMovieById(data.id);
		reviews = await reviewClient.findReviews({ movieId: data.id });
	});

	const onSubmitUpdateMovie = async ({ target }: Event) => {
		const formData = new FormData(target as HTMLFormElement);

		try {
			await movieClient.updateMovieById(data.id, {
				genre: formData.get('genres') as Genre,
				title: formData.get('title') as string,
				releasedAt: new Date(formData.get('releasedAt') as string),
				endAt: new Date(formData.get('endAt') as string)
			});
			alert('Movie updated!');
		} catch (error) {
			console.log(error);
			alert('Failed to update movie!');
		}
	};

	const onDeleteMovie = async () => {
		if (!confirm('Are you sure you want to delete this movie?')) {
			return;
		}

		try {
			await movieClient.deleteMovieById(data.id);
			alert('Movie deleted!');
			goto('/movies');
		} catch (error) {
			alert('Failed to delete movie!');
		}
	};

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

	function reviewScoreToStars(score: number): string {
		return '⭐'.repeat(score);
	}
</script>

<h2>Movie: {movie?.title}</h2>
<a href="/movies">Back</a>
{#if movie}
	<form class="create-movie-form" on:submit|preventDefault={onSubmitUpdateMovie}>
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
			<input type="text" name="title" placeholder="Movie Title" value={movie.title} required />
		</span>

		<span>
			<label for="releasedAt">Released At:</label>
			<input
				type="date"
				name="releasedAt"
				value={toDateString(new Date(movie.releasedAt))}
				required
			/>
		</span>

		<span>
			<label for="endAt">End At:</label>
			<input type="date" name="endAt" value={toDateString(new Date(movie.endAt))} required />
		</span>

		<span>
			<button type="submit" class="create-movie-form-submit">Update</button>
		</span>
	</form>

	<button class="create-movie-delete-button" on:click={onDeleteMovie}>Delete</button>

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

	<div class="reviews-container">
		{#if reviews.length === 0}
			<p>No reviews yet!</p>
		{/if}
		{#if reviews.length > 0}
			{#each reviews as review}
				<div class="review">
					<h4>{review.comment}</h4>
					<p>Rating: {reviewScoreToStars(review.score)}</p>
					<p>Created At: {toReadableDate(review.createdAt)}</p>
				</div>
			{/each}
		{/if}
	</div>

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

		.reviews-container {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		.review {
			border: 1px solid black;
			padding: 1rem;
		}
	</style>
{/if}
