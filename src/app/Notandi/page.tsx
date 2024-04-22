import Link from "next/link";
import { cookies } from 'next/headers'
import { Notandi } from "@/components/Notandi";

export default function Home() {
	const hnetur = cookies();
	const token = hnetur.get('token');
	const id = hnetur.get('id')
	return (
		token?.value && id?.value ?
			<Notandi id={id.value} token={token.value} /> :
			<div>
				<h1>Þetta er notendasíða</h1>
				<p>Til að breyta upplýsingunum þínum þarftu að skrá þig inn</p>
				<Link href="/Notandi/Login">Login</Link>
			</div>
	);
}
