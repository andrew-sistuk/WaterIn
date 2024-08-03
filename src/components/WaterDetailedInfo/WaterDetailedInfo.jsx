import css from './WaterDetailedInfo.module.css';
import MonthInfo from '../MonthInfo/MonthInfo';
// import Calendar from '../Calendar/Calendar';

const WaterDetailedInfo = () => {
  return (
    <div className={css.container}>
      <div className={css.component}>Component</div>
      <MonthInfo />
    </div>
  );
};

export default WaterDetailedInfo;
