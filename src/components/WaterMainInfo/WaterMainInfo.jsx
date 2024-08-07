import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar';
import MainButton from '../MainButton/MainButton';
// import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import { FiPlus } from "react-icons/fi";

import css from './WaterMainInfo.module.css';

const WaterMainInfo = () => {
  // console.log('Замінити компонент AddWaterBtn у файлі WaterMainInfo.jsx');
  return (
    <div className={css.wrapper}>
      <p className={css.logo}>AquaTrack</p>
      <WaterDailyNorma />
      <WaterProgressBar />
      {/* Замінити компонент */}

      <div className={css.btn}>
        <MainButton
          // className={css.btn}
          text="Add water"
          onClick={() => alert('Add water Button clicked!')}
          icon={
            <FiPlus />
          }
        />
      </div>
      {/* <AddWaterBtn /> */}
    </div>
  );
};

export default WaterMainInfo;
