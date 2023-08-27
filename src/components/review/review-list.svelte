<script lang="ts">
	import type { Review } from '$lib/review';
	import { toReadableDate } from '$lib/common/date-utils';
	import ReviewItem from './review-item.svelte';

	export let reviews: Review[] = [];
</script>

<div class="reviews-container">
	{#if reviews.length === 0}
		<p>No reviews yet!</p>
	{/if}
	{#if reviews.length > 0}
		{#each reviews as review}
			<ReviewItem {review} />
		{/each}
	{/if}
</div>

<style>
	.reviews-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
