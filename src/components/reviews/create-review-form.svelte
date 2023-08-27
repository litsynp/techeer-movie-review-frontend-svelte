<script lang="ts">
	import type { Movie } from '$lib/movies/movies.model';
	import Button from '../common/button.svelte';

	export let movie: Movie;
	export let onSubmitCreateReview: (event: Event) => void;
</script>

<form class="create-review-form" on:submit={onSubmitCreateReview}>
	<div class="create-review-form-title">Create Review</div>

	<input type="hidden" name="movieID" value={movie.id} />

	<span class="review-label-input-container">
		<label for="score">Score:</label>
		<span>
			<input
				type="number"
				name="score"
				placeholder="Score"
				min="1"
				max="5"
				step="1"
				value="5"
				required
			/>
		</span>
	</span>

	<span class="review-label-input-container">
		<label for="comment">Comment:</label>
		<span>
			<input type="text" name="comment" placeholder="Comment" required />
		</span>
	</span>

	<Button type="submit" text="Submit" class="create-review-form-submit" />
</form>

<style>
	.create-review-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	span,
	div,
	label,
	input {
		font-size: 1.4rem;
	}

	.create-review-form-title {
		font-size: 1.4rem;
		font-weight: bold;
	}

	.review-label-input-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.review-label-input-container > span > input {
		width: 10rem;
	}
</style>
