import css from './AuthorizationGoogleBtn.module.css';
import { FcGoogle } from 'react-icons/fc';

const AuthorizationGoogleBtn = () => {
  const BASE_URL = 'https://waterin-server.onrender.com';
  // const BASE_URL = 'http://localhost:3000';

  const url = `${BASE_URL}/users/google/`;

  return (
    <a className={css.btn} href={url} rel="noopener noreferrer">
      <FcGoogle className={css.icon} />
      Sign in with Google
    </a>
  );
};

export default AuthorizationGoogleBtn;
