import clsx from 'clsx';
import Logo from '../Logo/Logo';
import styles from './WelcomeSectionContainer.module.css';
import Languages from '../Languages/Languages';

export default function WelcomeSectionContainer({ isMobile, children }) {
  return (
    <div className={clsx(styles.welcomeSection, isMobile && styles.isMobile)}>
      {/* // <Logo /> */}
      {/* <div className={styles.welcomeSection}> */}
      {/* <div className={styles.logoLangWrapper}> */}
      {/* <Logo /> */}
      {/* <Languages />
      </div> */}
      {children}
    </div>
  );
}
