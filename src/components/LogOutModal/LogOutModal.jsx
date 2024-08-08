import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations.js';
import { closeModal } from '../../redux/modal/slice.js';

import css from './LogOutModal.module.css';

const LogOutModal = () => {
  const dispatch = useDispatch();

  return (
    <div className={css.modalContent}>
      <div className={css.textContainer}>
        <h2 className={css.title}>Log out</h2>
        <p className={css.text}>Do you really want to leave?</p>
      </div>
      <div className={css.buttonContainer}>
        <button
          className={css.logoutButton}
          onClick={() => {
            dispatch(logout());
            dispatch(closeModal());
          }}
        >
          Log out
        </button>
        <button
          className={css.cancelButton}
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
