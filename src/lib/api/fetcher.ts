export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
	const response = await fetch(url, init);

	if (init?.method === 'DELETE' && response.status === 204) {
		return {} as T;
	}

	if (!response.ok) {
		throw new Error(`Failed to fetch ${url}`);
	}

	const data = (await (response.headers.get('Content-Type')?.includes('application/json')
		? response.json()
		: response.text())) as unknown;

	return data as T;
}
