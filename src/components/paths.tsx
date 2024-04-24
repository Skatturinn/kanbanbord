'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PathString } from "react-hook-form";
import Image from "next/image";
import styles from "./Paths.module.scss"
import { useState } from "react";

let test = true;
export default function Paths({ files, image }: { files: Array<string | null>, image: PathString | undefined }) {
	console.log(files)
	const pathname = usePathname();
	const [index, setIndex] = useState(2)
	const isCurrent = (href: string): string => {
		return pathname && pathname.split('/').includes(href) ? 'active' : 'ekki';
	}
	const ff = files.filter(e => e);
	const p = ff[0]?.includes('\\') ? ff.map(stak => stak?.split('\\')) : ff.map(stak => stak?.split('/'));
	const ind = p.map(stak => stak?.indexOf(pathname.split('/')[1])).filter(v => Number(v) >= 0) as Array<number>
	if (test) {
		ind[0] !== index && setIndex(ind[0])
		test = false
	}
	console.log(pathname, p, ind)
	const active = p.map(stak => stak && isCurrent(stak[4]));
	const stada = active.some(stak => stak);
	return <nav>
		<ol className={styles.paths}>
			<li className={pathname === '/' ? 'active' : 'ekki'}>
				<Link href={'/'}>
					Heim
				</Link>
			</li>
			{p.map(
				(stak, nr) => {
					const href = stak && stak.splice(stada ? -1 : index).join('/')
					return (href && !href.includes('api') &&
						<li key={nr} className={isCurrent(href)}>
							<Link href={'/' + href}>
								{image ? <Image src={image} alt={image} width="250"
									height="350"
									style={{ filter: `hue-rotate(${nr * 90}deg)`, rotate: `${((-1) ** nr) * 2.5 * nr}deg` }} /> : ''}
								{href.split('/').splice(-1)[0].replace(/\d+/g, match => ` ${match}`)}
							</Link>
						</li>
					)
				}
			)}
		</ol>
	</nav>
}