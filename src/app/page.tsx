import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {

	return (
		<div className={styles.main}>
			<h1>Þetta er heimasíðan</h1>
			<p>Hún er opin öllum, til að nota kanbanborð þarftu að skrá þig inn</p>
			<Link href="/Notandi/Login">Login</Link>
			<Image
				src={'https://plus.unsplash.com/premium_photo-1661681726667-1dc005655ade?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8a2FuYmFufGVufDB8fDB8fHww'}
				alt="kanban mynd"
				width={125}
				height={125} />
			<p>Jeff sighs, gets on his hands and knees and crawls into the fort. He sits next to Pierce cross-legged on the floor. A quiet beat.</p>
			<p><strong>PIERCE (CONT’D):</strong> I’m old, Jeff.</p>
			<p><strong>JEFF:</strong> No, you’re not.</p>
			<p><strong>PIERCE:</strong> People see me as youthful, fun Pierce. Always there with the coolest Halloween costume or a witty ethnic joke just on the right side of good taste. But inside, I’m scared. I feel like I’m fighting to stay alive. Why do it? These Mexican skeletons are right, no matter what I do, I’m going to die.</p>
			<p><strong>JEFF:</strong> You’re fighting because you’re not done, Pierce. You have an entire life left to live.</p>
			<p><strong>PIERCE:</strong> I am friends with a young African American.</p>
			<p><strong>JEFF:</strong> Yeah, and you think the system wants that? They want you tucked away on a golf course or a cruise. But you’re here where the action is. I hope I’m half as young as you when I’m your age.</p>
			<p><strong>PIERCE:</strong> Yeah?</p>
			<p><strong>JEFF:</strong> Dude. You’re the Beastmaster.</p>
			<p><strong>PIERCE:</strong> I’m the Beastmaster.</p>
		</div>
	);
}
