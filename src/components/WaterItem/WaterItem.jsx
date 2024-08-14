import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import Cap from '../../assets/icons/water-glass.svg?react';
// import WaterModal
// import DeleteWaterModal

import css from './WaterItem.module.css';
import { useDispatch } from 'react-redux';
import { dataModalId, openModal, dataInfo } from '../../redux/modal/slice';

import { useTranslation } from 'react-i18next';

const WaterItem = ({ data }) => {
  const { volume, drinkTime, _id } = data;
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleClickDelete = (modalType, id) => {
    dispatch(openModal(modalType));
    dispatch(dataModalId(id));
  };

  const handlEditWaterClick = (modalType, info) => {
    dispatch(openModal(modalType));
    dispatch(dataInfo(info));
  };

  return (
    <div className={css.wrapper}>
      <Cap className={css.iconMain} />
      <div className={css.wrapperData}>
        <p className={css.value}>
          {volume} {t('dailyInfo.ml')}
        </p>
        <p className={css.time}>{drinkTime}</p>
      </div>
      <div className={css.wrapperBtn}>
        <button className={css.btn} onClick={() => handlEditWaterClick('editWater', data)}>
          <FiEdit2 className={css.btnIcon} size="14" />
        </button>
        <button className={css.btn} onClick={() => handleClickDelete('delete', _id)}>
          <AiOutlineDelete className={css.btnIcon} size="14" />
        </button>
      </div>
    </div>
  );
};
export default WaterItem;
