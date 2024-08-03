import css from './CalendarItem.module.css';

////////////////////delete then//////////////////////////
const parcentDate = [
  {
    userId: 'user1',
    volume: 250,
    drinkTime: '08:00',
    createdAt: 1722632400000,
    updatedAt: 1719954000000,
    parcent: 50,
  },
  {
    userId: 'user2',
    volume: 300,
    drinkTime: '09:00',
    createdAt: 1722459600000,
    updatedAt: 1699123200000,
    parcent: 100,
  },
  {
    userId: 'user10',
    volume: 400,
    drinkTime: '17:00',
    createdAt: 1722536208932,
    updatedAt: 1699814400000,
    parcent: 70,
  },
  {
    userId: 'user11',
    volume: 400,
    drinkTime: '17:00',
    createdAt: 1722373200000,
    updatedAt: 1699814400000,
    parcent: 100,
  },

  {
    userId: 'user1',
    volume: 250,
    drinkTime: '08:00',
    createdAt: 1722286800000,
    updatedAt: 1719954000000,
    parcent: 20,
  },
  {
    userId: 'user2',
    volume: 300,
    drinkTime: '09:00',
    createdAt: 1722200400000,
    updatedAt: 1699123200000,
    parcent: 100,
  },
  {
    userId: 'user10',
    volume: 400,
    drinkTime: '17:00',
    createdAt: 1722114000000,
    updatedAt: 1699814400000,
    parcent: 70,
  },
  {
    userId: 'user11',
    volume: 400,
    drinkTime: '17:00',
    createdAt: 1722027600000,
    updatedAt: 1699814400000,
    parcent: 100,
  },
];

////////////////////////////////////////////////////////////

const CalendarItem = ({ elem }) => {
  const handleClickDay = value => {
    const date = new Date(value.times).getTime();
    console.log(date);
  };

  const today = new Date();
  const isToday = day => {
    return (
      day.year === today.getFullYear() &&
      day.monthIndex === today.getMonth() &&
      day.dayNumber === today.getDate()
    );
  };

  const getParcentForDate = date => {
    const yearCalendar = date.getUTCFullYear();
    const monthCalendar = date.getUTCMonth() + 1;
    const dayCalendar = date.getUTCDate();

    const entry = parcentDate.find(item => {
      const createdAtDate = new Date(item.createdAt);
      if (
        createdAtDate.getUTCFullYear() === yearCalendar &&
        createdAtDate.getUTCMonth() + 1 === monthCalendar &&
        createdAtDate.getUTCDate() === dayCalendar
      ) {
        return item.parcent;
      }
    });

    return entry ? `${entry.parcent}%` : '0%';
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
