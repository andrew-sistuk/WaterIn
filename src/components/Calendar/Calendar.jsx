import css from './Calendar.module.css';
import CalendarItem from '../CalendarItem/CalendarItem';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectItems } from '../../redux/dates/slice';

const Calendar = ({ monthDays }) => {
  const parcentDate = useSelector(selectItems);

  useEffect(() => {}, [parcentDate]);
  return (
    <ul className={css.list}>
      {monthDays.map((elem, i) => (
        <CalendarItem elem={elem} key={i} />
      ))}
    </ul>
  );
};

export default Calendar;
