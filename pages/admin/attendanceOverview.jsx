import { useEffect, useState, useCallback } from 'react';
import styles from '../../src/styles/admin/overview.module.css'; 
import TopNavBar from '../../src/components/TopNavBar'; 
import SideNavBar from '../../src/components/admin/SideNavBar'; 
import { useRouter } from 'next/router';

const SCREEN1ADP = () => {
  const [user, setUser] = useState({
    name: "Admin",
    email: "admin@domain.com",
    profilePicture: "/admin-profile.png"
  });

  const router = useRouter(); 
  const onDashboardIconClick = useCallback(() => {
    router.push('/admin/adminpage');
  }, [router]);

  const onAttendanceOverviewIconClick = useCallback(() => {
    router.push('/admin/attendanceOverview');
  }, [router]);

  const attendanceData = [
    {
      sapId: "2341421",
      employeeName: "Ali Alhamdan",
      leaveType: "Full Leave",
      leaveRequestDateFrom: "29 July 2023",
      leaveRequestDateTo: "29 July 2023",
      leaveRequestedOn: "02 July 2023"
    },
    {
      sapId: "3411421",
      employeeName: "Ahmed Rashdan",
      leaveType: "Half Leave",
      leaveRequestDateFrom: "29 July 2023",
      leaveRequestDateTo: "29 July 2023",
      leaveRequestedOn: "04 July 2023"
    },
  ];

  return (
    <div className={styles.screen1Adp}>
    <TopNavBar user={user} />
    <SideNavBar 
        onDashboardIconClick={onDashboardIconClick} 
        onAttendanceOverviewIconClick={onAttendanceOverviewIconClick} 
        activePage="attendanceOverview" 
    />
    <main className={styles.mainContent}>
    <div className={styles.tableContainer}>
    <h1 className={styles.title}>Attendance Overview</h1>
    <div className={styles.headerSection}>
    <button className={styles.exportButton}>Export to Excel</button>
    
    <div className={styles.searchSection}>
      <span className={styles.searchLabel}>Search By:</span>
      <div className={styles.searchButtons}>
        <button className={styles.searchButton}>SAP-ID</button>
        <button className={styles.searchButton}>Employee-Name</button>
        <button className={styles.searchButton}>Calendar</button>
        <button className={styles.searchButton}>Leave Type</button>
      </div>
      </div>
     </div>

        <table className={styles.overviewTable}>
            <thead>
              <tr>
                <th>SAP ID</th>
                <th>Employee Name</th>
                <th>Leave Type</th>
                <th>Leave Request Date From</th>
                <th>Leave Request Date To</th>
                <th>Leave Requested On</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((item, index) => (
                <tr key={index}>
                  <td>{item.sapId}</td>
                  <td>{item.employeeName}</td>
                  <td>{item.leaveType}</td>
                  <td>{item.leaveRequestDateFrom}</td>
                  <td>{item.leaveRequestDateTo}</td>
                  <td>{item.leaveRequestedOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default SCREEN1ADP;