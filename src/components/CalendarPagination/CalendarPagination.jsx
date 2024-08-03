import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import css from './CalendarPagination.module.css';

const CalendarPagination = ({ locale, handleClickBack, handleClickForward, monthData }) => {
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
        <button className={css.scheduleButton}>
          <svg className={css.iconPagination}>
            <use href="/src/img/icons/sprite.svg#icon2-calendar"></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CalendarPagination;
