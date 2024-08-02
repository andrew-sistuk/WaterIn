import Customers from '../Customers/Customers';
import styles from './AdvantagesSection.module.css';
import img from '../../images/Advantages/mobile_home_img.jpg';

export default function AdvantagesSection() {
  return (
    <section className={styles.AdvantagesSection}>
      <picture>
        <source srcSet={img} type="image/jpeg" />
        <img src={img} alt="girl with a bottle of water" />
      </picture>
      <Customers />
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
