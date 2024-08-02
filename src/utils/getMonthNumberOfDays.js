const getMonthNumberOfDays = (
  monthIndex,
  yearNumber = new Date().getFullYear()
) => {
  return new Date(yearNumber, monthIndex + 1, 0).getDate();
};

export default getMonthNumberOfDays;
