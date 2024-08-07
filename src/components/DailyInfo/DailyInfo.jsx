import ChooseDate from '../ChooseDate/ChooseDate';
import MainButton from '../MainButton/MainButton';

// AddWaterBtn;
import WaterList from '../WaterList/WaterList';

import css from './DailyInfo.module.css';

const DailyInfo = () => {
  return (
    <div>
      <div className={css.wrapper}>
        <ChooseDate />

        {/* Видалити та замінити на компонент */}
        {/* <button className="button" style={{ display: 'block' }}>
          Add water
        </button> */}
        <MainButton
          className="button"
          text="Add water"
          onClick={() => alert('Add water Button clicked!')}
          icon={
            <svg width={20} height={20} className={css.icon}>
              {/* <use href="/src/img/icons/sprite.svg#icon-plus"></use> */}
            </svg>
          }
          iconOnly
        />
      </div>
      <WaterList />
    </div>
  );
};
export default DailyInfo;
