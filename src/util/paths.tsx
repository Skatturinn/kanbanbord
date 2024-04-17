'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PathString } from "react-hook-form";
import Image from "next/image";

export default function Paths({ files, image }: { files: Array<string | null>, image: PathString | undefined }) {
	const pathname = usePathname();
	const isCurrent = (href: string): boolean => {
		return pathname.split('/').includes(href) ? true : false
	}
	const ff = files.filter(e => e);
	const p = ff[0]?.includes('\\') ? ff.map(stak => stak?.split('\\')) : ff.map(stak => stak?.split('/'));
	const active = p.map(stak => stak && isCurrent(stak[4]))
	const stada = active.some(stak => stak)
	return <nav>
		<ol>
			{p.map(
				(stak, nr) => {
					const href = stak && stak.splice(stada ? -1 : -2).join('/')
					return (href &&
						<li key={nr} className={active[nr] ? "a" : ""}>
							<Link href={href}>
								{image ? <Image src={image} alt={image} width="250"
									height="350"
									style={{ filter: `hue-rotate(${nr * 90}deg)`, rotate: `${((-1) ** nr) * 2.5 * nr}deg` }} /> : ''}
								{href.split('/').splice(-1)[0].replace(/\d+/g, match => ` ${match}`)}
							</Link></li>)
				}
			)}
		</ol>
	</nav>
}