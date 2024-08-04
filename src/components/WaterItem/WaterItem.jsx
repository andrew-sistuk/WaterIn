import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaGlassWater } from 'react-icons/fa6';

import css from './WaterItem.module.css';

const WaterItem = () => {
  const value = '250';
  const time = '7:00 AM';

  console.log('Замінити btnEdit та btnDelete на компонент кнопку');
  console.log('Замінити іконки?');

  return (
    <li className={css.item}>
      {/* <div className={css.icon}> */}
      <img className={css.iconMain} src="/waterin.svg" alt="" />

      {/* <svg className={css.iconMain}>
        <use href="/waterin.svg"></use>
      </svg> */}
      {/* <FaGlassWater className={css.iconMain} size="38" /> */}
      {/* </div> */}
      <div className={css.wrapperData}>
        <p className={css.value}>{value} ml</p>
        <p className={css.time}>{time}</p>
      </div>
      <div className={css.wrapperBtn}>
        {/* <div className={css.btnEdit}> */}
        <FiEdit2 className={css.btnIcon} size="14" />
        {/* </div> */}
        {/* <div className={css.btnDelete}> */}
        <AiOutlineDelete className={css.btnIcon} size="14" />
        {/* </div> */}
      </div>
    </li>
  );
};
export default WaterItem;
