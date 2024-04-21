import Admin from '@/components/Admin';
import { Post } from '@/components/Post';
import { auth } from '@/util/auth';
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import React from 'react';
import Link from "next/link";

export default async function Home() {
	const hnetur = cookies();
	const token = hnetur.get('token');
	const id = hnetur.get('id')
	if (token?.value && id?.value) {
		const a = await auth(token.value)
		if (a.isAdmin) return <div>
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
		if (!a.isAdmin && a.login) return <p>Ert ekki innskráður sem admin notandi.</p>
		if (!a.isAdmin && !a.login) return <p>{JSON.stringify(a)}</p>
	}
	return <div>
		<p>Þú ert ekki innskráður</p>
		<Link href="/Notandi/Login">Login</Link>
	</div>
}