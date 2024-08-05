import css from './WaterDetailedInfo.module.css';
import MonthInfo from '../MonthInfo/MonthInfo';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchDates } from '../../redux/dates/operations';

const WaterDetailedInfo = () => {
  const dispatch = useDispatch();

  const dateNow = new Date().getTime();

  useEffect(() => {
    try {
      dispatch(fetchDates(dateNow));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <div className={css.container}>
      <div className={css.component}>Component</div>
      <MonthInfo />
    </div>
  );
};

export default WaterDetailedInfo;
