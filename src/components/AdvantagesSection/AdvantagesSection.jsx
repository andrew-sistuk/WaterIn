import Customers from '../Customers/Customers';
import { useTranslation } from 'react-i18next';
import styles from './AdvantagesSection.module.css';
import img1x from '../../assets/img/Advantages/mobile_home_img.webp';
import img2x from '../../assets/img/Advantages/mobile_home_img_2х.webp';
import img1x_768 from '../../assets/img/Advantages/tablet_home_img.webp';
import img2x_768 from '../../assets/img/Advantages/tablet_home_img_2х.webp';
import img1x_1440 from '../../assets/img/Advantages/dekstop_home_img.webp';
import img2x_1440 from '../../assets/img/Advantages/dekstop_home_img_2х.webp';

export default function AdvantagesSection() {
  const { t } = useTranslation();

  return (
    <section className={styles.advantagesSection}>
      <picture>
        <source
          srcSet={`${img1x_1440} 1x, ${img2x_1440} 2x`}
          media="(min-width: 1440px)"
          type="image/jpeg"
        />
        <source
          srcSet={`${img1x_768} 1x, ${img2x_768} 2x`}
          media="(min-width: 768px)"
          type="image/jpeg"
        />
        <source srcSet={`${img1x} 1x, ${img2x} 2x`} type="image/jpeg" />
        <img src={img1x} alt="girl with a bottle of water" className={styles.image} />
      </picture>
      <div className={styles.CustomersWripper}>
        <Customers />
      </div>
      <ul className={styles.advantagesList}>
        <li className={styles.advHabit}>
          <div className={styles.dot}></div>
          <p>{t('advantagesSection.habit')}</p>
        </li>
        <li>
          <p className={styles.advStatistic}>{t('advantagesSection.statistics')}</p>
        </li>
        <li>
          <p className={styles.advRate}>{t('advantagesSection.setting')}</p>
        </li>
      </ul>
    </section>
  );
}
