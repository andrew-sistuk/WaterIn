import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.btnList}>
      <NavLink to="/signup" className={styles.btnTryItem}>
        Try tracker
      </NavLink>
      <NavLink to="/signin" className={styles.btnSignInItem}>
        Sign In
      </NavLink>
    </nav>
  );
}
