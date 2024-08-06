import WaterItem from '../WaterItem/WaterItem';
// import { useSelector } from 'react-redux';
// import { selectItems } from '../../redux/dates/selectors';

import css from './WaterList.module.css';

const arrs = [
  {
    userId: '66ad13a1d0642828361939ec',
    volume: 242,
    drinkTime: '21:02',
    createdAt: 1722470400000,
    updatedAt: 1722470400000,
    _id: '1',
  },
  {
    userId: '66ad13a1d0642828361939ec',
    volume: 413,
    drinkTime: '15:49',
    createdAt: 1722556800000,
    updatedAt: 1722556800000,
    _id: '2',
  },
  {
    userId: '66ad13a1d0642828361939ec',
    volume: 475,
    drinkTime: '09:04',
    createdAt: 1722643200000,
    updatedAt: 1722643200000,
    _id: '3',
  },
  {
    userId: '66ad13a1d0642828361939ec',
    volume: 380,
    drinkTime: '00:32',
    createdAt: 1722729600000,
    updatedAt: 1722729600000,
    _id: '4',
  },
  {
    userId: '66ad13a1d0642828361939ec',
    volume: 488,
    drinkTime: '07:26',
    createdAt: 1722816000000,
    updatedAt: 1722816000000,
    _id: '5',
  },
  {
    userId: '66ad13a1d0642828361939ec',
    volume: 368,
    drinkTime: '05:15',
    createdAt: 1722902400000,
    updatedAt: 1722902400000,
    _id: '6',
  },
  {
    userId: '66ad13a1d0642828361939ec',
    volume: 232,
    drinkTime: '01:41',
    createdAt: 1722988800000,
    updatedAt: 1722988800000,
    _id: '7',
  },
  {
    userId: '66ad13a1d0642828361939ec',
    volume: 455,
    drinkTime: '20:31',
    createdAt: 1723075200000,
    updatedAt: 1723075200000,
    _id: '8',
  },
  {
    userId: '66ad13a1d0642828361939ec',
    volume: 269,
    drinkTime: '02:01',
    createdAt: 1723161600000,
    updatedAt: 1723161600000,
    _id: '9',
  },
  {
    userId: '66ad13a1d0642828361939ec',
    volume: 492,
    drinkTime: '22:16',
    createdAt: 1723248000000,
    updatedAt: 1723248000000,
    _id: '10',
  },
];

const WaterList = () => {
  // const items = useSelector(selectItems);
  // console.log(items);

  return (
    <ul className={css.list}>
      {arrs.map(arr => (
        <li className={css.item} key={arr._id}>
          <WaterItem data={arr} />
        </li>
      ))}
    </ul>
  );
};
export default WaterList;
