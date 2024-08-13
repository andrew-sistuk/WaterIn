import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations.js';
import { closeModal } from '../../redux/modal/slice.js';
import { useTranslation } from 'react-i18next';

import css from './LogOutModal.module.css';

const LogOutModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className={css.modalContent}>
      <div className={css.textContainer}>
        <h2 className={css.title}>{t('modals.logOut.title')}</h2>
        <p className={css.text}>{t('modals.logOut.text')}</p>
      </div>
      <div className={css.buttonContainer}>
        <button
          className={css.logoutButton}
          onClick={() => {
            dispatch(logout());
            dispatch(closeModal());
          }}
        >
          {t('modals.logOut.logOut')}
        </button>
        <button
          className={css.cancelButton}
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          {t('modals.logOut.cancel')}
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
