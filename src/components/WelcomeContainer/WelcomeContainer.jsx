import css from './WelcomeContainer.module.css';

export default function WelcomeContainer({ children }) {
  return <div className={css.container}>{children}</div>;
}
