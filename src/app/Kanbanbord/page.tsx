import Image from "next/image";
import Link from "next/link";
import { cookies } from 'next/headers'
import User from "@/components/User";
import { auth } from "@/util/auth";
import Reyndu from "@/components/Reyndu";

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
		return <>
			<h1>Þetta er kanbansíða</h1>
			<Reyndu />
		</>

	}
	return (
		<div>
			<h1>Þetta er kanbansíða</h1>
			<p>Til að sjá verkefninn þarftu að skrá þig inn</p>
			<Link href="/Notandi/Login">Login</Link>
		</div>
	);
}
