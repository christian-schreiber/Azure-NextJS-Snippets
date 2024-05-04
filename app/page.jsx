import { options } from "./api/auth/[...nextauth]/options"
import Link from "next/link";
import styles from "./page.module.css";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const session = await getServerSession(options)
  const data = await getServerSession()
  return (
    <main className={styles.main}>
      
      <h1>Next-Azure-App</h1>      
      {session ? (
          <>
          <br />
          <img src={session.user.image} alt={session.user.name} style={{width: '3%', borderRadius: '50%', border: '1.5px solid grey'}} />
          <br />
          <h2 className={styles.subtitle}>Welcome {session.user.name}</h2>
          <Link href="/dashboard">
            <button className={styles.button}>Enter Dashboard</button>
          </Link>
          </>
        ) :
        <Link href="http://localhost:3000/api/auth/signin">
            <button className={styles.button}>Login</button>
        </Link>
      }     
    </main>
  );
}
