import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/TopNavBar.module.css';

const TopNavBar = ({ user }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = () => {
    // Add your sign out logic here
    console.log('Signing out...');
  };

  return (
    <header className={styles.navbar} id="TopNavBar">
      <Image
        className={styles.hclLogo}
        width={139}
        height={51}
        alt="HCL Logo"
        src="/hcl-logo.png"
      />
      <div className={styles.navback} />
      <Image
        className={styles.navsep}
        width={40}
        height={40}
        alt="Separator"
        src="/separator.svg"
      />
      <div className={styles.adminContainer}>
        <button 
          className={styles.admindetails} 
          id="loginDetails"
          onClick={() => setShowDropdown(!showDropdown)}
        >
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
        </button>
        
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