import { fetchJson } from '$lib/common/fetcher';
import { API_BASE_URL } from '$lib/config';
import type { Genre } from './movies.model';

interface MovieView {
	id: number;
	title: string;
	genre: Genre;
	isShowing: boolean;
	releasedAt: string;
	endAt: string;
	createdAt: string;
	updatedAt: string;
}

async function createMovie({
	genre,
	title,
	releasedAt,
	endAt
}: {
	genre: Genre;
	title: string;
	releasedAt: Date;
	endAt: Date;
}): Promise<void> {
	return await fetchJson(`${API_BASE_URL}/movies`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			genre,
			title,
			releasedAt: releasedAt.toISOString(),
			endAt: endAt.toISOString()
		})
	});
}

async function findMovies(): Promise<MovieView[]> {
	return (await fetchJson<MovieView[] | null>(`${API_BASE_URL}/movies`)) ?? [];
}

function findMovieById(movieId: number): Promise<MovieView> {
	return fetchJson<MovieView>(`${API_BASE_URL}/movies/${movieId}`);
}

async function updateMovieById(
	movieId: number,
	{
		genre,
		title,
		releasedAt,
		endAt
	}: {
		genre: Genre;
		title: string;
		releasedAt: Date;
		endAt: Date;
	}
): Promise<void> {
	return await fetchJson(`${API_BASE_URL}/movies/${movieId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			genre,
			title,
			releasedAt: releasedAt.toISOString(),
			endAt: endAt.toISOString()
		})
	});
}

function deleteMovieById(movieId: number): Promise<void> {
	return fetchJson(`${API_BASE_URL}/movies/${movieId}`, {
		method: 'DELETE'
	});
}

export const movieClient = {
	createMovie,
	findMovies,
	findMovieById,
	updateMovieById,
	deleteMovieById
};
