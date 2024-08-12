import createDate from './createDate';

const getMonthesNames = (locale = 'default') => {
  const monthesNames = Array.from({ length: 12 });

  const d = new Date();

  monthesNames.forEach((_, index) => {
    const { month, monthIndex, monthShort, date } = createDate({
      locale,
      date: new Date(d.getFullYear(), d.getMonth() + index, d.getDate()),
    });

    monthesNames[monthIndex] = { month, monthIndex, monthShort, date };
  });
};

export default getMonthesNames;
