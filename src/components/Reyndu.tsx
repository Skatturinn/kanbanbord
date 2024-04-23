import Link from "next/link";

export default function Reyndu() {
	return <div>
		<p>Ekki tókst að sannreyna innskráningu þína</p>
		<p>Þú getur prófað að:</p>
		<ol>
			<li>Bíða aðeins og endursækja síðuna</li>
			<li>Skrá þig inn aftur</li>
		</ol>
		<Link href="/Notandi/Login">Login</Link>
	</div>
}