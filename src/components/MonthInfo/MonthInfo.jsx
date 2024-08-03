import { useState } from 'react';

import createMonth from '../../utils/createMonth';

import css from './MonthInfo.module.css';
import CalendarPagination from '../CalendarPagination/CalendarPagination';
import Calendar from '../Calendar/Calendar';

const MonthInfo = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  // const [locale, setLocale] = useState('uk');
  const locale = 'en';

  const monthData = createMonth({ date: currentDate, locale });
  const monthDays = monthData.createMonthDays();

  const handleClickBack = () => {
    const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    setCurrentDate(prevMonthDate);
  };

  const handleClickForward = () => {
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    setCurrentDate(nextMonthDate);
  };

  return (
    <div className={css.container}>
      <h2 className={css.visuallyHidden}>Month info</h2>
      <CalendarPagination
        monthData={monthData}
        locale={locale}
        handleClickBack={handleClickBack}
        handleClickForward={handleClickForward}
      />
      <Calendar monthDays={monthDays} />
    </div>
  );
};

export default MonthInfo;
