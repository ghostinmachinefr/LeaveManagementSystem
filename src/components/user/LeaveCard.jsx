import styles from '@/styles/user/LeaveCard.module.css';

const LeaveCard = ({ title, usedLeaves, totalLeaves, iconSrc, altText }) => {
  const percentage = (usedLeaves / totalLeaves) * 100;

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <div className={styles.cardStats}>
        <div className={styles.progressCircle} style={{ '--percentage': percentage }}>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#E8EDFF"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              className={styles.circleProgress}
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40}`}
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
            <span className={styles.statLabel}>Used</span>
            <span className={`${styles.statValue} ${styles.usedValue}`}>{usedLeaves}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Total</span>
            <span className={`${styles.statValue} ${styles.totalValue}`}>{totalLeaves}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveCard;