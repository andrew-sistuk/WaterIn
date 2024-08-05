import css from './ChooseDate.module.css';

const ChooseDate = () => {
  const chooseDay = 'today';

  return (
    <>
      <p className={css.day}>{chooseDay}</p>
    </>
  );
};
export default ChooseDate;
