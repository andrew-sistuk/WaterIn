import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import css from './CalendarPagination.module.css';
import Icon from '../Icon/Icon';

const CalendarPagination = ({
  locale,
  handleClickBack,
  handleClickForward,
  monthData,
  toggleComponents,
}) => {
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
        <button onClick={() => toggleComponents()} className={css.scheduleButton}>
          <Icon width={20} height={20} />
        </button>
      </div>
    </div>
  );
};

export default CalendarPagination;
