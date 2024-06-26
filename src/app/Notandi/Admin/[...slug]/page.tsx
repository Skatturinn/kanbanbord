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
	const { slug } = params;
	const slug0 = slug[0];

	if (token?.value) {
		let a = await auth(token.value)
		if (a.admin) {
			if (slug.length === 1) {
				if (slug0 === 'groups') return <GroupsComponent token={token?.value} />
				if (slug0 === 'projects') return <ProjectsComponent token={token?.value} />
				if (slug0 === 'users') return <UsersComponent token={token?.value} />
			}
			if (slug.length === 2 && Number(slug[1])) {
				if (slug0 === 'users') return <Notandi id={slug[1]} token={token.value} />
				if (slug0 === 'projects') return <Verkefni id={slug[1]} token={token.value} />
				if (slug0 === 'groups') return <Hopur id={slug[1]} token={token.value} />
			}
			return <div>
				<p>404</p>
				<p>Slóðin þarf að vera /Notandi/Admin/[users | groups | projects]/[id]</p>
				<p>{slug} gaf ekki gilda niðurstöðu athugið hlekk</p>
			</div>
		}
		if (a.login && !a.admin) return <div>
			<p>Þú ert ekki innskráður Admin notandi</p>
			<Link href="/Notandi/Login">Login</Link>
		</div>
		if (!a.login && !a.admin) return <Reyndu />
	}
	return <div>
		<p>Þú ert ekki innskráður notandi</p>
		<Link href="/Notandi/Login">Login</Link>
	</div>

}
