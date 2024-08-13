import { selectItemsDay } from '../../redux/changeDay/changeDay';
import createMonth from '../../utils/createMonth';
import css from './WaterProgressBar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import isToday from '../../utils/isToday';
import { selectUser } from '../../redux/auth/selectors';
import { selectItemsDay as itemDay } from '../../redux/day/selectors';
import { useEffect } from 'react';
import { addDay } from '../../redux/changeDay/changeDay';

const WaterProgressBar = () => {
  const dispatch = useDispatch();
  const dailyNorma = useSelector(selectUser).waterRate;
  const totalDrink = useSelector(itemDay).reduce(
    (accumulator, item) => accumulator + item.volume,
    0
  );

  useEffect(() => {
    dispatch(addDay(new Date().getTime()));
  }, [dispatch]);
  const percentValuedrink = Math.round((totalDrink / dailyNorma) * 100);

  function fixWidthProgressBar(value) {
    if (value > 100) {
      value = 100;
    }

    if (value < 0) {
      value = 0;
    }

    return value;
  }

  function removeHiddenSignatureEmptyValue(value) {
    return value < 15 ? 'transparent' : 'inherit';
  }

  function removeHiddenSignatureMiddleValue(value) {
    return value >= 36 && value < 60 ? 'transparent' : 'inherit';
  }

  function removeHiddenSignatureFullValue(value) {
    return value > 80 ? 'transparent' : 'inherit';
  }

  const toDayMilisekond = new Date().getTime();
  const day1 = useSelector(selectItemsDay);
  const month = createMonth({ date: new Date(day1) });

  const fullDay = `${new Date(day1).getDate()}, ${month.monthName}`;

  return (
    <div className={css.wrapper}>
      <p className={css.title}>{isToday(toDayMilisekond) === isToday(day1) ? 'Today' : fullDay}</p>
      <div className={css.barWrapper}>
        <div className={css.mainBar}></div>
        <div
          className={css.progressBar}
          style={{
            width: `${fixWidthProgressBar(percentValuedrink)}%`,
          }}
        ></div>
        <div
          className={css.currentPoint}
          style={{
            left: `${fixWidthProgressBar(percentValuedrink)}%`,
          }}
        ></div>

        <div className={css.signature}>
          <p
            style={{
              color: `${removeHiddenSignatureEmptyValue(percentValuedrink)}`,
            }}
          >
            0%
          </p>
          <p
            style={{
              color: `${removeHiddenSignatureMiddleValue(percentValuedrink)}`,
            }}
          >
            50%
          </p>
          <p
            style={{
              color: `${removeHiddenSignatureFullValue(percentValuedrink)}`,
            }}
          >
            100%
          </p>
          <p
            className={css.current}
            style={{
              left: `${fixWidthProgressBar(percentValuedrink)}%`,
            }}
          >
            {fixWidthProgressBar(percentValuedrink)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default WaterProgressBar;
