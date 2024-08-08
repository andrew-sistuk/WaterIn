import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import Cap from '../../assets/icons/water-glass.svg?react';
import WaterModal from '../WaterModal/WaterModal';

// import WaterModal
// import DeleteWaterModal

import css from './WaterItem.module.css';
import { useState } from 'react';

const WaterItem = ({ data }) => {
  const { userId, volume, drinkTime } = data;


    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
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
        {/* <FiEdit2 className={css.btnIcon} size="14" /> */}
        {/* </WaterModal>
        <DeleteWaterModal data={data._id}> */}
        {/* </DeleteWaterModal> */}

        <button onClick={openModal}><FiEdit2 className={css.btnIcon} size="14" /></button>
        <WaterModal
        type="edit"
        initialData={ data }  
        isOpen={isModalOpen}
        closeModal={closeModal}
        id={1}
        isLoading={false}
        setIsLoading={() => {}}
      />
        <AiOutlineDelete className={css.btnIcon} size="14" />
      </div>
    </>
  );
};
export default WaterItem;
