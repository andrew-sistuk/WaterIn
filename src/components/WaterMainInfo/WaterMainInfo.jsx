import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar';
import MainButton from '../MainButton/MainButton';
// import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import { FiPlus } from "react-icons/fi";

import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modal/slice.js';

import css from './WaterMainInfo.module.css';

const WaterMainInfo = () => {
  // console.log('Замінити компонент AddWaterBtn у файлі WaterMainInfo.jsx');
  const dispatch = useDispatch();

  const handleAddWaterClick = (typeModal) => {
    dispatch(openModal(typeModal));
  };

  return (
    <div className={css.wrapper}>
      <p className={css.logo}>AquaTrack</p>
      <WaterDailyNorma />
      <WaterProgressBar />
      <div className={css.btn}>
        <MainButton
          text="Add water"
          onClick={() => handleAddWaterClick('addWater')}
          icon={<FiPlus />}
        />
      </div>
    </div>
  );
};


export default WaterMainInfo;
