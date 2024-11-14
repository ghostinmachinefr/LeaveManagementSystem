import React from 'react';
import Image from 'next/image';
import styles from '../../styles/TopNavBar.module.css';

const TopNavBar = ({ user }) => {
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
      <button className={styles.admindetails} id="loginDetails">
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
    </header>
  );
};

export default TopNavBar;