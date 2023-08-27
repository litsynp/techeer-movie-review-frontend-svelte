export const GENRES = [
	'action',
	'adventure',
	'comedy',
	'drama',
	'fantasy',
	'horror',
	'mystery',
	'thriller',
	'western'
] as const;

export type Genre = (typeof GENRES)[number];

function isGenre(genre: string): genre is Genre {
	return genre in GENRES_MAP;
}

export const GENRES_MAP: Record<Genre, string> = {
	action: 'Action',
	adventure: 'Adventure',
	comedy: 'Comedy',
	drama: 'Drama',
	fantasy: 'Fantasy',
	horror: 'Horror',
	mystery: 'Mystery',
	thriller: 'Thriller',
	western: 'Western'
};

export function mapGenre(genre: string): string {
	if (isGenre(genre)) {
		return GENRES_MAP[genre];
	}

	return 'Unknown';
}

export interface Movie {
	id: number;
	title: string;
	genre: Genre;
	isShowing: boolean;
	releasedAt: string;
	endAt: string;
	createdAt: string;
	updatedAt: string;
}
