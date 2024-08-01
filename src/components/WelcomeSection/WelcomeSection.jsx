import Logo from '../Logo/Logo';
import styles from './WelcomeSection.module.css';

export default function WelcomeSection() {
  return (
    <section className={styles.welcomeSection}>
      <Logo />
      <div className={styles.container}>
        <h2 className={styles.subtitle}>Record daily water intake and track</h2>
        <h1 className={styles.title}>Water consumption tracker</h1>
        <ul className={styles.btnList}>
          <li className={styles.btnTryItem}>
            <a href="#" className={styles.tryLink}>
              Try tracker{' '}
            </a>
          </li>
          <li className={styles.btnSignInItem}>
            <a href="#" className={styles.signInLink}>
              Sign In
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
