export interface Review {
	id: number;
	movieId: number;
	comment: string;
	score: number;
	createdAt: Date;
	updatedAt: Date;
}
