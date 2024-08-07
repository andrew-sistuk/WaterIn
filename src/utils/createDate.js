import getWeek from './getWeekNumber';

const createDate = (params = {}) => {
  const locale = params.locale ?? 'en';

  const currentDate = params.date ?? new Date();
  const dayNumber = currentDate.getDate();
  const day = currentDate.toLocaleDateString(locale, { weekday: 'long' });
  const dayNumberInWeek = currentDate.getDay() + 1;
  const dayShort = currentDate.toLocaleDateString(locale, { weekday: 'short' });
  const year = currentDate.getFullYear();
  const yearShort = currentDate.toLocaleDateString(locale, { year: '2-digit' });
  const month = currentDate.toLocaleDateString(locale, { month: 'long' });
  const monthShort = currentDate.toLocaleDateString(locale, { month: 'short' });
  const monthNumber = currentDate.getMonth() + 1;
  const monthIndex = currentDate.getMonth();
  const times = currentDate.getTime();
  const week = getWeek(currentDate);

  return {
    currentDate,
    dayNumber,
    day,
    dayNumberInWeek,
    dayShort,
    year,
    yearShort,
    month,
    monthShort,
    monthNumber,
    monthIndex,
    times,
    week,
  };
};

export default createDate;
