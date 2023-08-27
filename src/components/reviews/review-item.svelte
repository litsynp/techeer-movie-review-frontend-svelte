<script lang="ts">
	import { toReadableDate } from '$lib/common/date-utils';
	import type { Review } from './reviews.model';

	export let review: Review;

	function reviewScoreToStars(score: number): string {
		return '⭐'.repeat(score);
	}
</script>

<div class="review">
	<h4>{review.comment}</h4>
	<p>Rating: {reviewScoreToStars(review.score)}</p>
	<p>Created At: {toReadableDate(review.createdAt)}</p>
</div>

<style>
	.review {
		border: 1px solid black;
		padding: 1rem;
	}
</style>
