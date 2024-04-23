import Image from "next/image";
import Link from "next/link";
import { cookies } from 'next/headers'
import User from "@/components/User";
import { auth } from "@/util/auth";

export default async function Home() {
	const hnetur = cookies();
	const token = hnetur.get('token');
	const id = hnetur.get('id')
	if (token?.value && id?.value) {
		const a = await auth(token.value);
		if (a?.login) return <div>
			<h2>Þín Verkefni</h2>
			<User token={token.value} id={id.value} />
		</div>
		return <div>
			<h1>Þetta er kanbansíða</h1>
			<p>Ekki tókst að sannreyna innskráningu þína</p>
			<p>Þú getur prófað að:</p>
			<ol>
				<li>Bíða aðeins og endursækja síðuna</li>
				<li>Skrá þig inn aftur</li>
			</ol>
			<Link href="/Notandi/Login">Login</Link>
		</div>

	}
	return (
		<div>
			<h1>Þetta er kanbansíða</h1>
			<p>Til að sjá verkefninn þarftu að skrá þig inn</p>
			<Link href="/Notandi/Login">Login</Link>
		</div>
	);
}
