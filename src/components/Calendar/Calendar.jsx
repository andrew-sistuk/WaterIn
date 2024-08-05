import css from './Calendar.module.css';
import CalendarItem from '../CalendarItem/CalendarItem';

import { selectItems } from '../../redux/dates/selectors';
import { useSelector } from 'react-redux';

const Calendar = ({ monthDays }) => {
  const parcentDate = useSelector(selectItems);

  return (
    <ul className={css.list}>
      {monthDays.map((elem, i) => (
        <CalendarItem parcentDate={parcentDate} elem={elem} key={i} />
      ))}
    </ul>
  );
};

export default Calendar;
