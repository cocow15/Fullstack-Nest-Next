import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Head from 'next/head'
import styles from "../styles/nilai.module.css"
import Image from 'next/image';

export default function User() {
  const [content, setContent] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetchContent()
  }, [])


  async function fetchContent() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test/user`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
    if (res.ok) {
      const text = await res.text()
      setContent(text)
    }
  }

  const [profile, setProfile] = useState()

  useEffect(() => {
    fetchProfile()
  }, [])

  async function fetchProfile() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test/profile`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
    if (res.ok) {
      const json = await res.json()
      setProfile(json)
    } else {
      router.push("/signin")
    }
  }

  function logout() {
    localStorage.removeItem("token")
    router.push("/signin")
  }

  return (
    <div className={styles.container}>
      <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
          <title>LMS | Home</title>
          <meta name="description" content="Website LMS JTK"/>
      </Head>
      <div className={styles.sidebar}>
        <ul className={styles.menu}>
          <li className={styles.logo}><Image src="/Logo LMS.png" width={100} height={100} alt='Logo' /></li>
          <li><a href="beranda"><i className="fas fa-home"></i> &nbsp; &nbsp; Beranda</a></li>
          <li><a href="mata-kuliah"><i className="fas fa-book"></i> &nbsp; &nbsp; Mata Kuliah</a></li>
          <li><a href="#"><i className="fas fa-clipboard"></i> &nbsp; &nbsp; Ujian</a></li>
          <li><a className={styles.active} href="nilai"><i className="fas fa-chart-bar"></i> &nbsp; &nbsp; Nilai</a></li>
          <li><a href="#"><i className="fas fa-comments"></i> &nbsp; &nbsp; Forum Diskusi</a></li>
          <li><a href="#"><i className="fas fa-user"></i> &nbsp; &nbsp; Akun Saya</a></li>
          <li className={styles.logoutButton}><button onClick={logout}><i className="fas fa-sign-out-alt"></i> &nbsp; Log out</button></li>
        </ul>
      </div>
      
      <div className={styles.content}>
   
      </div>
      <div className={styles.additionalSection}>
        <ul className={styles.nav}>
          <li className={styles.notificationIcon}><i className="fas fa-bell"></i></li>
          <li><img src="/profile.png" alt="Profile Picture" className={styles.profileImage} /></li>
          <li><p>{profile && profile.username}<br/>Dosen</p></li>
        </ul>
      </div>
    </div>
  )
}