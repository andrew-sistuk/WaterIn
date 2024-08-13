import Logo from '../Logo/Logo';
import styles from './WelcomeSectionContainer.module.css';
import Languages from '../Languages/Languages';

export default function WelcomeSectionContainer({ children }) {
  return (
    <div className={styles.welcomeSection}>
      <div className={styles.logoLangWrapper}>
        <Logo />

        <Languages />
      </div>

      {children}
    </div>
  );
}
