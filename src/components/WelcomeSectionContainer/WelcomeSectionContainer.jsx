import Logo from '../Logo/Logo';
import styles from './WelcomeSectionContainer.module.css';

export default function WelcomeSectionContainer({ children }) {
  return (
    <div className={styles.welcomeSection}>
      <Logo />
      {children}
    </div>
  );
}
