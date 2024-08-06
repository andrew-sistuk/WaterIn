import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import Cap from '../../assets/icons/water-glass.svg?react';
// import WaterModal
// import DeleteWaterModal

import css from './WaterItem.module.css';

const WaterItem = ({ data }) => {
  const { userId, volume, drinkTime } = data;

  // console.log('Замінити btnEdit та btnDelete на компонент кнопку');
  // console.log('Замінити іконки?');

  return (
    <>
      <Cap className={css.iconMain} />

      <div className={css.wrapperData}>
        <p className={css.value}>{volume} ml</p>
        <p className={css.time}>{drinkTime}</p>
      </div>
      <div className={css.wrapperBtn}>
        {/* <WaterModal data={data}> */}
        <FiEdit2 className={css.btnIcon} size="14" />
        {/* </WaterModal>
        <DeleteWaterModal data={data._id}> */}
        <AiOutlineDelete className={css.btnIcon} size="14" />
        {/* </DeleteWaterModal> */}
      </div>
    </>
  );
};
export default WaterItem;
