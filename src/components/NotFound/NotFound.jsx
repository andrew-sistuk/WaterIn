import Loader from '../Loader/Loader';
import Message from '../Message/Message';
import { toast } from 'react-toastify';
import css from './NotFound.module.css';
import MainButton from '../../components/MainButton/MainButton';
import PageNotFound from '/src/assets/img/404-1.png';

export default function NotFound() {
  //   const [count, setCount] = useState(0);
  function handleClick(messege = '🦄 Wow so easy!') {
    toast(messege);
  }
  return (
    <div>
      <img className={css.image} src={PageNotFound} alt="Page not found" />
      <button onClick={() => handleClick()}>Click me!</button>
      <Loader />
      <Message />
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
