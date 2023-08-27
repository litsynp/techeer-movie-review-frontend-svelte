<script lang="ts">
	import type { Movie } from '$lib/movie';

	export let movie: Movie;
	export let onSubmitCreateReview: (event: Event) => void;
</script>

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
