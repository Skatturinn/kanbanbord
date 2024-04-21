import { NextResponse } from "next/server"
import useFetch from "react-fetch-hook";

export async function auth(token: string, path = '/api/authenticate') {
	const deployedUrl = process.env.VERCEL_URL || 'http://localhost:3000';
	const response = await fetch(deployedUrl + '/api/authenticate',
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token })
		}
	)
	if (response.ok) {
		const data = await response.json() as { login?: boolean, isAdmin?: boolean, message?: string }
		return data
	} else {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
}