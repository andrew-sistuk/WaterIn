import styles from './HomePage.module.css';

import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';

export default function HomePage() {
  return (
    // <section className="container">
      <div className={styles.container}>
        <WelcomeSection />
        <AdvantagesSection />
      </div>
    //  </section>
  );
}
