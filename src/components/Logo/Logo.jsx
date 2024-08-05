import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

export default function Logo() {
  return (
    <div className={styles.logoContainer}>
      <Link to="/" className={styles.logo}>
        AquaTrack
      </Link>
    </div>
  );
}
