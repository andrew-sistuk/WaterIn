import sprite from '/src/assets/icons/sprite.svg'; // Імпортуйте ваш спрайт

const objDefault = {
  width: '20px',
  height: '20px',
};

function Icon({ id, style = objDefault }) {
  return (
    <svg style={style}>
      <use xlinkHref={`${sprite}#icon-${id}`} />
    </svg>
  );
}

export default Icon;
