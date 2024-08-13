import { useDispatch, useSelector } from 'react-redux';
import { fetchDatesId } from '../../redux/day/operations';
import isToday from '../../utils/isToday';

import css from './CalendarItem.module.css';
import { selectItems } from '../../redux/dates/selectors';

import { addDay } from '../../redux/changeDay/changeDay';

const CalendarItem = ({ elem }) => {
  const dispatch = useDispatch();

  const parcentDate = useSelector(selectItems);

  const handleClickDay = value => {
    const date = new Date(value.times).getTime() + 43200000;

    dispatch(fetchDatesId(date));
    dispatch(addDay(value.times));
  };

  if (isToday(elem.times)) {
    dispatch(addDay(elem.times));
  }

  const getParcentForDate = date => {
    const yearCalendar = date.getFullYear();
    const monthCalendar = date.getMonth() + 1;
    const dayCalendar = date.getDate();

    const entry = parcentDate.find(item => {
      return (
        new Date(item.date).getFullYear() === yearCalendar &&
        new Date(item.date).getMonth() + 1 === monthCalendar &&
        new Date(item.date).getDate() === dayCalendar
      );
    });

    return entry ? entry.percent : 0;
  };

  return (
    <li className={css.element}>
      <button
        className={css.componentButton}
        onClick={() => {
          handleClickDay(elem);
        }}
      >
        <div
          className={`${css.day} ${isToday(elem.times) ? css.currentDay : ''} ${
            getParcentForDate(new Date(elem.times)) === 100 ? css.full : ''
          } `}
        >
          {elem.dayNumber}
        </div>

        <span className={css.span}>{`${getParcentForDate(new Date(elem.times))}%`}</span>
      </button>
    </li>
  );
};

export default CalendarItem;
