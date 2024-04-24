import Link from "next/link";
import { GroupsComponent, UsersComponent, ProjectsComponent } from "@/components/Admin";
import { cookies } from "next/headers";
import { Notandi } from "@/components/Notandi";
import { Verkefni } from "@/components/Verkefni";
import { Hopur } from "@/components/Hopur";
import { auth } from "@/util/auth";
import Reyndu from "@/components/Reyndu";

export default async function Page({ params }: { params: { slug: Array<string> } }) {
	const hnetur = cookies();
	const token = hnetur.get('token');
	const id = hnetur.get('id')
	const { slug } = params;
	const slug0 = slug[0];

	if (token?.value) {
		let a = await auth(token.value)
		if (a.login) {
			if (slug.length === 2 && Number(slug[1])) {
				if (slug0 === 'projects') return <Verkefni id={slug[1]} token={token.value} />
			}
			return <div>
				<p>404</p>
				<p>Slóðin þarf að vera /Kanbanbord/projects/[id]</p>
				<p>{slug} gaf ekki gilda niðurstöðu athugið hlekk</p>
			</div>
		}
		if (!a.login && !a.admin) return <Reyndu />
	}
	return <div>
		<p>Þú ert ekki innskráður notandi</p>
		<Link href="/Notandi/Login">Login</Link>
	</div>

}
