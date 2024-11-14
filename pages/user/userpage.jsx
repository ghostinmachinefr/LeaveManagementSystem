import { useState } from 'react';
import TopNavBar from '../../src/components/TopNavBar';
import SideNavBar from '../../src/components/user/SideNavBar';
import LeaveCardsGrid from '../../src/components/user/Cards/LeaveCardsGrid';
import LeaveRequestsTable from '../../src/components/user/LeaveRequestsTable';
import styles from './userpage.module.css';

const UserDashboard = () => {
  const [user] = useState({
    name: "User",
    email: "user@domain.com",
    profilePicture: "/user-profile.png"
  });

  const [leaveStats] = useState({
    fullLeave: {
      remainingLeaves: 10,
      usedLeaves: 5,
      totalLeaves: 15
    },
    halfLeave: {
      remainingLeaves: 8,
      usedLeaves: 2,
      totalLeaves: 10
    },
    rhLeave: {
      remainingLeaves: 3,
      usedLeaves: 0,
      totalLeaves: 3
    },
    compOff: {
      remainingLeaves: 5,
      usedLeaves: 1,
      totalLeaves: 6
    }
  });

  const [leaveRequests] = useState([
    // Sample data
    {
      id: 'REQ001',
      dateSent: '2024-03-15',
      type: 'Full Leave',
      fromDate: '2024-03-20',
      toDate: '2024-03-21'
    }
  ]);

  const handleRequestLeave = () => {
    // Handle leave request
  };

  const handleDeleteRequest = (requestId) => {
    // Handle delete request
  };

  return (
    <div className={styles.dashboard}>
      <TopNavBar user={user} />
      <div className={styles.mainContainer}>
        <SideNavBar activePage="dashboard" />
        <main className={styles.mainContent}>
          <div className={styles.topSection}>
            <button 
              className={styles.requestLeaveButton}
              onClick={handleRequestLeave}
            >
              Request Leave
            </button>
          </div>
          
          <LeaveCardsGrid leaveStats={leaveStats} />
          
          <LeaveRequestsTable 
            requests={leaveRequests}
            onDeleteRequest={handleDeleteRequest}
          />
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;