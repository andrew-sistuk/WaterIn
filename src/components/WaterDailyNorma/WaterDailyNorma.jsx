import css from './WaterDailyNorma.module.css';

import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { useTranslation } from 'react-i18next';

const WaterDailyNorma = () => {
  const dailyNorma = useSelector(selectUser).waterRate / 1000;
  const { t } = useTranslation();

  return (
    <div className={css.wrapper} data-tour="daily-allowance">
      <p className={css.value}>
        {dailyNorma} {t('waterMainInfo.l')}
      </p>
      <p className={css.text}>{t('waterMainInfo.norma')}</p>
    </div>
  );
};

export default WaterDailyNorma;
