import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import Cap from '../../assets/icons/water-glass.svg?react';

import css from './WaterItem.module.css';

const WaterItem = () => {
  const value = '250';
  const time = '7:00 AM';

  console.log('Замінити btnEdit та btnDelete на компонент кнопку');
  console.log('Замінити іконки?');

  return (
    <li className={css.item}>
      {/* <img className={css.iconMain} src="/waterin.svg" alt="" /> */}
      <Cap className={css.iconMain} />

      <div className={css.wrapperData}>
        <p className={css.value}>{value} ml</p>
        <p className={css.time}>{time}</p>
      </div>
      <div className={css.wrapperBtn}>
        <FiEdit2 className={css.btnIcon} size="14" />
        <AiOutlineDelete className={css.btnIcon} size="14" />
      </div>
    </li>
  );
};
export default WaterItem;
