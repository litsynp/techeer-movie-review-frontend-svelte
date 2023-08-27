import type { Genre, Movie } from './movies.model';

export interface MovieView {
	id: number;
	title: string;
	genre: Genre;
	isShowing: boolean;
	releasedAt: string;
	endAt: string;
	createdAt: string;
	updatedAt: string;
}

export function toMovie(movie: MovieView): Movie {
	return {
		...movie,
		releasedAt: new Date(movie.releasedAt),
		endAt: new Date(movie.endAt),
		createdAt: new Date(movie.createdAt),
		updatedAt: new Date(movie.updatedAt)
	};
}
