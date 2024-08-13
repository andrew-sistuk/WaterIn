import css from './AuthorizationGoogleBtn.module.css';
import { FcGoogle } from 'react-icons/fc';
import { useTranslation } from 'react-i18next';

const AuthorizationGoogleBtn = () => {
  const { t } = useTranslation();
  const BASE_URL = 'https://waterin-server.onrender.com';
  const url = `${BASE_URL}/users/google/`;

  return (
    <a className={css.btn} href={url} rel="noopener noreferrer">
      <FcGoogle className={css.icon} />
      {t('googleButton')}
    </a>
  );
};

export default AuthorizationGoogleBtn;
