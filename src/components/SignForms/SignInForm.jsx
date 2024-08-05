import clsx from 'clsx';
import css from './SignForms.module.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import WelcomeSectionContainer from '../WelcomeSectionContainer/WelcomeSectionContainer';
import { Link } from 'react-router-dom';

export default function SignInForm() {
  const [isPassOpen, setIsPassOpen] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
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
    <WelcomeSectionContainer>
      <form className={css['sign-form']} onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2 className={css.header}>Sign In</h2>
        <label className={css.label} htmlFor="email">
          Email:
        </label>
        <div className={css['box-pass']}>
          <input
            {...register('email')}
            className={clsx(css.input, css.email, errors.email && css['error-input'])}
            type="email"
            placeholder="Enter your email"
            id="email"
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>
        <label className={css.label} htmlFor="password">
          Password:
        </label>
        <div className={css['box-pass']}>
          <input
            {...register('password')}
            className={clsx(css.input, css.pass, errors.password && css['error-input'])}
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
          {errors.password && <p className={css.error}>{errors.password.message}</p>}
        </div>
        <button className={css.submit} type="submit">
          Sign In
        </button>
        <p className={css['paragraph-sign']}>
          Don’t have an account?{' '}
          <Link className={css.sign} to="/signup">
            Sign Up
          </Link>
        </p>
      </form>
    </WelcomeSectionContainer>
  );
}
