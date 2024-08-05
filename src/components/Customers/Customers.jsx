import { useState, useEffect } from 'react';
import axios from 'axios';

// import photo1 from '../../assets/img/Advantages/photo1.png';
// import photo2 from '../../assets/img/Advantages/photo2.png';
// import photo3 from '../../assets/img/Advantages/photo3.png';

import styles from './Customers.module.css';

export default function Customers() {
  // const photos = [{ src: photo1 }, { src: photo2 }, { src: photo3 }];
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
      </div>
      <p className={styles.customersText}>
        Our <span className={styles.customersSpan}>{userAmount} happy</span> customers
      </p>
    </div>
  );
}
