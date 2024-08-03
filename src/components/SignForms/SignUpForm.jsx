import clsx from 'clsx';
import css from './SignForms.module.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export default function SignUpForm() {
  const [isPassOpen, setIsPassOpen] = useState(false);
  const [isPassRepOpen, setIsPassRepOpen] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    reqPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Repeat password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form className={css['sign-form']} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={css.header}>Sign Up</h2>
      <label className={css.label} htmlFor="email">
        Email:
      </label>
      <input
        {...register('email')}
        className={clsx(css.input, css.email)}
        type="email"
        placeholder="Enter your email"
        id="email"
      />
      {errors.email && <p className={css.error}>{errors.email.message}</p>}
      <label className={css.label} htmlFor="password">
        Password:
      </label>
      <div className={css['box-pass']}>
        <input
          {...register('password')}
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
      {errors.password && <p className={css.error}>{errors.password.message}</p>}
      <label className={css.label} htmlFor="reqPassword">
        Repeat password:
      </label>
      <div className={css['box-pass']}>
        <input
          {...register('reqPassword')}
          className={clsx(css.input, css.pass)}
          type={isPassRepOpen ? 'text' : 'password'}
          placeholder="Enter your password"
          id="reqPassword"
        />
        <button
          type="button"
          className={css['see-pass']}
          onClick={() => setIsPassRepOpen(prev => !prev)}
        >
          {isPassRepOpen ? <FiEye className={css.icon} /> : <FiEyeOff className={css.icon} />}
        </button>
      </div>
      {errors.reqPassword && <p className={css.error}>{errors.reqPassword.message}</p>}
      <button className={css.submit} type="submit">
        Sign Up
      </button>
      <p className={css['paragraph-sign']}>
        Don’t have an account? <span className={css['sign']}>Sign In</span>
      </p>
    </form>
  );
}
