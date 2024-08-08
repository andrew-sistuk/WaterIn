import css from './ChooseDate.module.css';

import { useSelector } from 'react-redux';

import { selectItemsDay } from '../../redux/changeDay/changeDay';

const ChooseDate = () => {
  const toDay = new Date();
  const toDayMilisekond = toDay.getTime();

  const day1 = useSelector(selectItemsDay);

  const isToday = day => {
    return (
      new Date(day).getFullYear() === toDay.getFullYear() &&
      new Date(day).getMonth() === toDay.getMonth() &&
      new Date(day).getDate() === toDay.getDate()
    );
  };

  const fullDay = `${new Date(day1).getDate()}.${new Date(day1).getMonth() + 1}.${new Date(
    day1
  ).getFullYear()}`;

  return (
    <>
      <p className={css.day}>{isToday(toDayMilisekond) === isToday(day1) ? 'Today' : fullDay}</p>
    </>
  );
};
export default ChooseDate;
