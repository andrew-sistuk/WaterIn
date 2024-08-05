import createDate from "./createDate";
import createMonth from "./createMonth";

const createYear = (params = {}) => {
  const locale = params.locale ?? "default";

  const monthCount = 12;
  const today = createDate();

  const year = params.year ?? today.year;
  const monthNumber = params.monthNumber ?? today.monthNumber;

  const month = createMonth({ date: new Date(year, monthNumber - 1), locale });

  const getMonthDays = (monthIndex) =>
    createMonth({ date: new Date(year, monthIndex), locale }).createMonthDays();

  const createYearMonthes = () => {
    const monthes = [];

    for (let i = 0; i <= monthCount - 1; i += 1) {
      monthes[i] = getMonthDays(i);
    }

    return monthes;
  };

  return {
    createYearMonthes,
    month,
    year,
  };
};

export default createYear;
