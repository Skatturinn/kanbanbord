// Þetta er skítuf lausn ef þú getur lagað hóp 1 væri það betra, pushin mín á git fara ekki yfir á url
import cloudinary from 'cloudinary';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
	cloudinary.v2.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET
	});
	const { avatar } = await req.json();

	console.log('Received request with avatar:', avatar);

	try {
		const avatarUrl = cloudinary.v2.url(avatar as string, { secure: true });
		console.log('Cloudinary URL:', avatarUrl);
		NextResponse.json({ avatarUrl });
	} catch (err) {
		console.error('Error generating avatar URL:', err);
		NextResponse.json({ error: 'Error generating avatar URL' });
	}
}

/**
 * Þetta ætti að vera í hopverkefni 1 
 * En við klúðruðum því og ef það er ekki lagað þá 
 * verður þetta að duga í bili
 */
