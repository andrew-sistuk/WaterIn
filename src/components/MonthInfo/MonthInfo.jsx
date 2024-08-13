import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import createMonth from '../../utils/createMonth';

import css from './MonthInfo.module.css';
import CalendarPagination from '../CalendarPagination/CalendarPagination';
import Calendar from '../Calendar/Calendar';
import Recharts from '../Recharts/Recharts';

import { fetchDates } from '../../redux/dates/operations';
import { toast } from 'react-toastify';
import { fetchDatesId } from '../../redux/day/operations';

const MonthInfo = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  // const [locale, setLocale] = useState('uk');
  const [rechartsComponent, setRechartsComponent] = useState(false);
  const locale = 'en';

  const dispatch = useDispatch();

  const toggleComponents = () => {
    setRechartsComponent(!rechartsComponent);
  };

  const monthData = createMonth({ date: currentDate, locale });
  const monthDays = monthData.createMonthDays();

  const handleClickBack = () => {
    const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    setCurrentDate(prevMonthDate);

    dispatch(fetchDates(prevMonthDate.getTime() + 43200000));
  };

  const handleClickForward = () => {
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    setCurrentDate(nextMonthDate);

    dispatch(fetchDates(nextMonthDate.getTime() + 43200000));
  };

  useEffect(() => {
    try {
      dispatch(fetchDates(currentDate.getTime() + 43200000));
      dispatch(fetchDatesId(currentDate.getTime() + 43200000));
    } catch (error) {
      toast(error);
      console.log(error);
    }
  }, [dispatch, currentDate]);

  return (
    <div>
      <h2 className={css.visuallyHidden}>Month info</h2>
      <CalendarPagination
        toggleComponents={toggleComponents}
        monthData={monthData}
        locale={locale}
        handleClickBack={handleClickBack}
        handleClickForward={handleClickForward}
      />

      {rechartsComponent ? <Recharts /> : <Calendar monthDays={monthDays} />}
    </div>
  );
};

export default MonthInfo;
