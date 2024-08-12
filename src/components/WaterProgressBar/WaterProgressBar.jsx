import { selectItemsDay } from '../../redux/changeDay/changeDay';
import createMonth from '../../utils/createMonth';
import css from './WaterProgressBar.module.css';
import { useSelector } from 'react-redux';
import isToday from '../../utils/isToday';
import { selectUser } from '../../redux/auth/selectors';
import { selectItemsDay as itemDay } from '../../redux/day/selectors';

const WaterProgressBar = () => {
  // const parcentDate = useSelector(selectItems);

  // const currentDate = useSelector(selectItemsDay);

  // const getParcentForDate = (date, type = 'parcent') => {
  //   const yearCalendar = date.getFullYear();
  //   const monthCalendar = date.getMonth() + 1;
  //   const dayCalendar = date.getDate();

  //   const entry = parcentDate.find(item => {
  //     const createdAtDate = new Date(item.date);

  //     return (
  //       createdAtDate.getFullYear() === yearCalendar &&
  //       createdAtDate.getMonth() + 1 === monthCalendar &&
  //       createdAtDate.getDate() === dayCalendar
  //     );
  //   });

  //   if (entry) {
  //     if (type === 'parcent') {
  //       return `${entry.percent}%`;
  //     } else if (type === 'id') {
  //       return entry.id;
  //     }
  //   }

  //   return type === 'parcent' ? '0%' : null;
  // };

  // const dailyNorma = 1.5;
  // const totalDrink = 1.48;

  const dailyNorma = useSelector(selectUser).waterRate;
  const totalDrink = useSelector(itemDay).reduce(
    (accumulator, item) => accumulator + item.volume,
    0
  );

  let percentValueDrink = Math.round((totalDrink / dailyNorma) * 100);

  const toDayMilisekond = new Date().getTime();
  const day1 = useSelector(selectItemsDay);
  const month = createMonth({ date: new Date(day1) });

  const fullDay = `${new Date(day1).getDate()}, ${month.monthName}`;

  // function getCurrentDay(currentDate) {
  //   const toDay = new Date();
  //   const toDayMilisekond = toDay.getTime();

  //   const isToday = day => {
  //     return (
  //       new Date(day).getFullYear() === toDay.getFullYear() &&
  //       new Date(day).getMonth() === toDay.getMonth() &&
  //       new Date(day).getDate() === toDay.getDate()
  //     );
  //   };

  //   const fullDay = `${new Date(currentDate).getDate()}.${
  //     new Date(currentDate).getMonth() + 1
  //   }.${new Date(currentDate).getFullYear()}`;

  //   return isToday(toDayMilisekond) === isToday(currentDate) ? 'Today' : fullDay;
  // }

  function getPercentValueDrink(value) {
    let percentValue = value;

    if (percentValue > 100) {
      percentValue = 100;

      return percentValue;
    }

    return percentValue;
  }

  function fixWidthProgressBar(value) {
    if (value > 100) {
      value = 100;

      return value;
    }

    if (value < 0) {
      value = 0;

      return value;
    }

    return value;
  }

  function removeDisplaySignatureEmptyValue(value) {
    let display = 'block';
    if (value < 15) {
      display = 'none';

      return display;
    }

    return display;
  }

  function removeDisplaySignatureMiddleValue(value) {
    let display = 'block';
    if (value >= 36 && value < 64) {
      display = 'none';

      return display;
    }

    return display;
  }

  function removeDisplaySignatureFullValue(value) {
    let display = 'block';
    if (value > 80) {
      display = 'none';

      return display;
    }

    return display;
  }

  return (
    <div className={css.wrapper}>
      <p className={css.title}>{isToday(toDayMilisekond) === isToday(day1) ? 'Today' : fullDay}</p>
      <div className={css.barWrapper}>
        <div className={css.mainBar}></div>
        <div
          className={css.progressBar}
          style={{
            width: `${fixWidthProgressBar(getPercentValueDrink(percentValueDrink))}%`,
          }}
        ></div>
        <div
          className={css.currentPoint}
          style={{
            left: `${fixWidthProgressBar(getPercentValueDrink(percentValueDrink))}%`,
          }}
        ></div>

        <div className={css.signature}>
          <p
            className={css.emptyValue}
            style={{
              display: `${removeDisplaySignatureEmptyValue(
                getPercentValueDrink(percentValueDrink)
              )}`,
            }}
          >
            0%
          </p>
          <p
            className={css.middleValue}
            style={{
              display: `${removeDisplaySignatureMiddleValue(
                getPercentValueDrink(percentValueDrink)
              )}`,
            }}
          >
            50%
          </p>
          <p
            className={css.fullValue}
            style={{
              display: `${removeDisplaySignatureFullValue(
                getPercentValueDrink(percentValueDrink)
              )}`,
            }}
          >
            100%
          </p>
          <p
            className={css.currentValue}
            style={{
              left: `${
                getPercentValueDrink(percentValueDrink) < 96
                  ? getPercentValueDrink(percentValueDrink)
                  : 96
              }%`,
            }}
          >
            {getPercentValueDrink(percentValueDrink)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default WaterProgressBar;
