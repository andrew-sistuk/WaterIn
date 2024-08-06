import css from './Calendar.module.css';
import CalendarItem from '../CalendarItem/CalendarItem';

import { selectItems } from '../../redux/dates/selectors';
import { useSelector } from 'react-redux';
import { selectIsToken } from '../../redux/auth/selectors';

const Calendar = ({ monthDays }) => {
  const token = useSelector(selectIsToken);
  console.log('====================================');
  console.log('token', token);
  console.log('====================================');
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
