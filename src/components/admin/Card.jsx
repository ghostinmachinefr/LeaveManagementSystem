import Image from 'next/image';
import styles from '../../styles/admin/index.module.css';

const Card = ({ title, count, iconSrc, altText }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <p className={styles.cardCount}>{count}</p>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <Image 
        src={iconSrc}
        alt={altText}
        width={28}
        height={28}
        className={styles.cardIcon}
      />
    </div>
  );
};

export default Card;