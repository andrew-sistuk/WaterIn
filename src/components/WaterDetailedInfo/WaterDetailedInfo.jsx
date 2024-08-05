import UserPanel from '../UserPanel/UserPanel';
import DailyInfo from '../DailyInfo/DailyInfo';
import MonthInfo from '../MonthInfo/MonthInfo';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchDates } from '../../redux/dates/operations';

import css from './WaterDetailedInfo.module.css';

const WaterDetailedInfo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDates());
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </div>
  );
};

export default WaterDetailedInfo;
