import ChooseDate from '../ChooseDate/ChooseDate';
// AddWaterBtn;
import WaterList from '../WaterList/WaterList';

import css from './DailyInfo.module.css';

const DailyInfo = () => {
  return (
    <div>
      <div className={css.wrapper}>
        <ChooseDate />

        {/* Видалити та замінити на компонент */}
        <button className="button" style={{ display: 'block' }}>
          Add water
        </button>
      </div>
      <WaterList />
    </div>
  );
};
export default DailyInfo;
