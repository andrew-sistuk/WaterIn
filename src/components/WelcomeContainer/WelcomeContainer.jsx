import clsx from 'clsx';
import css from './WelcomeContainer.module.css';

export default function WelcomeContainer({isMobile, children }) {
  return <div className={clsx(css.container,  isMobile && css.isMobile)}>{children}</div>;
}
