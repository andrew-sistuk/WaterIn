import photo1 from '../../images/Advantages/photo1.png';
import photo2 from '../../images/Advantages/photo2.png';
import photo3 from '../../images/Advantages/photo3.png';

import styles from './Customers.module.css';

export default function Customers() {
  const photos = [{ src: photo1 }, { src: photo2 }, { src: photo3 }];
  return (
    <div className={styles.customersBox}>
      <div className={styles.customersListContainer}>
        <ul className={styles.customersList}>
          {photos.map((photo, idx) => (
            <li key={idx} className={styles.customersItem}>
              <img src={photo.src} />
            </li>
          ))}
        </ul>
      </div>
      <p className={styles.customersText}>
        Our <span className={styles.customersSpan}>happy</span> customers
      </p>
    </div>
  );
}
