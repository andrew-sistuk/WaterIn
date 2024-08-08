import css from './Calendar.module.css';
import CalendarItem from '../CalendarItem/CalendarItem';

const Calendar = ({ monthDays }) => {
  return (
    <ul className={css.list}>
      {monthDays.map((elem, i) => (
        <CalendarItem elem={elem} key={i} />
      ))}
    </ul>
  );
};

export default Calendar;
