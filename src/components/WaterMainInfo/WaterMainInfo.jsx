import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';

import css from './WaterMainInfo.module.css';

const WaterMainInfo = () => {
  console.log('Замінити компонент AddWaterBtn у файлі WaterMainInfo.jsx');
  return (
    <div className={css.wrapper}>
      <p className={css.logo}>AquaTrack</p>
      <WaterDailyNorma />
      <WaterProgressBar />
      {/* Замінити компонент */}

      <AddWaterBtn />
    </div>
  );
};

export default WaterMainInfo;
