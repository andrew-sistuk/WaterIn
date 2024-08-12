import { selectItemsDay } from '../../redux/changeDay/changeDay';
import createMonth from '../../utils/createMonth';
import css from './WaterProgressBar.module.css';
import { useSelector } from 'react-redux';
import isToday from '../../utils/isToday';
import { selectUser } from '../../redux/auth/selectors';
import { selectItemsDay as itemDay } from '../../redux/day/selectors';

const WaterProgressBar = () => {
  const dailyNorma = useSelector(selectUser).waterRate;
  const totalDrink = useSelector(itemDay).reduce(
    (accumulator, item) => accumulator + item.volume,
    0
  );

  const percentValuedrink = Math.floor((totalDrink / dailyNorma) * 100);

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

  function removeHiddenSignatureEmptyValue(value) {
    let hidden = 'inherit';
    if (value < 15) {
      hidden = 'transparent';

      return hidden;
    }

    return hidden;
  }

  function removeHiddenSignatureMiddleValue(value) {
    let hidden = 'inherit';
    if (value >= 36 && value < 60) {
      hidden = 'transparent';

      return hidden;
    }

    return hidden;
  }

  function removeHiddenSignatureFullValue(value) {
    let hidden = 'inherit';
    if (value > 80) {
      hidden = 'transparent';

      return hidden;
    }

    return hidden;
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
              left: `${percentValuedrink}%`,
            }}
          >
            {percentValuedrink}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default WaterProgressBar;
