import css from './AuthorizationGoogleBtn.module.css';
import { FcGoogle } from 'react-icons/fc';

const AuthorizationGoogleBtn = () => {
  return (
    <>
      <button className={css.btn}>
        <FcGoogle className={css.icon} />
        <p>Sign in with Google</p>
      </button>
    </>
  );
};

export default AuthorizationGoogleBtn;
