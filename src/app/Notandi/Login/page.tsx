import { Post } from '@/components/Post';
import { auth } from '@/util/auth';
import { cookies } from 'next/headers';
import React from 'react';
import Link from "next/link";
import { Notandi } from '@/components/Notandi';
import Login from '@/components/Login';
export default async function Home() {
	const hnetur = cookies();
	const token = hnetur.get('token');
	const id = hnetur.get('id')
	if (token?.value && id?.value) {
		let a = await auth(token.value)
		if (a.login) return <div>
			<section>
				<h1>Notandi</h1>
				<Notandi id={id?.value} token={token.value} />
			</section>
		</div>
		if (!a.login) return <p>{JSON.stringify(a?.message)}</p>
	}
	return <div>
		<p>Þú ert ekki innskráður</p>
		<Login />
	</div>
}