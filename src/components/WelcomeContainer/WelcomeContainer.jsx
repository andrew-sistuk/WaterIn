import css from './WelcomeContainer.module.css';

export default function WelcomeContainer({ children }) {
  return (
    <div className={css.container} data-tour="intro-text">
      {children}
    </div>
  );
}
