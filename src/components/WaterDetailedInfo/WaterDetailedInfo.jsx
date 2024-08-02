import css from './WaterDetailedInfo.module.css';

import UserPanel from '../UserPanel/UserPanel';
import DailyInfo from '../DailyInfo/DailyInfo';
import MonthInfo from '../MonthInfo/MonthInfo';

import Calendar from '../Calendar/Calendar';

const WaterDetailedInfo = () => {
  return (
    <div className={css.container}>
      <div className={css.component}>Component</div>
      <Calendar />
    </div>
  );
};

export default WaterDetailedInfo;
