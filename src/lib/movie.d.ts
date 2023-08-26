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
