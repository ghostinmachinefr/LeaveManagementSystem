import Image from 'next/image';
import styles from './LeaveCard.module.css';

const LeaveCard = ({ title, remainingLeaves, usedLeaves, totalLeaves, iconSrc, altText }) => {
  const percentage = (usedLeaves / totalLeaves) * 100;
  
  return (
    <div className={styles.card}>
        <div className={styles.cardHeader}>
        <Image 
          src={iconSrc}
          alt={altText}
          width={28}
          height={28}
          className={styles.cardIcon}
        />
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      
      <div className={styles.cardStats}>
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
        
        <div className={styles.progressCircle}>
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle
              cx="30"
              cy="30"
              r="24"
              fill="none"
              stroke="#e6e6e6"
              strokeWidth="6"
            />
            <circle
              cx="30"
              cy="30"
              r="24"
              fill="none"
              stroke="#4CAF50"
              strokeWidth="6"
              strokeDasharray={`${2 * Math.PI * 24}`}
              strokeDashoffset={`${2 * Math.PI * 24 * (1 - percentage / 100)}`}
              transform="rotate(-90 30 30)"
            />
            <text
              x="30"
              y="30"
              textAnchor="middle"
              dominantBaseline="middle"
              className={styles.progressText}
            >
              {Math.round(percentage)}%
            </text>
          </svg>
        </div>
      </div>
      </div>
  );
};

export default LeaveCard;