import css from './NotFound.module.css';
import PageNotFound from '/src/assets/img/404.png';

export default function NotFound() {
  return <img className={css.image} src={PageNotFound} alt="Page not found" />;
}
