import { NextResponse } from "next/server"

export async function auth(token: string) {
	const response = await fetch(`/api/authenticate`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ token })
		}
	)
	const data = await response.json() as { login?: boolean, isAdmin?: boolean }
	return data
}