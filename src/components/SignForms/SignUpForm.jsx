import clsx from 'clsx';
import css from './SignForms.module.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useState } from 'react';

export default function SignUpForm() {
  const [isPassOpen, setIsPassOpen] = useState(false);
  const [isPassRepOpen, setIsPassRepOpen] = useState(false);

  return (
    <form className={css['sign-form']}>
      <h2 className={css.header}>Sign Up</h2>
      <label className={css.label} htmlFor="email">
        Email:
      </label>
      <input
        className={clsx(css.input, css.email)}
        type="email"
        placeholder="Enter your email"
        id="email"
      />
      <label className={css.label} htmlFor="password">
        Password:
      </label>
      <div className={css['box-pass']}>
        <input
          className={clsx(css.input, css.pass)}
          type={isPassOpen ? 'text' : 'password'}
          placeholder="Enter your password"
          id="password"
        />
        <button
          type="button"
          className={css['see-pass']}
          onClick={() => setIsPassOpen(prev => !prev)}
        >
          {isPassOpen ? <FiEye className={css.icon} /> : <FiEyeOff className={css.icon} />}
        </button>
      </div>
      <label className={css.label} htmlFor="password">
        Repeat password:
      </label>
      <div className={css['box-pass']}>
        <input
          className={clsx(css.input, css.pass)}
          type={isPassRepOpen ? 'text' : 'password'}
          placeholder="Enter your password"
          id="password"
        />
        <button
          type="button"
          className={css['see-pass']}
          onClick={() => setIsPassRepOpen(prev => !prev)}
        >
          {isPassRepOpen ? <FiEye className={css.icon} /> : <FiEyeOff className={css.icon} />}
        </button>
      </div>
      <button className={css.submit} type="submit">
        Sign Up
      </button>
      <p className={css['paragraph-sign']}>
        Don’t have an account? <span className={css['sign']}>Sign Up</span>
      </p>
    </form>
  );
}
