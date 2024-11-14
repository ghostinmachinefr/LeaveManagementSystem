import styles from '@/styles/user/LeaveCard.module.css';

const LeaveCard = ({ title, remainingLeaves, usedLeaves, totalLeaves }) => {
  const percentage = (usedLeaves / totalLeaves) * 100;
  
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>
      
      <div className={styles.cardStats}>
        <div className={styles.progressCircle}>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#e6e6e6"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#3354F4"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
              transform="rotate(-90 50 50)"
            />
            <text
              x="50"
              y="50"
              textAnchor="middle"
              dominantBaseline="middle"
              className={styles.progressText}
            >
              {`${usedLeaves}/${totalLeaves}`}
            </text>
          </svg>
        </div>

        <div className={styles.leaveStats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Remaining</span>
            <span className={styles.statValue}>{remainingLeaves}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Used</span>
            <span className={styles.statValue}>{usedLeaves}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Total</span>
            <span className={styles.statValue}>{totalLeaves}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveCard;