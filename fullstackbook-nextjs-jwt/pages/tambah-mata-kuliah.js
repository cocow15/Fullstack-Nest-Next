import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Head from 'next/head'
import styles from "../styles/tambahMk.module.css"
import Image from 'next/image';

export default function User() {
  const [content, setContent] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetchContent()
  }, [])

  const [file, setFile] = useState(null);
  const [semester, setSemester] = useState('');
  const [namaMataKuliah, setNamaMataKuliah] = useState('');
  const [kodeMataKuliah, setKodeMataKuliah] = useState('');
  const [deskripsiMataKuliah, setDeskripsiMataKuliah] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };

  const handleNamaMataKuliahChange = (event) => {
    setNamaMataKuliah(event.target.value);
  };

  const handleKodeMataKuliahChange = (event) => {
    setKodeMataKuliah(event.target.value);
  };

  const handleDeskripsiMataKuliahChange = (event) => {
    setDeskripsiMataKuliah(event.target.value);
  };

  const handleSimpanClick = () => {
    // Logika untuk menyimpan data ke backend
    // Gunakan nilai dari file, semester, namaMataKuliah, kodeMataKuliah, dan deskripsiMataKuliah
    // yang disimpan dalam state
  };

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
          <li><a a className={styles.active} href="mata-kuliah"><i className="fas fa-book"></i> &nbsp; &nbsp; Mata Kuliah</a></li>
          <li><a href="#"><i className="fas fa-clipboard"></i> &nbsp; &nbsp; Ujian</a></li>
          <li><a href="nilai"><i className="fas fa-chart-bar"></i> &nbsp; &nbsp; Nilai</a></li>
          <li><a href="#"><i className="fas fa-comments"></i> &nbsp; &nbsp; Forum Diskusi</a></li>
          <li><a href="#"><i className="fas fa-user"></i> &nbsp; &nbsp; Akun Saya</a></li>
          <li className={styles.logoutButton}><button onClick={logout}><i className="fas fa-sign-out-alt"></i> &nbsp; Log out</button></li>
        </ul>
      </div>
      
        <div className={styles.content}>
            <ul className={styles.nav}>
            <li className={styles.notificationIcon}><i className="fas fa-bell"></i></li>
            <li><img src="/profile.png" alt="Profile Picture" className={styles.profileImage} /></li>
            <li><p>{profile && profile.username}<br/>Dosen</p></li>
            </ul>
            <div className={styles.containerTitleMK}>
                <h1 className={styles['title-listMK']}>Tambah Mata Kuliah</h1>
            </div>
            <div className={styles.formContainer}>
                <label htmlFor="gambar">Gambar:</label>
                <input type="file" id="gambar" onChange={handleFileChange} />

                <label htmlFor="semester">Semester:</label>
                <select id="semester" value={semester} onChange={handleSemesterChange}>
                    <option value="">Pilih Semester</option>
                    <option value="Semester 1">Semester 1</option>
                    <option value="Semester 2">Semester 2</option>
                    <option value="Semester 3">Semester 3</option>
                    <option value="Semester 4">Semester 4</option>
                    <option value="Semester 5">Semester 5</option>
                    <option value="Semester 6">Semester 6</option>
                    <option value="Semester 7">Semester 7</option>
                    <option value="Semester 8">Semester 8</option>
                </select>

                <label htmlFor="namaMataKuliah">Nama Mata Kuliah:</label>
                <input type="text" id="namaMataKuliah" value={namaMataKuliah} onChange={handleNamaMataKuliahChange} />

                <label htmlFor="kodeMataKuliah">Kode Mata Kuliah:</label>
                <input type="text" id="kodeMataKuliah" value={kodeMataKuliah} onChange={handleKodeMataKuliahChange} />
                <label htmlFor="deskripsiMataKuliah">Deskripsi Mata Kuliah:</label>
                <textarea id="deskripsiMataKuliah" value={deskripsiMataKuliah} onChange={handleDeskripsiMataKuliahChange}></textarea>

                <button onClick={handleSimpanClick}>Simpan</button>
            </div>
        </div>
    </div>
  )
}