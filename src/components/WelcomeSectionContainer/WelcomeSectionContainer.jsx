import Logo from '../Logo/Logo';
import styles from './WelcomeSectionContainer.module.css';
import Languages from '../Languages/Languages';
import { useEffect, useState } from 'react';

export default function WelcomeSectionContainer({ children }) {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  function changeViewHeight() {
    const h1 = document.querySelector('h1');
    const className = styles.welcomeSection;
    const welcomeSectionContainerEl = document.querySelector(`.${className}`);

    const mobile = window.matchMedia('(max-width: 768px)');
    const tablet = window.matchMedia('(min-width: 768px) and (max-width: 1439px)');
    const desktop = window.matchMedia('(min-width: 1439px)');

    if (h1) {
      if (mobile.matches) {
        welcomeSectionContainerEl.style.height = '412px';
      } else if (tablet.matches) {
        welcomeSectionContainerEl.style.height = '500px';
      } else if (desktop.matches) {
        welcomeSectionContainerEl.style.height = '736px';
      }
    } else {
      if (mobile.matches) {
        welcomeSectionContainerEl.style.height = '720px';
      } else if (tablet.matches) {
        welcomeSectionContainerEl.style.height = '960px';
      } else if (desktop.matches) {
        welcomeSectionContainerEl.style.height = '736px';
      }
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    changeViewHeight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewportWidth]);

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
