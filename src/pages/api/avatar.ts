import cloudinary from 'cloudinary';
import { VercelRequest, VercelResponse } from '@vercel/node';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default function handler(req: VercelRequest, res: VercelResponse) {
    const { avatar } = req.query;

    console.log('Received request with avatar:', avatar);

    try {
        const avatarUrl = cloudinary.v2.url(avatar as string, { secure: true });
        console.log('Cloudinary URL:', avatarUrl);
        res.status(200).json({ avatarUrl });
    } catch (err) {
        console.error('Error generating avatar URL:', err);
        res.status(500).json({ error: 'Error generating avatar URL' });
    }
}