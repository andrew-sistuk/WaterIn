import Customers from '../Customers/Customers';
import styles from './AdvantagesSection.module.css';
import img1x from '../../images/Advantages/mobile_home_img.jpg';
import img2x from '../../images/Advantages/mobile_home_img_2х.jpg';

export default function AdvantagesSection() {
  return (
    <section className={styles.AdvantagesSection}>
      <picture>
        <source srcSet={`${img1x} 1x, ${img2x} 2x`} type="image/jpeg" />
        <img src={img1x} alt="girl with a bottle of water" />
      </picture>
      <div className={styles.CustomersWripper}>
        <Customers />
      </div>
      <ul className={styles.advantagesList}>
        <li className={styles.advHabit}>
          <p>Habit drive</p>
        </li>
        <li>
          <p className={styles.advStatistic}>View statistics</p>
        </li>
        <li>
          <p className={styles.advRate}>Personal rate setting</p>
        </li>
      </ul>
    </section>
  );
}
