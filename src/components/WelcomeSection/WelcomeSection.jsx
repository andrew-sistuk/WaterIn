import Navigation from '../Navigation/Navigation';
import WelcomeSectionContainer from '../WelcomeSectionContainer/WelcomeSectionContainer';
import styles from './WelcomeSection.module.css';
import { useTranslation } from 'react-i18next';

export default function WelcomeSection() {
  const { t } = useTranslation();

  return (
    <WelcomeSectionContainer>
      <div className={styles.welcome}>
        <div className={styles.titleContainer}>
          <h2 className={styles.subtitle}>{t('welcomeSection.mainText')}</h2>
          <h1 className={styles.title}>{t('welcomeSection.title')}</h1>
        </div>
        <Navigation />
      </div>
    </WelcomeSectionContainer>
  );
}
