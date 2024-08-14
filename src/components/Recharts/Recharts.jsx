import { useSelector } from 'react-redux';
import { selectItems } from '../../redux/dates/slice';

import css from './Recharts.module.css';

('use client');
import { AreaChart, Area, ResponsiveContainer, YAxis, XAxis, Tooltip } from 'recharts';

const Recharts = () => {
  const dates = useSelector(selectItems);

  const CustomTooltip = ({ active, payload, coordinate }) => {
    if (active && payload && payload.length) {
      const tooltipStyle = {
        position: 'absolute',
        left: coordinate.x,
        top: -48,
        transform: 'translateX(-50%)',
      };

      return (
        <div className={css.customTooltip} style={tooltipStyle}>
          <p className={css.intro}>{` ${payload[0].value} ml`}</p>
        </div>
      );
    }

    return null;
  };
  return (
    <div className={css.container}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart width={500} height={400} data={dates}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="65%" stopColor="#9be1a0" stopOpacity={1} />
              <stop offset="90%" stopColor="#f0eff4" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={value => `${(value / 1000).toFixed(1)} L`}
            tick={{
              fontSize: 14, // Розмір шрифту
              fill: '#323F47', // Колір шрифту
              fontFamily: 'Poppins', // Шрифт
            }}
          />
          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey="date"
            interval={Math.floor(dates.length / 7)}
            tickFormatter={date => new Date(date).getDate()}
            tick={{
              fontSize: 14, // Розмір шрифту
              fill: '#323F47', // Колір шрифту
              fontFamily: 'Poppins', // Шрифт
            }}
          />
          <Tooltip cursor={true} content={<CustomTooltip />} />
          <Area
            dataKey="dayVolume"
            stroke="#87d28d"
            fill="url(#colorUv)"
            dot={{ r: 2, stroke: '#87d28d', strokeWidth: 2, fill: '#fff' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Recharts;
