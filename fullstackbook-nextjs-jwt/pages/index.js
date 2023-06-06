import Head from 'next/head'
import Link from 'next/link'
import styles from "../styles/home.module.css"


export default function Home() {
  const handleClick = () => {
    alert('Button clicked!');
  };


  return (
  <div>
  <Head>
    <title>LMS JTK POLBAN</title>
    <meta name="description" content="LMS JTK POLBAN" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
    <div className={styles.container}>
      <h1>Home</h1>
      <div className={styles.buttons}>
        <p><Link href="/signup">Sign Up</Link></p>
        <p><Link href="/signin">Sign In</Link></p>
      </div>
    </div>
  </div>
  )
}
