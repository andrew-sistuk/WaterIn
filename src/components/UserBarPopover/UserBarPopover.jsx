import { FiSettings } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';

import css from './UserBarPopover.module.css';

const UserBarPopover = () => {
  return (
    <div className={css.container}>
      <button
        className={css.userBarPopoverBtn}
        //    onClick={handleSettingClick}
      >
        <FiSettings className={css.btnIcon} />
        <p className={css.textBtn}>Setting</p>
      </button>
      <button
        className={css.userBarPopoverBtn}
        //    onClick={handleLogoutClick}
      >
        <FiLogOut className={css.btnIcon} />
        <p className={css.textBtn}>Log out</p>
      </button>
    </div>
  );
};
export default UserBarPopover;
