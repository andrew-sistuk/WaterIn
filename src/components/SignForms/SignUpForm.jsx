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
// import AuthorizationGoogleBtn from '../AuthorizationGoogleBtn/AuthorizationGoogleBtn';
import { useTranslation } from 'react-i18next';

export default function SignUpForm({ isMobile }) {
  const [isPassOpen, setIsPassOpen] = useState(false);
  const [isPassRepOpen, setIsPassRepOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const emailErrorInvalid = t('signUpPage.emailErrorInvalid');
  const emailErrorRequired = t('signUpPage.emailErrorRequired');
  const passwordErrorLong = t('signUpPage.passwordErrorLong');
  const passwordErrorRequired = t('signUpPage.passwordErrorRequired');
  const repeatPasswordErrorTwo = t('signUpPage.repeatPasswordErrorTwo');
  const repeatPasswordRequired = t('signUpPage.repeatPasswordRequired');

  const schema = yup.object().shape({
    email: yup.string().email(emailErrorInvalid).required(emailErrorRequired),
    password: yup.string().min(6, passwordErrorLong).required(passwordErrorRequired),
    reqPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], repeatPasswordErrorTwo)
      .required(repeatPasswordRequired),
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
          <h2 className={css.header}>{t('signUpPage.signUp')}</h2>
          <label className={css.label} htmlFor="email">
            {t('signUpPage.email')}
          </label>
          <div className={css['box-pass']}>
            <input
              {...register('email')}
              className={clsx(css.input, errors.email && css['error-input'])}
              type="email"
              placeholder={t('signUpPage.emailPlaceholder')}
              id="email"
            />
            {errors.email && <p className={css.error}>{errors.email.message}</p>}
          </div>
          <label className={css.label} htmlFor="password">
            {t('signUpPage.password')}
          </label>
          <div className={css['box-pass']}>
            <input
              {...register('password')}
              className={clsx(css.input, errors.password && css['error-input'])}
              type={isPassOpen ? 'text' : 'password'}
              placeholder={t('signUpPage.passwordPlaceholder')}
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
            {t('signUpPage.repeatPassword')}
          </label>
          <div className={css['box-pass']}>
            <input
              {...register('reqPassword')}
              className={clsx(css.input, errors.reqPassword && css['error-input'])}
              type={isPassRepOpen ? 'text' : 'password'}
              placeholder={t('signUpPage.repeatPasswordPlaceholder')}
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
          {t('signUpPage.signUp')}
        </button>

        {/* <AuthorizationGoogleBtn /> */}

        <p className={css['paragraph-sign']}>
          {t('signUpPage.textAlready')}{' '}
          <Link className={css.sign} to="/signIn">
            {t('signUpPage.signIn')}
          </Link>
        </p>
      </form>
    </WelcomeSectionContainer>
  );
}
