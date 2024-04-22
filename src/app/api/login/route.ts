import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
	const { username, password } = await req.json()
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}login`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		}
	)
	const data = await response.json()
	if (response.status >= 200 && response.status < 300 && data.token && data.id) {
		cookies().set('token', data.token);
		cookies().set('id', data.id)
		return NextResponse.json({ login: true, isAdmin: data.isAdmin })
	} else {
		return NextResponse.json(data)
	}
}

export async function DELETE(req: NextRequest) {
	cookies().delete('token')
	cookies().delete('id')
	return NextResponse.json({ login: false })
}

