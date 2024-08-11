import WaterItem from '../WaterItem/WaterItem';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectItemsDay } from '../../redux/day/selectors';

import { fetchDatesId } from '../../redux/day/operations';

import css from './WaterList.module.css';

const WaterList = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItemsDay);

  const carentDay = new Date().getTime() + 43200000;

  useEffect(() => {
    dispatch(fetchDatesId(carentDay));
  }, [dispatch, carentDay]);

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
