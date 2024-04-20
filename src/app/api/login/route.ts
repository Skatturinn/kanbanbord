import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
	const { token, id } = await req.json()
	cookies().set('token', token);
	cookies().set('id', id)
	return NextResponse.json({ login: true })
}

export async function DELETE(req: NextRequest) {
	cookies().delete('token')
	cookies().delete('id')
	return NextResponse.json({ login: false })
}

