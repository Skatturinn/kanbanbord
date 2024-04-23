import Link from "next/link";
import { cookies } from 'next/headers'
import { Notandi } from "@/components/Notandi";
import { auth } from "@/util/auth";
import Reyndu from "@/components/Reyndu";

export default async function Home() {
	const hnetur = cookies();
	const token = hnetur.get('token');
	const id = hnetur.get('id')
	if (token?.value && id?.value) {
		const a = await auth(token.value)
		if (a.login) return <Notandi id={id.value} token={token.value} />
		return <Reyndu />
	}
	return <div>
		<h1>Þetta er notendasíða</h1>
		<p>Til að breyta upplýsingunum þínum þarftu að skrá þig inn</p>
		<Link href="/Notandi/Login">Login</Link>
	</div>
}
