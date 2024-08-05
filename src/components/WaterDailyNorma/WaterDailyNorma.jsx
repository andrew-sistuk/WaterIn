import css from './WaterDailyNorma.module.css';

// Витягнути данні

const WaterDailyNorma = () => {
  const dailyNorma = 1.5;

  return (
    <div className={css.wrapper}>
      <p className={css.value}>${dailyNorma} L</p>
      <p className={css.text}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
