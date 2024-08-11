import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Calendar from '../../assets/icons/calendar.svg?react';
import CalendarHidden from '../../assets/icons/calendar-hidden.svg?react';

import css from './CalendarPagination.module.css';

const CalendarPagination = ({
  locale,
  handleClickBack,
  handleClickForward,
  monthData,
  toggleComponents,
}) => {
  const [iconHidden, setIconHidden] = useState(false);

  const translations = {
    uk: 'Місяць',
    en: 'Month',
    pl: 'Miesiąc',
    de: 'Monat',
    ['zh-CN']: '月份',
  };

  const capitalizeFirstLetter = string => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const { monthName, year } = monthData;

  const handleToggle = () => {
    setIconHidden(!iconHidden);
    toggleComponents();
  };

  return (
    <div className={css.monthContainer}>
      <h2 className={css.title}>{translations[locale]}</h2>
      <div className={css.monthBox}>
        <div className={css.switchMonth}>
          <button onClick={handleClickBack} className={css.arrowButton}>
            <IoIosArrowBack className={css.reactIcon} />
          </button>
          <p className={css.paginationText}>
            {capitalizeFirstLetter(monthName)}, {year}
          </p>
          <button onClick={handleClickForward} className={css.arrowButton}>
            <IoIosArrowForward className={css.reactIcon} />
          </button>
        </div>
      </div>
      <button onClick={handleToggle} className={css.scheduleButton}>
        {iconHidden ? <CalendarHidden /> : <Calendar />}
      </button>
    </div>
  );
};

export default CalendarPagination;
