<script lang="ts">
	import type { Review } from '$lib/reviews/reviews.model';
	import ReviewItem from './review-item.svelte';

	export let reviews: Review[] = [];
</script>

<div class="reviews-container">
	{#if reviews.length === 0}
		<div>No reviews yet!</div>
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
  
  div {
    font-size: 1.4rem;
  }
</style>
