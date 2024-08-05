import { useSelector } from 'react-redux';
import { selectItems } from '../../redux/dates/slice';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
let data = [];

const Recharts = () => {
  data = [];
  const dates = useSelector(selectItems);

  dates.map(elem => data.push({ name: `Page A`, ml: Number(elem.dayVolume), pv: 2400, amt: 2400 }));

  //   const renderCustomAxisTick = ({ x, y, payload }) => {
  //     let path = '';

  //     switch (payload.value) {
  //       case 'Page A':
  //         path = '/src/img/icons/sprite.svg#icon1-calendar';
  //         break;
  //       case 'Page B':
  //         path =
  //           'M662.528 451.584q10.24 5.12 30.208 16.384t46.08 31.744 57.856 52.736 65.024 80.896 67.072 115.2 64.512 154.624q-15.36 9.216-31.232 21.504t-31.232 22.016-31.744 15.36-32.768 2.56q-44.032-9.216-78.336-8.192t-62.976 7.68-53.248 16.896-47.616 19.968-46.08 16.384-49.664 6.656q-57.344-1.024-110.592-16.896t-101.376-32.256-89.6-25.088-75.264 4.608q-20.48 8.192-41.984 1.024t-38.912-18.432q-20.48-13.312-39.936-33.792 37.888-116.736 86.016-199.68t92.672-136.704 78.848-81.408 43.52-33.792q9.216-5.12 10.24-25.088t-1.024-40.448q-3.072-24.576-9.216-54.272l-150.528-302.08 180.224-29.696q27.648 52.224 53.76 79.36t50.176 36.864 45.568 5.12 39.936-17.92q43.008-30.72 80.896-103.424l181.248 29.696q-20.48 48.128-45.056 99.328-20.48 44.032-47.616 97.28t-57.856 105.472q-12.288 34.816-13.824 57.344t1.536 36.864q4.096 16.384 12.288 25.6z';
  //         break;
  //       default:
  //         path = '';
  //     }

  //     return (
  //       <svg x={x - 12} y={y + 4} width={24} height={24} viewBox="0 0 1024 1024" fill="#666">
  //         <use href="/src/img/icons/sprite.svg#icon1-calendar"></use>
  //       </svg>
  //     );
  //   };

  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="ml" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      {/* <XAxis dataKey="name" tick={renderCustomAxisTick} /> */}
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default Recharts;
