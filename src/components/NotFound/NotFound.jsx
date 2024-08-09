import Loader from '../Loader/Loader';
import css from './NotFound.module.css';
import MainButton from '../../components/MainButton/MainButton';
import PageNotFound from '/src/assets/img/404-1.png';

export default function NotFound() {
  return (
    <div>
      <img className={css.image} src={PageNotFound} alt="Page not found" />
      <Loader />
      <MainButton text="Save" onClick={() => alert('Save Button clicked!')} />
      <MainButton text="Try tracker" onClick={() => alert('Try tracker Button clicked!')} />
      <MainButton
        text="Try tracker"
        onClick={() => alert('Try tracker Button clicked!')}
        disabled
      />
      <MainButton
        text="Add water"
        onClick={() => alert('Add water Button clicked!')}
        icon={
          <svg width={20} height={20} className={css.icon}>
            <use href="/src/img/icons/sprite.svg#icon-plus"></use>
          </svg>
        }
      />
      <MainButton
        text="Add water"
        onClick={() => alert('Add water Button clicked!')}
        icon={
          <svg width={20} height={20} className={css.icon}>
            <use href="/src/img/icons/sprite.svg#icon-plus"></use>
          </svg>
        }
        iconOnly
      />
      <MainButton text="Cancel" onClick={() => alert('Cancel Button clicked!')} />
      <MainButton text="Cancel" onClick={() => alert('Cancel Button clicked!')} disabled />
      <MainButton text="Delete" onClick={() => alert('Delete Button clicked!')} />
    </div>
  );
}
