import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {

  return (
    <div className={styles.main}>
         <h1>Þetta er heimasíðan</h1>
		 <p>Hún er opin öllum, til að nota kanbanborð þarftu að skrá þig inn</p>
		 <Link href="/Notandi/Login">Login</Link>
    </div>
  );
}
