import { fetchJson } from '$lib/common/fetcher';
import { API_BASE_URL } from '$lib/config';

interface ReviewView {
	comment: string;
	createdAt: string;
	id: number;
	movieId: number;
	score: number;
	updatedAt: string;
}

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
