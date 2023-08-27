<script lang="ts">
	import { toReadableDate } from '$lib/common/date-utils';
	import type { Review } from '$lib/reviews/reviews.model';

	export let review: Review;

	function reviewScoreToStars(score: number): string {
		let stars = '';

		for (let i = 0; i < score; i++) {
			stars += '★';
		}

		for (let i = 0; i < 5 - score; i++) {
			stars += '☆';
		}

		return stars;
	}
</script>

<div class="container">
	<div class="metadata-container">
		<span>{reviewScoreToStars(review.score)}</span>
		<span>{toReadableDate(review.createdAt)}</span>
	</div>
	<div>{review.comment}</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border: 1px solid black;
		padding: 1rem;
		background-color: #fff;
	}

	span, div {
		font-size: 1.4rem;
	}

	.metadata-container {
		display: flex;
		justify-content: space-between;
	}
</style>
