import { useState, useEffect } from 'react';
import axios from 'axios';

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
        <div className={styles.customersAmount}>+{userAmount}</div>
      </div>
      <p className={styles.customersText}>
        Our <span className={styles.customersSpan}>happy</span> customers
      </p>
    </div>
  );
}
