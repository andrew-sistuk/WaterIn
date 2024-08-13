import WaterItem from '../WaterItem/WaterItem';

import { useSelector } from 'react-redux';
import { selectItemsDay } from '../../redux/day/selectors';

import css from './WaterList.module.css';

const WaterList = () => {
  const items = useSelector(selectItemsDay);

  return (
    <div className={css.wrapper}>
      {items.length > 0 ? (
        <ul className={css.list}>
          {items.map(arr => (
            <li key={arr._id}>
              <WaterItem data={arr} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.text}>Please, drink some water</p>
      )}
    </div>
  );
};
export default WaterList;
