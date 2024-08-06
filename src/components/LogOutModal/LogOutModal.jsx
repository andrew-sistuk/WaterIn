//import React from 'react';
import css from './LogOutModal.module.css';
import { useState } from 'react';
import { IoIosClose } from 'react-icons/io';

const LogoutModal = ({ onLogout, onCloseLogout }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button type="button" className={css.closebtn} onClick={onCloseLogout}>
          <IoIosClose className={css.iconclosebtn} />
        </button>

        <div className={css.maincontent}>
          <h2 className={css.title}>Log out</h2>
          <p className={css.text}>Do you really want to leave?</p>

          <div className={css.btncontainer}>
            <button type="button" className={css.logoutbtn} onClick={onLogout} disabled={loading}>
              Logout
            </button>

            <button type="button" className={css.cancelbtn} onClick={onCloseLogout}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
