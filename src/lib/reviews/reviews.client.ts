import { fetchJson } from '$lib/common/fetcher';
import { API_BASE_URL } from '$lib/config';
import type { ReviewView } from './reviews.view';

async function createReview({
	movieId,
	comment,
	score
}: {
	movieId: number;
	comment: string;
	score: number;
}): Promise<void> {
	return await fetchJson(`${API_BASE_URL}/reviews`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			movieID: movieId,
			comment,
			score
		})
	});
}

async function findReviews({ movieId }: { movieId: number }): Promise<ReviewView[]> {
	return (await fetchJson<ReviewView[] | null>(`${API_BASE_URL}/reviews?movieId=${movieId}`)) ?? [];
}

export const reviewClient = {
	createReview,
	findReviews
};
