import css from './WelcomeContainer.module.css';

export default function AdvantagesContainer({ children }) {
  return <div className={css.container}>{children}</div>;
}
