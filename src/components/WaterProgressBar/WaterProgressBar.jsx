import { selectItemsDay } from '../../redux/changeDay/changeDay';
import createMonth from '../../utils/createMonth';
import css from './WaterProgressBar.module.css';

import { useSelector, useDispatch } from 'react-redux';
import isToday from '../../utils/isToday';
import { selectUser } from '../../redux/auth/selectors';
import { selectItemsDay as itemDay } from '../../redux/day/selectors';
import { useEffect } from 'react';
import { addDay } from '../../redux/changeDay/changeDay';
import { useTranslation } from 'react-i18next';

const WaterProgressBar = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const dailyNorma = useSelector(selectUser).waterRate;
  const totalDrink = useSelector(itemDay).reduce(
    (accumulator, item) => accumulator + item.volume,
    0
  );

  useEffect(() => {
    dispatch(addDay(new Date().getTime()));
  }, [dispatch]);

  const percentValueDrink = Math.round((totalDrink / dailyNorma) * 100);

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
    }

    if (value < 0) {
      value = 0;
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

  const toDayMilisekond = new Date().getTime();
  const day1 = useSelector(selectItemsDay);
  const { monthName } = createMonth({ date: new Date(day1) });

  const fullDay = `${new Date(day1).getDate()}, ${t(`ChooseDate.${monthName}`)}`;

  return (
    <div className={css.wrapper} data-tour="progress-goal">
      <p className={css.title}>
        {isToday(toDayMilisekond) === isToday(day1) ? t('waterMainInfo.today') : fullDay}
      </p>

      <p className={css.title}>{t('waterMainInfo.today')}</p>

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
