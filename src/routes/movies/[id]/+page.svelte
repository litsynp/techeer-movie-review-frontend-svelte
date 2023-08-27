<script lang="ts">
	import { API_BASE_URL } from '$lib/config';
	import { GENRES_MAP, mapGenre, type Movie } from '$lib/movie';
	import type { Review } from '$lib/review';
	import { onMount } from 'svelte';

	export let data: { id: number };

	let createReviewButtonPressed = false;

	function fetchMovie(id: number): Promise<Movie> {
		return fetch(`${API_BASE_URL}/movies/${id}`).then((res) => res.json());
	}

	async function fetchReviews(id: number): Promise<Review[]> {
		const reviews = (await fetch(`${API_BASE_URL}/reviews?movieId=${data.id}`).then((res) =>
			res.json()
		)) as Review[] | null;

		if (reviews) {
			return reviews;
		} else {
			return [];
		}
	}

	let movie: Movie | null = null;
	let reviews: Review[] = [];

	onMount(async () => {
		movie = await fetchMovie(data.id);
		reviews = await fetchReviews(data.id);
	});

	const onSubmitUpdateMovie = async (event: Event) => {
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		const payload = {
			genre: formData.get('genres'),
			title: formData.get('title'),
			releasedAt: new Date(formData.get('releasedAt') as string).toISOString(),
			endAt: new Date(formData.get('endAt') as string).toISOString()
		};

		const response = await fetch(`${API_BASE_URL}/movies/${data.id}`, {
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

	const onDeleteMovie = async () => {
		const response = await fetch(`${API_BASE_URL}/movies/${data.id}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			alert('Movie deleted!');
		} else {
			alert('Failed to delete movie!');
		}
	};

	const onSubmitCreateReview = async (event: Event) => {
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		const payload = {
			movieID: Number(formData.get('movieID')),
			comment: formData.get('comment'),
			score: Number(formData.get('score'))
		};

		const response = await fetch(`${API_BASE_URL}/reviews`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});

		if (response.ok) {
			form.reset();
			alert('Review created!');
		} else {
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
				value={new Date(movie.releasedAt).toISOString().slice(0, 10)}
				required
			/>
		</span>

		<span>
			<label for="endAt">End At:</label>
			<input
				type="date"
				name="endAt"
				value={new Date(movie.endAt).toISOString().slice(0, 10)}
				required
			/>
		</span>

		<span>
			<button type="submit" class="create-movie-form-submit">Submit</button>
			<button class="create-movie-delete-button" on:click={onDeleteMovie}>Delete</button>
		</span>
	</form>

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
			<form class="create-review-form" on:submit|preventDefault={onSubmitCreateReview}>
				<input type="hidden" name="movieID" value={movie.id} />

				<span>
					<label for="comment">Comment:</label>
					<input type="text" name="comment" placeholder="Comment" required />
				</span>

				<span>
					<label for="score">Score:</label>
					<input type="number" name="score" placeholder="Score" required />
				</span>

				<button type="submit" class="create-review-form-submit">Submit</button>
			</form>
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
					<p>Created At: {new Date(review.createdAt).toLocaleString()}</p>
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
