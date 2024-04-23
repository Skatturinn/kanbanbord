'use client'
import Paths from "@/components/paths";

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