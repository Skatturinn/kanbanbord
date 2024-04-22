'use client'
import Paths from "@/components/paths";
import { Logout } from "@/components/Logout";
import styles from '@/app/page.module.css';
import { LoginButton } from "./Login";

interface NavBarProps {
	files: any;
	image: any;
}

export default function NavBar({ files, image }: NavBarProps) {
	return (
		<nav >
			<Paths files={files} image={image} />
		</nav>
	);
}