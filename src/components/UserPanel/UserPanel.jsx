import { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';

import UserBarPopover from '../UserBarPopover/UserBarPopover.jsx';

import css from './UserPanel.module.css';

const UserPanel = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={css.userPanelContainer}>
      <h2 className={css.title}>
        Hello<span className={css.firstUserName}>, Nadia!</span>
      </h2>
      <button className={css.userPanelBtn} onClick={toggleMenu}>
        <p className={css.userName}>Nadia</p>
        <div className={css.userAvatarContainer}>
          <FaUser className={css.userAvatarIcon} />
          {/* <img
            src={'src/images/Advantages/photo1.png'}
            alt="User Avatar"
            className={css.avatarImg}
          /> */}
        </div>
        <IoChevronDown className={`${css.iconBtn} ${menuOpen ? css.isOpen : ''}`} />
      </button>
      {menuOpen && <UserBarPopover />}
    </div>
  );
};
export default UserPanel;
