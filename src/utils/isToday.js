const isToday = day => {
  const toDay = new Date();
  return (
    new Date(day).getFullYear() === toDay.getFullYear() &&
    new Date(day).getMonth() === toDay.getMonth() &&
    new Date(day).getDate() === toDay.getDate()
  );
};
export default isToday;
