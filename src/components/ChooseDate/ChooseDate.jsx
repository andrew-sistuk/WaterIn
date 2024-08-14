import css from './ChooseDate.module.css';
import createMonth from '../../utils/createMonth';
import isToday from '../../utils/isToday';

import { useSelector } from 'react-redux';

import { selectItemsDay } from '../../redux/changeDay/changeDay';
import { useTranslation } from 'react-i18next';

const ChooseDate = () => {
  const toDayMilisekond = new Date().getTime();

  const { t } = useTranslation();

  const day1 = useSelector(selectItemsDay);
  const month = createMonth({ date: new Date(day1) });
  const fullDay = `${new Date(day1).getDate()}, ${month.monthName}`;

  return (
    <>
      <p className={css.day}>
        {isToday(toDayMilisekond) === isToday(day1) ? t('waterMainInfo.today') : fullDay}
      </p>
    </>
  );
};
export default ChooseDate;
