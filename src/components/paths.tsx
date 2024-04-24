'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PathString } from "react-hook-form";
import Image from "next/image";
import styles from "./Paths.module.scss"
import { useState } from "react";

let test = true;
export default function Paths() {
	const pathname = usePathname();
	const isCurrent = (href: string): string => {
		return pathname && pathname.split('/').includes(href) ? 'active' : 'ekki';
	}
	return <nav>
		<ol className={styles.paths}>
			<li className={pathname === '/' ? 'active' : 'ekki'}>
				<Link href={'/'}>
					Heim
				</Link>
			</li>
			<li className={pathname === '/Kanbanbord' ? 'active' : 'ekki'}>
				<Link href={'/Kanbanbord'}>
					Kanbanbord
				</Link>
			</li>
			<li className={pathname === '/Notandi' ? 'active' : 'ekki'}>
				<Link href={'/Notandi'}>
					Notandi
				</Link>
			</li>
		</ol>
	</nav>
}