import { useDispatch, useSelector } from 'react-redux';
import { fetchDatesId } from '../../redux/day/operations';

import css from './CalendarItem.module.css';
import { selectItems } from '../../redux/dates/selectors';

const CalendarItem = ({ elem }) => {
  const dispatch = useDispatch();

  const parcentDate = useSelector(selectItems);

  const handleClickDay = value => {
    const date = new Date(value.times).getTime() + 43200000;
    dispatch(fetchDatesId(date));
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
    const yearCalendar = date.getFullYear();
    const monthCalendar = date.getMonth() + 1;
    const dayCalendar = date.getDate();

    const entry = parcentDate.find(item => {
      const createdAtDate = new Date(item.date);

      return (
        createdAtDate.getFullYear() === yearCalendar &&
        createdAtDate.getMonth() + 1 === monthCalendar &&
        createdAtDate.getDate() === dayCalendar
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
