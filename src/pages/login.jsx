import { useEffect, useState } from 'react';
import styles from '@/styles/user/LeaveCardGrid.module.css';
import LeaveCard from './LeaveCard';
import api from '@/utils/axios';

const LeaveCardsGrid = () => {
  const [leaveStats, setLeaveStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaveStats = async () => {
      try {
        console.log('Fetching leave stats...');
        const response = await api.get('/v1/leaveCard/stats');
        console.log('Leave stats response:', response.data);
        
        if (response.data.success) {
          setLeaveStats(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch leave stats');
        }
      } catch (error) {
        console.error('Error fetching leave stats:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveStats();
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!leaveStats) return <div className={styles.noData}>No leave statistics available</div>;

  return (
    <div className={styles.cardsGrid}>
      <LeaveCard
        title="Full Leave"
        {...leaveStats.fullLeave}
        iconSrc="/full-leave-icon.svg"
        altText="Full Leave Icon"
      />
      <LeaveCard
        title="Half Leave"
        {...leaveStats.halfLeave}
        iconSrc="/half-leave-icon.svg"
        altText="Half Leave Icon"
      />
      <LeaveCard
        title="RH"
        {...leaveStats.rhLeave}
        iconSrc="/rh-icon.svg"
        altText="RH Icon"
      />
      <LeaveCard
        title="Comp Off"
        {...leaveStats.compOff}
        iconSrc="/comp-off-icon.svg"
        altText="Comp Off Icon"
      />
    </div>
  );
};

export default LeaveCardsGrid; 