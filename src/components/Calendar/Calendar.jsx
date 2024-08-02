import css from './Calendar.module.css';
import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import createMonth from '../../utils/createMonth';

const test = '40%';

const translations = {
  uk: 'Місяць',
  en: 'Month',
  pl: 'Miesiąc',
  de: 'Monat',
  ['zh-CN']: '月份',
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  // const [locale, setLocale] = useState('uk');
  const locale = 'uk';

  const monthData = createMonth({ date: currentDate, locale });
  const monthDays = monthData.createMonthDays();
  const { monthName, year } = monthData;

  const handleClickBack = () => {
    const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    setCurrentDate(prevMonthDate);
  };

  const handleClickForward = () => {
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    setCurrentDate(nextMonthDate);
  };

  const today = new Date();
  const isToday = day => {
    return (
      day.year === today.getFullYear() &&
      day.monthIndex === today.getMonth() &&
      day.dayNumber === today.getDate()
    );
  };

  const capitalizeFirstLetter = string => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // const handleLocaleChange = newLocale => {
  //   setLocale(newLocale);
  // };

  return (
    <div className={css.container}>
      <div className={css.monthContainer}>
        <h2 className={css.title}>{translations[locale]}</h2>
        <div className={css.monthBox}>
          <div className={css.switchMonth}>
            <button onClick={handleClickBack} className={css.arrowButton}>
              <IoIosArrowBack className={css.reactIcon} />
            </button>
            <p className={css.text}>
              {capitalizeFirstLetter(monthName)}, {year}
            </p>
            <button onClick={handleClickForward} className={css.arrowButton}>
              <IoIosArrowForward className={css.reactIcon} />
            </button>
          </div>
          <button className={css.scheduleButton}>
            <svg width={20} height={20} className={css.icon}>
              <use href="/src/img/icons/sprite.svg#icon1-calendar"></use>
            </svg>
          </button>
        </div>
      </div>
      <ul className={css.list}>
        {monthDays.map((elem, i) => (
          <li className={css.element} key={i}>
            <button
              className={`${css.day} ${isToday(elem) ? css.currentDay : ''} ${
                test === '100%' ? css.full : ''
              } `}
            >
              {elem.dayNumber}
            </button>
            <span className={css.span}>{test}</span>
          </li>
        ))}
      </ul>

      {/* <div>
        <button onClick={() => handleLocaleChange('uk')}>Укаїнська</button>
        <button onClick={() => handleLocaleChange('en')}>English</button>
        <button onClick={() => handleLocaleChange('pl')}>Polski</button>
        <button onClick={() => handleLocaleChange('de')}>Deutsch</button>
      </div> */}
    </div>
  );
};

export default Calendar;
