import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { readFilesFromDir } from "@/util/get_folders";
import styles from '@/app/layout.module.scss'
import { Logout } from "@/components/Logout";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import { LoginButton } from "@/components/Login";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Kanbanborð",
	description: "Hópverkefni 2, Nextjs útfærlsa af api úr hópverkefni 1 sem var kanbanborð",
};



export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const files = (await readFilesFromDir(`./src/app`))
	return (
		<html lang="is">
			<body className={inter.className}>
				<header>
					<NavBar files={files} image="" /> {/* Use the NavBar component */}
				</header>
				<main className={styles.main}>{children}</main>
				<footer className={styles.footer}>
					<div className={styles.log}>
						<LoginButton className={styles.loginButton} />
						<Logout />
					</div>
					<p>Elli og Addi production</p>
					<Link href={'/Notandi/Admin'}>Admin</Link>
				</footer>
			</body>
		</html>
	);
}