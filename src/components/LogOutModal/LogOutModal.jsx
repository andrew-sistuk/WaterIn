//import React from 'react';
import css from './LogOutModal.module.css';
import { useState } from 'react';
import { IoIosClose } from 'react-icons/io';

const LogoutModal = ({ onCloseLogout, onLogout }) => {
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await onLogout();
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setTimeout(() => {
        onCloseLogout();
      }, 500);
    }
  };

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <div className={css.closediv}>
          <button type="button" value="close button" className={css.closebtn} onClick={onCloseLogout}>
            <IoIosClose className={css.iconclosebtn} />
          </button>
        </div>
        <div className={css.div}>
          <h2 className={css.title}>Log out</h2>
          <p className={css.text}>Do you really want to leave?</p>

          <div className={css.divbtn}>
            <button
              type="button"
              value="logout button"
              className={css.logoutbtn}
              onClick={handleLogout}
              disabled={loading}
            >
              Logout
            </button>

            <button
              type="button"
              value="cancel button"
              className={css.cancelbtn}
              onClick={onCloseLogout}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
