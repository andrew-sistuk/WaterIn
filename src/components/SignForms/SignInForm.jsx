import clsx from 'clsx';
import css from './SignForms.module.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import WelcomeSectionContainer from '../WelcomeSectionContainer/WelcomeSectionContainer';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import AuthorizationGoogleBtn from '../AuthorizationGoogleBtn/AuthorizationGoogleBtn';

export default function SignInForm({ isMobile }) {
  const [isPassOpen, setIsPassOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(login(data))
      .unwrap()
      .catch(error => {
        toast(error);
        console.log(error);
      });
  };

  const logIn = useSelector(selectIsLoggedIn);
  useEffect(() => {
    if (logIn) {
      navigate('/tracker');
    }
  }, [logIn, navigate]);

  return (
    <WelcomeSectionContainer isMobile={isMobile}>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={css['sign-form']}>
          <h2 className={css.header}>Sign In</h2>
          <label className={css.label} htmlFor="email">
            Email:
          </label>
          <div className={css['box-pass']}>
            <input
              {...register('email')}
              className={clsx(css.input, errors.email && css['error-input'])}
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
              className={clsx(css.input, errors.password && css['error-input'])}
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
        </div>
        <button className={css.submit} type="submit">
          Sign In
        </button>

        <AuthorizationGoogleBtn />

        <div className={css['sing-forgot-wrapper']}>
          <p className={css['paragraph-sign']}>
            Don’t have an account?{' '}
            <Link className={css.sign} to="/signup">
              Sign Up
            </Link>
          </p>
          <p className={css['paragraph-forgot']}>
            Forgot your password?{' '}
            <Link className={css.sign} to="/forgot">
              Renew
            </Link>
          </p>
        </div>
      </form>
    </WelcomeSectionContainer>
  );
}
