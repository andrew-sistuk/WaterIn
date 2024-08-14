import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Calendar from '../../assets/icons/calendar.svg?react';
import CalendarHidden from '../../assets/icons/calendar-hidden.svg?react';
import { useTranslation } from 'react-i18next';

import css from './CalendarPagination.module.css';

const CalendarPagination = ({
  handleClickBack,
  handleClickForward,
  monthData,
  toggleComponents,
}) => {
  const { t } = useTranslation();
  const [iconHidden, setIconHidden] = useState(false);

  const { monthName, year } = monthData;

  const handleToggle = () => {
    setIconHidden(!iconHidden);
    toggleComponents();
  };

  return (
    <div className={css.monthContainer}>
      <h2 className={css.title}>{iconHidden ? t('monthInfo.statistics') : t('monthInfo.mouth')}</h2>

      <div className={css.switchMonth}>
        <button onClick={handleClickBack} className={css.arrowButton}>
          <IoIosArrowBack className={css.reactIcon} />
        </button>
        <p className={css.paginationText}>
          {t(`ChooseDate.${monthName}`)}, {year}
        </p>
        <button onClick={handleClickForward} className={css.arrowButton}>
          <IoIosArrowForward className={css.reactIcon} />
        </button>
      </div>
      <button onClick={handleToggle} className={css.scheduleButton} data-tour="toggle-view-button">
        {iconHidden ? <Calendar /> : <CalendarHidden />}
      </button>
    </div>
  );
};

export default CalendarPagination;
