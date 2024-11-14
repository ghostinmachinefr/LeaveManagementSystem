import styles from './LeaveCardsGrid.module.css';
import LeaveCard from './LeaveCard';

const LeaveCardsGrid = ({ leaveStats }) => {
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