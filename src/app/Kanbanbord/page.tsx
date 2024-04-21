import Image from "next/image";
import Link from "next/link";
import { cookies } from 'next/headers'

export default function Home() {
	const hnetur = cookies();
	const token = hnetur.get('token');
	const id = hnetur.get('id')
	return (
		token?.value && id?.value ?
			<div>
				<h2>Þín Verkefni</h2>
				<p>Hér þarf að útfæra kanban borð</p>
			</div> :
			<div>
				<h1>Þetta er kanbansíða</h1>
				<p>Til að sjá verkefninn þarftu að skrá þig inn</p>
				<Link href="/Notandi/Login">Login</Link>
			</div>
	);
}
