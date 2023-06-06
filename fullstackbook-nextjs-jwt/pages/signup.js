import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../components/layout";
import styles from "../styles/signup.module.css";
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link'

export default function SignUp() {
  const router = useRouter();

  const [state, setState] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };


  async function handleSubmit() {
    // Reset error messages
    setUsernameError("");
    setPasswordError("");
    setEmailError("");

    // Validasi username, password, dan email
    if (state.username.length < 5) {
      setUsernameError("Username harus memiliki minimal 5 karakter.");
      return;
    }

    if (state.password.length < 5) {
      setPasswordError("Password harus memiliki minimal 5 karakter.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(state.email)) {
      setEmailError("Email harus memiliki format yang valid.");
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.ok) {
      alert("User registered successfully.");
      router.push("/signin");
    }
  }

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
         <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"/>
         <title>LMS | Signup</title>
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
              <h1 className={styles.title}>WELCOME TO LMS!</h1>
              <p className={styles.text}>Already have an account? <Link href="/signin">Login</Link>.</p>
              <div className={styles.form}>
                <label className={styles.label} htmlFor="username">Username</label>
                <input className={styles.input} type="text" name="username" placeholder="Enter your Username" value={state.username} onChange={handleChange} />
                {usernameError && <p className={styles.error}>{usernameError}</p>}
                
                <label className={styles.label} htmlFor="email">Email</label>
                <input className={styles.input} type="text" name="email" placeholder="Enter your Email" value={state.email} onChange={handleChange} />
                {emailError && <p className={styles.error}>{emailError}</p>}
                
                <label className={styles.label} htmlFor="password">Password</label>
                <div className={styles.passwordInput}>
                  <input
                    className={styles.input}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your Password"
                    value={state.password}
                    onChange={handleChange}
                  />
                  <span className={styles.passwordToggle} onClick={handleTogglePassword}>
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </span>
                </div>
                {passwordError && <p className={styles.error}>{passwordError}</p>}
                <button className={styles.btn} onClick={handleSubmit}>Register</button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}