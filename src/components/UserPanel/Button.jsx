import clsx from 'clsx';
import css from './Button.module.css';

const buildLinkClass = classname => {
  return clsx(css.button, classname && classname);
};

const Button = ({ children, classname, ...props }) => {
  return (
    <button className={buildLinkClass(classname)} {...props}>
      {children}
    </button>
  );
};

export default Button;
