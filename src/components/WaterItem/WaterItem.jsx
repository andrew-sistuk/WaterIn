import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import Cap from '../../assets/icons/water-glass.svg?react';
// import WaterModal
// import DeleteWaterModal

import css from './WaterItem.module.css';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modal/slice';

const WaterItem = ({ data }) => {
  const { volume, drinkTime } = data;
  const dispatch = useDispatch();

  const handleClickDelete = modalType => {
    dispatch(openModal(modalType));
  };

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
        <button onClick={() => handleClickDelete('delete')}>
          <AiOutlineDelete className={css.btnIcon} size="14" />
        </button>
        {/* </DeleteWaterModal> */}
      </div>
    </>
  );
};
export default WaterItem;
