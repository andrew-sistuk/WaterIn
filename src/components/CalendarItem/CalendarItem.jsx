import { useDispatch } from 'react-redux';
import { fetchDatesId } from '../../redux/dates/operations';

import css from './CalendarItem.module.css';

const CalendarItem = ({ elem, parcentDate }) => {
  const dispatch = useDispatch();

  const handleClickDay = value => {
    const date = new Date(value.times).getTime();
    dispatch(fetchDatesId(date));

    console.log('Запит на бек', date);
  };

  const today = new Date();

  const isToday = day => {
    return (
      day.year === today.getFullYear() &&
      day.monthIndex === today.getMonth() &&
      day.dayNumber === today.getDate()
    );
  };

  const getParcentForDate = (date, type = 'parcent') => {
    const yearCalendar = date.getUTCFullYear();
    const monthCalendar = date.getUTCMonth() + 1;
    const dayCalendar = date.getUTCDate();

    const entry = parcentDate.find(item => {
      const createdAtDate = new Date(item.date);

      return (
        createdAtDate.getUTCFullYear() === yearCalendar &&
        createdAtDate.getUTCMonth() + 1 === monthCalendar &&
        createdAtDate.getUTCDate() === dayCalendar
      );
    });

    if (entry) {
      if (type === 'parcent') {
        return `${entry.percent}%`;
      } else if (type === 'id') {
        return entry.id;
      }
    }

    return type === 'parcent' ? '0%' : null;
  };

  return (
    <li className={css.element}>
      <button className={css.componentButton} onClick={() => handleClickDay(elem)}>
        <div
          className={`${css.day} ${isToday(elem) ? css.currentDay : ''} ${
            getParcentForDate(new Date(elem.times)) === '100%' ? css.full : ''
          } `}
        >
          {elem.dayNumber}
        </div>

        <span className={css.span}>{getParcentForDate(new Date(elem.times))}</span>
      </button>
    </li>
  );
};

export default CalendarItem;
