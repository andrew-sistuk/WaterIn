import clsx from 'clsx';
import css from './SignForms.module.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import WelcomeSectionContainer from '../WelcomeSectionContainer/WelcomeSectionContainer';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register as registerFunc } from '../../redux/auth/operations';
import { toast } from 'react-toastify';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

export default function SignUpForm({ isMobile }) {
  const [isPassOpen, setIsPassOpen] = useState(false);
  const [isPassRepOpen, setIsPassRepOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(
      registerFunc({
        email: data.email,
        password: data.password,
      })
    )
      .unwrap()
      .then(reponse => {
        toast('Success!!!');
        console.log(reponse);
      })
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
          <h2 className={css.header}>Sign Up</h2>
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
          <label className={css.label} htmlFor="reqPassword">
            Repeat password:
          </label>
          <div className={css['box-pass']}>
            <input
              {...register('reqPassword')}
              className={clsx(css.input, errors.reqPassword && css['error-input'])}
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
            {errors.reqPassword && <p className={css.error}>{errors.reqPassword.message}</p>}
          </div>
        </div>
        <button className={css.submit} type="submit">
          Sign Up
        </button>
        <p className={css['paragraph-sign']}>
          Don’t have an account?{' '}
          <Link className={css.sign} to="/signIn">
            Sign In
          </Link>
        </p>
      </form>
    </WelcomeSectionContainer>
  );
}
