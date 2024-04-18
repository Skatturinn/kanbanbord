import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <div>
         <h1>Þetta er notendasíða</h1>
		 <p>Hún er opin öllum, til að nota kanbanborð þarftu að skrá þig inn</p>
		 <Link href="/Notandi/Login">Login</Link>
     <Link href="/Notandi/Admin">Admin</Link>
    </div>
  );
}
