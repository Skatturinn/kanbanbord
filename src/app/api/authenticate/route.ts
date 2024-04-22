import { NextRequest, NextResponse } from "next/server";

/**
 * Þetta er workaround til að staðfesta notanda því API uppfærist ekki
 */
export async function POST(req: NextRequest) {
	const { token } = await req.json()
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({})
		});

	const data = await response.json();
	console.log("API Response status:", response.status);
	console.log("API Response data:", data);

	if (response.status === 400 && data.errors?.find((error: any) => error.msg === "name min 3 character max 255 characters")) {
		return NextResponse.json({ login: true, isAdmin: true });
	} else if (response.status == 403 && data.message === "Insufficient permissions") {
		return NextResponse.json({ login: true, isAdmin: false });
	}

	return NextResponse.json(data);
}