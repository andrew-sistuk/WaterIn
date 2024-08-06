import { useSelector } from 'react-redux';
import { selectItems } from '../../redux/dates/slice';

import css from './Recharts.module.css';

('use client');
import { AreaChart, Area, ResponsiveContainer, CartesianGrid } from 'recharts';

const Recharts = () => {
  const dates = useSelector(selectItems);

  return (
    <div className={css.container}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart width={500} height={400} data={dates}>
          {/* <YAxis />
          <XAxis /> */}

          <CartesianGrid strokeDasharray="0 0 " />
          <Area dataKey="dayVolume" stroke="#323f47" fill="#9be1a0" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Recharts;
