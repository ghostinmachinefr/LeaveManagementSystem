'use client';
import React, { useState } from 'react';
import styles from '@/styles/Home.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const isFormValid = () => {
    if (type === 'admin') {
      return formData.email.trim() !== '' && formData.password.trim() !== '';
    }
    return formData.email.trim() !== ''; // For user, only SAP ID is required
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    
    if (type === 'admin') {
      router.push('/admin/adminpage');
    } else {
      router.push('/user/userpage');
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.logoContainer}>
          <div className={styles.logoText}>
            <div className={styles.logo}>
              HCLTech
              <span className={styles.divider}>|</span>
              <div className={styles.taglineContainer}>
                <div className={styles.taglineTop}>Supercharging</div>
                <div className={styles.taglineBottom}>Progress™</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.loginBox}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                {type === 'admin' ? 'Email' : 'SAP ID'}
              </label>
              <input
                type={type === 'admin' ? 'email' : 'text'}
                id="email"
                className={styles.input}
                placeholder={type === 'admin' ? 'Enter your email' : 'Enter your SAP ID'}
                required
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </div>
            
            {type === 'admin' && (
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className={styles.input}
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </div>
            )}

            <button 
              type="submit" 
              className={styles.button}
              disabled={!isFormValid()}
            >
              {type === 'admin' ? 'Sign In' : 'Continue'}
            </button>
          </form>
        </div>
      </main>
      <div className={styles.overlay} />
    </div>
  );
}