<script lang="ts">
	import type { Review } from '$lib/review';
	import { toReadableDate } from '$lib/common/date-utils';

	export let reviews: Review[] = [];

	const reviewScoreToStars = (score: number) => {
		let stars = '';
		for (let i = 0; i < score; i++) {
			stars += '⭐';
		}
		return stars;
	};
</script>

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
