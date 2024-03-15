export async function get<T>(url: string, options?: RequestInit): Promise<T> {
	const response = await fetch(url, options);
	if (response.status !== 200 && response.status !== 201) {
		const code = response.status;
		let message = "";
		try {
			const json = await response.json();
			if (json) {
				message = json;
			}
		} catch (e) {
			try {
				const text = await response.text();
				if (text) {
					message = text;
				}
			} catch {
				//
			}
		}
		return Promise.reject({ code, message });
		// throw new Error({ code, message });
	}
	const json = await response.json();
	return json as T;
}
