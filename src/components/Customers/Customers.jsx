import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import photo1 from '../../assets/img/Advantages/image1.jpg';
import photo2 from '../../assets/img/Advantages/image2.jpg';
import photo3 from '../../assets/img/Advantages/image3.jpg';

import styles from './Customers.module.css';

export default function Customers() {
  const { t } = useTranslation();

  const [userPhotos, setUserPhotos] = useState([]);
  const [userAmount, setUserAmount] = useState(0);

  const convertUsersCount = count => {
    switch (true) {
      case count < 1000:
        return count;
      case count >= 1000 && count < 1000000:
        return `${(count / 1000).toFixed(1)}K`;
      case count >= 1000000:
        return `${(count / 1000000).toFixed(1)}M`;
    }
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('https://waterin-server.onrender.com/users/count');
        setUserAmount(response.data.data.count);
        setUserPhotos(response.data.data.photos);
      } catch (error) {
        // console.error('Error fetching photos:', error);
        setUserPhotos([photo1, photo2, photo3]);
      }
    };

    fetchPhotos();
    const intervalId = setInterval(fetchPhotos, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.customersBox}>
      {userAmount && (
        <span className={styles.customersAmount}>+{convertUsersCount(userAmount)}</span>
      )}
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
        {t('advantagesSection.our')}{' '}
        <span className={styles.customersSpan}>{t('advantagesSection.happy')}</span>{' '}
        {t('advantagesSection.customers')}
      </p>
    </div>
  );
}
