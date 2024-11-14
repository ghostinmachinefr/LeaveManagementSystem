import React from 'react';
import Image from 'next/image';
import styles from '@/styles/user/SideNavBar.module.css';

const SideNavBar = () => {
  return (
    <aside className={styles.sidenav}>
      <Image
        className={styles.dashboardIcon}
        width={24}
        height={24}
        alt="Dashboard Icon"
        src="/dashboard-icon-active.svg"
      />
    </aside>
  );
};

export default SideNavBar;