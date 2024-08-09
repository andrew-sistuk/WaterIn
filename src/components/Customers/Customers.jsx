import { useState, useEffect } from 'react';
import axios from 'axios';
import photo1 from '../../assets/img/Advantages/photo1@2x.jpg';
import photo2 from '../../assets/img/Advantages/photo2@2x.jpg';
import photo3 from '../../assets/img/Advantages/photo3@2x.jpg';

import styles from './Customers.module.css';

export default function Customers() {
  const [userPhotos, setUserPhotos] = useState([]);
  const [userAmount, setUserAmount] = useState(0);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('https://waterin-server.onrender.com/users/count');
        setUserAmount(response.data.data.count);
        setUserPhotos(response.data.data.photos);
      } catch (error) {
        console.error('Error fetching photos:', error);
        setUserPhotos([photo1, photo2, photo3]);
      }
    };

    fetchPhotos();
    const intervalId = setInterval(fetchPhotos, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.customersBox}>
      <div className={styles.customersListContainer}>
        <ul className={styles.customersList}>
          {userPhotos.map((photo, idx) => (
            <li key={idx} className={styles.customersItem}>
              <img src={photo} className={styles.customersImg} />
            </li>
          ))}
        </ul>
        {userAmount > 0 && <div className={styles.customersAmount}>+{userAmount}</div>}
      </div>
      <p className={styles.customersText}>
        Our <span className={styles.customersSpan}>happy</span> customers
      </p>
    </div>
  );
}
