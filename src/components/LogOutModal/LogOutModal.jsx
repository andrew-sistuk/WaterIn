//import React from 'react';
import css from './LogOutModal.module.css';
import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

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
      <div className={css.modalContent}>
        <div className={css.closeDiv}>
          <button
            type="button"
            value="close button"
            className={css.btn}
          onClick={onCloseLogout}
          
          >
            <IoCloseOutline className={css.icon} style={{ width: '24px', height: '24px' }}/>
          </button>
        </div>
        <div className={css.div}>
          <h2 className={css.title}>Log out</h2>
          <p className={css.text}>Do you really want to leave?</p>
          
          <div className={css.divBtn}>
          <button
            type="button"
            value="logout button"
            className={css.btnLog}
            onClick={handleLogout}
            disabled={loading}>
            Logout
          </button>

          <button
            type="button"
            value="cancel button"
            className={css.btnCancel}
            onClick={onCloseLogout}>
            Cancel
          </button>
        </div>
        </div>
      </div>
  );
};

export default LogoutModal;
