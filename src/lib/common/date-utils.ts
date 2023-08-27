export function toReadableDate(date: Date): string {
	return new Date(date).toLocaleDateString();
}

export function toDateString(date: Date): string {
	return date.toISOString().slice(0, 10);
}
