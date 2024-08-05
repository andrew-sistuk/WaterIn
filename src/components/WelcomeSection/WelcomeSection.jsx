import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import styles from './WelcomeSection.module.css';

export default function WelcomeSection() {
  return (
    
    <div className={styles.welcomeSection}>
      <Logo />
      <div className={styles.titleContainer}>
        <h2 className={styles.subtitle}>Record daily water intake and track</h2>
        <h1 className={styles.title}>Water consumption tracker</h1>
      </div>
      <Navigation />
    </div>
    
  );
}
