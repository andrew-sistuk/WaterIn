import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import Cap from '../../assets/icons/water-glass.svg?react';
// import WaterModal
// import DeleteWaterModal

import css from './WaterItem.module.css';
import { useDispatch } from 'react-redux';
import { dataModalId, openModal, dataInfo } from '../../redux/modal/slice';

const WaterItem = ({ data }) => {
  const { volume, drinkTime, _id } = data;
  const dispatch = useDispatch();

  const handleClickDelete = (modalType, id) => {
    dispatch(openModal(modalType));
    dispatch(dataModalId(id));
  };

  const handlEditWaterClick = (modalType, info) => {
    dispatch(openModal(modalType));
    dispatch(dataInfo(info));
  };
  return (
    <>
      <Cap className={css.iconMain} />
      <div className={css.wrapperData}>
        <p className={css.value}>{volume} ml</p>
        <p className={css.time}>{drinkTime}</p>
      </div>
      <div className={css.wrapperBtn}>
        <button onClick={() => handlEditWaterClick('editWater', data)}>
          <FiEdit2 className={css.btnIcon} size="14" />
        </button>
        <button onClick={() => handleClickDelete('delete', _id)}>
          <AiOutlineDelete className={css.btnIcon} size="14" />
        </button>
      </div>
    </>
  );
};
export default WaterItem;
