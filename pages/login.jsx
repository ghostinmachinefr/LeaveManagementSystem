'use client';   
import React from 'react';
import styles from '@/styles/Home.module.css';
import { useRouter } from 'next/navigation';
export default function Home() { 
    const router = useRouter();
  return ( 
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Logo and Text Container */}
        <div className={styles.logoContainer}>
          <div className={styles.logoText}>
            <h1 className={styles.logo}>
              HCLTech
              <span className={styles.divider}>|</span>
            </h1>
          </div> 
          <div className={styles.tagline}>
            Supercharging
            <br />
            Progress™
          </div>
        </div>

        {/* Login Box Container */}
        <div className={styles.loginBox}>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Email
              </label>
              <input 
                type="email"
                placeholder="Enter here"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Password
              </label>
              <input 
                type="password"
                placeholder="Enter here."
                className={styles.input}
              />
            </div>

            <button 
              type="submit"
              className={styles.button}
              onClick={() => {
                router.push('/admin/adminpage');
              }}
            >
              Sign In
            </button>

            <a 
              href="#" 
              className={styles.forgotPassword}
            >
              Forgot password?
            </a>
          </form>
        </div>
      </main>

      {/* Background Pattern */}
      <div className={styles.overlay} />
    </div>
  );
}