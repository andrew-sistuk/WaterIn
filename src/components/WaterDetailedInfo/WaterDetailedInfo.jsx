import css from './WaterDetailedInfo.module.css';
import MonthInfo from '../MonthInfo/MonthInfo';
import UserPanel from '../UserPanel/UserPanel.jsx';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchDates } from '../../redux/dates/operations';

const WaterDetailedInfo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDates());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <UserPanel />
      <div className={css.component}>Component</div>
      <MonthInfo />
    </div>
  );
};

export default WaterDetailedInfo;
