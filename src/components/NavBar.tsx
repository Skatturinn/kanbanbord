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
        <nav className={styles.navbar}>
            <Paths files={files} image={image} />
            <div className={styles.buttonContainer}>
                <LoginButton className={styles.loginButton} />
                <Logout className={styles.logoutButton} />
            </div>
        </nav>
    );
}