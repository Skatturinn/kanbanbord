export async function auth(token: string, path = 'authenticate') {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
	console.log("Making request to:", apiUrl + path);
	const response = await fetch(`${apiUrl}${path}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify({ token })
	});

	console.log("Response status:", response.status);
	if (response.ok) {
		const data = await response.json() as { login?: boolean, admin?: boolean, message?: string };
		console.log("Response data:", data);
		return data;
	} else {
		const errorData = await response.text();
		console.error("Failed response data:", errorData);
		throw new Error(`HTTP error! status: ${response.status}`);
	}
}