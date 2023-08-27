import type { Review } from './reviews.model';

export interface ReviewView {
	id: number;
	movieId: number;
	comment: string;
	score: number;
	createdAt: string;
	updatedAt: string;
}

export function toReview(review: ReviewView): Review {
	return {
		...review,
		createdAt: new Date(review.createdAt),
		updatedAt: new Date(review.updatedAt)
	};
}
