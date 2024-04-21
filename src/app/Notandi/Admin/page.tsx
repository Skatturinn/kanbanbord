import { GroupsComponent, UsersComponent, ProjectsComponent } from '@/components/Admin';
import { Post } from '@/components/Post';
import { Patch } from '@/components/Patch';
import { auth } from '@/util/auth';
import { cookies } from 'next/headers';
import { Delete } from '@/components/Delete';
import React from 'react';
import Link from "next/link";

export default async function Home() {
	const hnetur = cookies();
	const token = hnetur.get('token');
	const id = hnetur.get('id')
	if (token?.value && id?.value) {
		let a = await auth(token.value)
		if (a.isAdmin) return <div>

			<section>
				<h1>Búa til:</h1>
				<h2>Notendur</h2>
				<Post type='users' id={id?.value} token={token.value} />
				<h2>Hópa</h2>
				<Post type='groups' id={id?.value} token={token.value} />
				<h2>Verkefni</h2>
				<Post type='projects' id={id?.value} token={token.value} />
			</section>
			<section>
				<h1>Skoða</h1>
				<UsersComponent token={token.value} />
				<GroupsComponent token={token.value} />
				<ProjectsComponent token={token.value} />
			</section>
			<section>
				<h1>Uppfæra</h1>
				<h2>Notendur</h2>
				<Patch type='users' token={token.value} />
				<h2>Hópa</h2>
				<Patch type='groups' token={token.value} />
				<h2>Verkefni</h2>
				<Patch type='projects' token={token.value} />
			</section>
			<section>
				<h1>Eyða</h1>
				<Delete token={token.value} />
			</section>
		</div>
		if (!a.isAdmin && a.login) return <p>Ert ekki innskráður sem admin notandi.</p>
		if (!a.isAdmin && !a.login) return <p>{JSON.stringify(a?.message)}</p>
	}
	return <div>
		<p>Þú ert ekki innskráður</p>
		<Link href="/Notandi/Login">Login</Link>
	</div>
}