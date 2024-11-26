import { useState } from 'react';
import TopNavBar from '@/components/TopNavBar';
import SideNavBar from '@/components/user/SideNavBar';
import styles from '@/styles/user/history.module.css';

const History = () => {
  const [user] = useState({
    name: "User",
    email: "user@domain.com",
    profilePicture: "/profile.png"
  });

  const [historyData] = useState([
    {
      sapId: "2341421",
      employeeName: "John Smith",
      leaveType: "Full Leave",
      fromDate: "2024-03-15",
      toDate: "2024-03-16",
      requestedOn: "2024-03-10"
    },
    {
      sapId: "2341421",
      employeeName: "John Smith",
      leaveType: "Half Leave",
      fromDate: "2024-02-20",
      toDate: "2024-02-20",
      requestedOn: "2024-02-15"
    },
    {
      sapId: "2341421",
      employeeName: "John Smith",
      leaveType: "RH",
      fromDate: "2024-01-26",
      toDate: "2024-01-26",
      requestedOn: "2024-01-20"
    },
    {
      sapId: "2341421",
      employeeName: "John Smith",
      leaveType: "Comp Off",
      fromDate: "2024-01-15",
      toDate: "2024-01-15",
      requestedOn: "2024-01-10"
    },
    {
      sapId: "2341421",
      employeeName: "John Smith",
      leaveType: "Full Leave",
      fromDate: "2023-12-25",
      toDate: "2023-12-26",
      requestedOn: "2023-12-20"
    }
  ]);

  return (
    <div className={styles.dashboard}>
      <TopNavBar user={user} />
      <div className={styles.mainContainer}>
        <SideNavBar activePage="history" />
        <main className={styles.mainContent}>
          <h1>Request History</h1>
          <div className={styles.tableContainer}>
            <div className={styles.tableActions}>
              <button className={styles.exportButton}>
                Export to Excel
              </button>
            </div>
            <table className={styles.historyTable}>
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
                {historyData.map((record, index) => (
                  <tr key={index}>
                    <td>{record.sapId}</td>
                    <td>{record.employeeName}</td>
                    <td>{record.leaveType}</td>
                    <td>{record.fromDate}</td>
                    <td>{record.toDate}</td>
                    <td>{record.requestedOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default History;