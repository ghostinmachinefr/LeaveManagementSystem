import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import styles from '../styles/TopNavBar.module.css';
import { useRouter } from 'next/router';

const TopNavBar = ({ user }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleSignOut = () => {
    setShowDropdown(false);
    router.push('/login');
  };

  const handleHclLogoClick = useCallback(() => {
    if (router.pathname.includes('/admin')) {
      router.push('/admin/adminpage');
    } else if (router.pathname.includes('/user')) {
      router.push('/user/userpage');
    }
  }, [router]);

  return (
    <header className={styles.navbar} id="TopNavBar">
      <Image
        className={styles.hclLogo}
        width={139}
        height={51}
        alt="HCL Logo"
        src="/hcl-logo.png"
        onClick={handleHclLogoClick}
        style={{ cursor: 'pointer' }}
      />
        
      <div className={styles.navback} />
      <Image
        className={styles.navsep}
        width={40}
        height={40}
        alt="Separator"
        src="/separator.svg"
      />
      <div 
        className={styles.adminContainer}
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <div className={styles.admindetails}>
          <Image
            className={styles.profileImage}
            width={35}
            height={35}
            alt="Admin Profile"
            src={user.profilePicture || "/admin-profile.png"}
          />
          <div className={styles.adminAdmindomainin}>
            <p className={styles.p}>{user.name}</p>
            <p className={styles.p}>{user.email}</p>
          </div>
        </div>
        
        {showDropdown && (
          <div className={styles.dropdown}>
            <div className={styles.dropdownContent}>
              <div className={styles.dropdownUser}>
                <Image
                  className={styles.dropdownProfile}
                  width={35}
                  height={35}
                  alt="Admin Profile"
                  src={user.profilePicture || "/admin-profile.png"}
                />
                <div className={styles.dropdownUserInfo}>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                </div>
              </div>
              <button className={styles.signOutButton} onClick={handleSignOut}>
                <Image
                  width={20}
                  height={20}
                  alt="Sign Out"
                  src="/logOut.svg"
                />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopNavBar;