import css from './WaterDailyNorma.module.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';

const WaterDailyNorma = () => {
  const dailyNorma = useSelector(selectUser).waterRate / 1000;

  return (
    <div className={css.wrapper}>
      <p className={css.value}>{dailyNorma} L</p>
      <p className={css.text}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
