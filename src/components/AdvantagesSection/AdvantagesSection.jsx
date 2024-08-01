import styles from './AdvantagesSection.module.css';
import img from './img/mobile_home_img.jpg';
import photo1 from './img/photo1.png';
import photo2 from './img/photo2.png';
import photo3 from './img/photo3.png';

export default function AdvantagesSection() {
  const photos = [{ src: photo1 }, { src: photo2 }, { src: photo3 }];
  return (
    <section className={styles.AdvantagesSection}>
      <picture>
        <source srcSet={img} type="image/jpeg" />
        <img src={img} alt="girl with a bottle of water" />
      </picture>
      <div className={styles.customersBox}>
        <ul className={styles.customersList}>
          {photos.map((photo, idx) => (
            <li key={idx}>
              <img src={photo.src} />
            </li>
          ))}
        </ul>
        <p className={styles.customersText}>
          Our <span className={styles.customersSpan}>happy</span> customers
        </p>
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
