import styles from './Logo.module.css';

export default function Logo() {
  return (
    <div className={styles.logoContainer}>
      <a className={styles.logo} href="/">
        AquaTrack
      </a>
    </div>
  );
}
