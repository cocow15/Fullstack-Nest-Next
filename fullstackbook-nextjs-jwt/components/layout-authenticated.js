import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import styles from '../styles/layout.module.css'
import Head from 'next/head';
import Image from 'next/image';
import Card from '@/components/card';
import Card2 from '@/components/card2';

export default function LayoutAuthenticated(props) {
  const [profile, setProfile] = useState()
  const router = useRouter()

  const courses = [
    {
      id: 1,
      title: 'Aplikasi Perancangan Perangkat Lunak 2',
      imageUrl: "/course1.png",
      href: '/courses/Aplikasi-Perancangan-Perangkat-Lunak 2',
    },
    {
      id: 2,
      title: 'Algoritma dan Struktur Data',
      imageUrl: "/course2.png",
      href: '/courses/algoritma-struktur-data',
    },
    {
      id: 3,
      title: 'Basis Data',
      imageUrl: "/course3.png",
      href: '/courses/basis-data',
    }
  ];

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
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"/>
          <title>LMS | Home</title>
          <meta name="description" content="Website LMS JTK"/>
      </Head>
      <div className={styles.sidebar}>
        <ul className={styles.menu}>
          <li className={styles.logo}><Image src="/Logo LMS.png" width={100} height={100} alt='Logo' /></li>
          <li><a className={styles.active} href="beranda"><i className="fas fa-home"></i> &nbsp; &nbsp; Beranda</a></li>
          <li><a href="mata-kuliah"><i className="fas fa-book"></i> &nbsp; &nbsp; Mata Kuliah</a></li>
          <li><a href="#"><i className="fas fa-clipboard"></i> &nbsp; &nbsp; Ujian</a></li>
          <li><a href="nilai"><i className="fas fa-chart-bar"></i> &nbsp; &nbsp; Nilai</a></li>
          <li><a href="#"><i className="fas fa-comments"></i> &nbsp; &nbsp; Forum Diskusi</a></li>
          <li><a href="#"><i className="fas fa-user"></i> &nbsp; &nbsp; Akun Saya</a></li>
          <li className={styles.logoutButton}><button onClick={logout}><i className="fas fa-sign-out-alt"></i> &nbsp; Log out</button></li>
        </ul>
      </div>
      
      <div className={styles.content}>
        <h1>Halo {profile && profile.username}!</h1>
        <div className={styles.containerMK}>
            <div className={styles.containerTitleMK}>
              <h1 className={styles['title-listMK']}>Mata Kuliah</h1>
              <a className={styles.kelolaMK} href="mata-kuliah" >Kelola</a>
            </div>
            <div className={styles['card-container']}>
                {courses.map((course) => (
                  <Card
                    key={course.id}
                    title={course.title}
                    imageUrl={course.imageUrl}
                    href={course.href}
                  />
                ))}
            </div>
          </div>

          <div className={styles.containerNilai}>
            <div className={styles.containerTitleNilai}>
              <h1 className={styles['title-listNilai']}>Nilai</h1>
              <a className={styles.kelolaNilai} href="nilai">Lihat Detail</a>
            </div>
            <div className={styles.diagram}>
              <Image src="/DIAGRAM.png" width={441} height={357} alt='Diagram' />
            </div>
          </div>
      </div>
      <div className={styles.additionalSection}>
        <ul className={styles.nav}>
          <li className={styles.notificationIcon}><i className="fas fa-bell"></i></li>
          <li><img src="/profile.png" alt="Profile Picture" className={styles.profileImage} /></li>
          <li><p>{profile && profile.username}<br/>Dosen</p></li>
        </ul>
        <div className={styles.containerFD}>
            <div className={styles.containerTitleFD}>
              <h1 className={styles['title-listFD']}>Forum Diskusi</h1>
            </div>
            <div className={styles['card-container2']}>
                {courses.map((course) => (
                  <Card2
                    key={course.id}
                    title={course.title}
                    imageUrl={course.imageUrl}
                    href={course.href}
                  />
                ))}
            </div>
          </div>
      </div>
    </div>
  )
}