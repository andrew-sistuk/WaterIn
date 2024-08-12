import clsx from 'clsx';
import Logo from '../Logo/Logo';
import styles from './WelcomeSectionContainer.module.css';

export default function WelcomeSectionContainer({isMobile, children }) {
  return (
    <div className={clsx(styles.welcomeSection, isMobile && styles.isMobile)}>
      <Logo />
      {children}
    </div>
  );
}
