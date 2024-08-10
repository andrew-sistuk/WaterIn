import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import Cap from '../../assets/icons/water-glass.svg?react';
// import WaterModal
// import DeleteWaterModal

import css from './WaterItem.module.css';
import { useDispatch } from 'react-redux';
import { dataModalId, openModal } from '../../redux/modal/slice';

const WaterItem = ({ data }) => {
  const { volume, drinkTime, _id } = data;
  const dispatch = useDispatch();

  const handleClickDelete = (modalType, id) => {
    dispatch(openModal(modalType));
    dispatch(dataModalId(id));
  };

  return (
    <>
      <Cap className={css.iconMain} />

      <div className={css.wrapperData}>
        <p className={css.value}>{volume} ml</p>
        <p className={css.time}>{drinkTime}</p>
      </div>
      <div className={css.wrapperBtn}>
        <FiEdit2 className={css.btnIcon} size="14" />
        <button onClick={() => handleClickDelete('delete', _id)}>
          <AiOutlineDelete className={css.btnIcon} size="14" />
        </button>
      </div>
    </>
  );
};
export default WaterItem;
