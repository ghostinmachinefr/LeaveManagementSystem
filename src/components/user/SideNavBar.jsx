import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../../styles/user/SideNavBar.module.css';

const SideNavBar = ({ activePage }) => {
  const router = useRouter();

  const handleDashboardClick = () => {
    router.push('/user/userpage');
  };

  const handleHistoryClick = () => {
    router.push('/user/history');
  };

  return (
    <aside className={styles.sidenav} id="sideNav">
      <div className={styles.iconWrapper}>
        <div 
          className={styles.dashboardIcon}
          onClick={handleDashboardClick}
        >
          <Image
            src={activePage === 'dashboard' ? "/dashboard-icon-active.svg" : "/dashboard-icon.svg"}
            alt="Dashboard Icon"
            width={24}
            height={24}
          />
          <span className={styles.tooltip}>Dashboard</span>
        </div>
      </div>

      <div className={styles.iconWrapper}>
        <div 
          className={styles.historyIcon}
          onClick={handleHistoryClick}
        >
          <Image
            src={activePage === 'history' ? "/history-icon-active.svg" : "/history-icon.svg"}
            alt="History Icon"
            width={24}
            height={24}
          />
          <span className={styles.tooltip}>History</span>
        </div>
      </div>
    </aside>
  );
};

export default SideNavBar;