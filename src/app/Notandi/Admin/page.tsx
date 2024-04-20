import Admin from '@/components/Admin';
import { Post } from '@/components/Post';
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import React from 'react';

export default async function Home() {
	const hnetur = cookies();
	const token = hnetur.get('token');
	const id = hnetur.get('id')
	if (token?.value && id?.value) {
		const respone = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id.value}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			}
		)
		const info = await respone.json()
		if (info?.isadmin) return <div>
			<section>
				<h2>Notendur</h2>
				<Post type='users' id={id?.value} token={token.value} />
			</section>
			<section>
				<h2>Hópar</h2>
				<Post type='groups' id={id?.value} token={token.value} />
			</section>
			<section>
				<h2>Verkefni</h2>
				<Post type='projects' id={id?.value} token={token.value} />
			</section>
		</div>
	}
	return <p>401 unauthorized access</p>
}