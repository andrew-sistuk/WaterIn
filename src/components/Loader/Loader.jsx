import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <div className={css.box}>
          <div className={css.mask}>
            <span className="material-symbols-outlined">water_bottle_large</span>
          </div>
        </div>
      </div>
    </div>
  );
}
