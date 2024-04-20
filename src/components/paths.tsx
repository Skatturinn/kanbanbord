'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PathString } from "react-hook-form";
import Image from "next/image";
import styles from '@/app/page.module.css';

export default function Paths({ files, image }: { files: Array<string | null>, image: PathString | undefined }) {
	const pathname = usePathname();
	const isCurrent = (href: string): boolean => {
		return pathname && pathname.split('/').includes(href) ? true : false;
	}
	const ff = files.filter(e => e);
	const p = ff[0]?.includes('\\') ? ff.map(stak => stak?.split('\\')) : ff.map(stak => stak?.split('/'));
	const active = p.map(stak => stak && isCurrent(stak[4]));
	const stada = active.some(stak => stak);
	return <nav>
		<div className={styles.paths}>
			<Link href={'/'}>
				Heim
			</Link>
			<ol className={styles.noListStyle}>
				{p.map(
					(stak, nr) => {
						const href = stak && stak.splice(stada ? 1 : 2).join('/')
						return (href && !href.includes('api') &&
							<li key={nr} className={active[nr] ? "a" : ""}>
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
		</div>
	</nav>
}