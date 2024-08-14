import { FiPlus } from 'react-icons/fi';
import { openModal } from '../../redux/modal/slice';
import { useDispatch } from 'react-redux';
import ChooseDate from '../ChooseDate/ChooseDate';
import MainButton from '../MainButton/MainButton';
import WaterList from '../WaterList/WaterList';

import css from './DailyInfo.module.css';

const DailyInfo = () => {
  const dispatch = useDispatch();

  const handleAddWaterClick = typeModal => {
    dispatch(openModal(typeModal));
  };

  return (
    <div data-tour="daily-intake">
      <div className={css.wrapper}>
        <ChooseDate />
        <MainButton
          className={css.button}
          text="Add water"
          onClick={() => handleAddWaterClick('addWater')}
          icon={<FiPlus />}
          iconOnly
        />
      </div>
      <WaterList />
    </div>
  );
};
export default DailyInfo;
