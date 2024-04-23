
export async function auth(token: string) {
	const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/authenticate',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		}
	)
	if (response.ok) {
		const data = await response.json() as { admin: boolean }
		return { admin: data.admin, login: true }
	} else {
		return { message: `Error ${response.status}: ${response.statusText}` };
	}
}