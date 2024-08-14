import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import { useTranslation } from 'react-i18next';

export default function Navigation() {
  const { t } = useTranslation();
  return (
    <nav className={styles.btnList}>
      <NavLink to="/signup" className={styles.btnTryItem}>
        {t('welcomeSection.tryTracker')}
      </NavLink>
      <NavLink to="/signin" className={styles.btnSignInItem}>
        {t('welcomeSection.signIn')}
      </NavLink>
    </nav>
  );
}
