/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['res.cloudinary.com',
			'plus.unsplash.com'],
		remotePatterns: [
			{
				hostname: 'res.cloudinary.com',
				protocol: 'https'
			},
			{
				hostname: 'plus.unsplash.com',
				pathname: 'premium_photo-1661681726667-1dc005655ade',
				port: '',
				protocol: 'https'
			}
		]
	},
};

export default nextConfig;
