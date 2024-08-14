import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar';
import MainButton from '../MainButton/MainButton';
import { FiPlus } from 'react-icons/fi';

import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modal/slice.js';

import css from './WaterMainInfo.module.css';
import { ButtonTour } from '../ButtonTour/ButtonTour.jsx';

const WaterMainInfo = () => {
  const dispatch = useDispatch();

  const handleAddWaterClick = typeModal => {
    dispatch(openModal(typeModal));
  };

  return (
    <div className={css.wrapper}>
      <p className={css.logo}>AquaTrack</p>

      <ButtonTour />

      <WaterDailyNorma />
      <WaterProgressBar />
      <MainButton
        text="Addwaterblack"
        onClick={() => handleAddWaterClick('addWater')}
        icon={<FiPlus />}
      />
    </div>
  );
};

export default WaterMainInfo;
