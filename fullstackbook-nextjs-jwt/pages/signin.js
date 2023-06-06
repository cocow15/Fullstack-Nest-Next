import { useRouter } from "next/router"
import { useState } from "react"
import Link from 'next/link'
import Layout from "../components/layout"
import styles from "../styles/signin.module.css"
import Head from 'next/head'
import Image from 'next/image';

export default function SignIn() {
  const router = useRouter()

  const [state, setState] = useState({
    username: "",
    password: ""
  })

  const togglePasswordVisibility = () => {
    setState((prevState) => ({ ...prevState, showPassword: !prevState.showPassword }));
  };
  

  function handleChange(e) {
    const copy = { ...state }
    copy[e.target.name] = e.target.value
    setState(copy)
  }

  async function handleSubmit() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`, {
      method: "POST",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (res.ok) {
      const json = await res.json()
      localStorage.setItem("token", json.token)
      router.push("/beranda")
    } else {
      alert("Bad credentials")
    }
  }

  return (
      <div>
      <Head>
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
         <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"/>
          <title>LMS | Signin</title>
          <meta name="description" content="Website LMS JTK"/>
      </Head>
      <Layout>
        <div className={`${styles.split} ${styles.left}`}>
          <div className={styles.centered1}>
            <Image src="/Logo LMS.png" width={530} height={530} alt='Logo' />
          </div>
        </div>


        <div className={`${styles.split} ${styles.right}`}>
          <div className={styles.centered2}>
            <div className={styles.container}>
              <h1 className={styles.title}>WELCOME BACK! <br/> Let's SignIn</h1>
              <p className={styles.text}>Don't have an account? <Link href="/signup">Register now</Link>.</p>
              <div className={styles.form}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="username">Username</label>
                  <input className={styles.input} type="text" id="username" name="username" placeholder="Enter your Username" value={state.username} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="password">Password</label>
                  <div className={styles.passwordInput}>
                    <input className={styles.input} type={state.showPassword ? "text" : "password"} id="password" name="password" placeholder="Enter your Password" value={state.password} onChange={handleChange} />
                    <span className={styles.passwordToggle} onClick={togglePasswordVisibility}>
                      <i className={`fas ${state.showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </span>
                  </div>
                </div>
                <div className={styles.formGroupCheckbox}>
                  <input className={styles.checkbox} type="checkbox" id="remember" name="remember" />
                  <label className={styles.labelCheckbox} htmlFor="remember">Remember Me</label>
                  <label className={styles.labelForgot} htmlFor="forgotPassword">Forgot Password?</label>
                </div>
                  <button className={styles.btn} onClick={handleSubmit}>Login</button>
                </div>
              </div>
            </div>
          </div>
      </Layout>
            
      </div>
  )
}
