import css from './WaterProgressBar.module.css';

const WaterProgressBar = () => {
  const dailyNorma = 1.5;
  const totalDrink = 0.85;
  const percentValuedrink = Math.floor((totalDrink / dailyNorma) * 100);

  // Функція для заборони перетину максимально допустимого
  function fixWidthProgressBar(value) {
    if (value > 100) {
      value = 100;

      return value;
    }

    if (value < 0) {
      value = 0;

      return value;
    }

    return value;
  }

  function removeHiddenSignatureEmptyValue(value) {
    let hidden = 'inherit';
    if (value < 15) {
      hidden = 'transparent';

      return hidden;
    }

    return hidden;
  }

  function removeHiddenSignatureMiddleValue(value) {
    let hidden = 'inherit';
    if (value >= 36 && value < 60) {
      hidden = 'transparent';

      return hidden;
    }

    return hidden;
  }

  function removeHiddenSignatureFullValue(value) {
    let hidden = 'inherit';
    if (value > 80) {
      hidden = 'transparent';

      return hidden;
    }

    return hidden;
  }

  return (
    <div className={css.wrapper}>
      <p className={css.title}>Today</p>
      <div className={css.barWrapper}>
        <div className={css.mainBar}></div>
        <div
          className={css.progressBar}
          style={{
            width: `${fixWidthProgressBar(percentValuedrink)}%`,
          }}
        ></div>
        <div
          className={css.currentPoint}
          style={{
            left: `${fixWidthProgressBar(percentValuedrink)}%`,
          }}
        ></div>

        <div className={css.signature}>
          <p
            style={{
              color: `${removeHiddenSignatureEmptyValue(percentValuedrink)}`,
            }}
          >
            0%
          </p>
          <p
            style={{
              color: `${removeHiddenSignatureMiddleValue(percentValuedrink)}`,
            }}
          >
            50%
          </p>
          <p
            style={{
              color: `${removeHiddenSignatureFullValue(percentValuedrink)}`,
            }}
          >
            100%
          </p>
          <p
            className={css.current}
            style={{
              left: `${percentValuedrink}%`,
            }}
          >
            {percentValuedrink}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default WaterProgressBar;
