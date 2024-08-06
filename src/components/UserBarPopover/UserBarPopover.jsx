import { FiSettings } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { openModal } from '../../redux/modal/slice.js';

import { useDispatch, useSelector } from 'react-redux';
import { getUser, logout } from '../../redux/auth/operations.js';
import { selectUser } from '../../redux/auth/selectors.js';

import css from './UserBarPopover.module.css';

const UserBarPopover = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleSetting = modalType => {
    dispatch(openModal(modalType));
    dispatch(getUser(user.id));
  };

  const handleLogout = modalType => {
    dispatch(openModal(modalType));
    dispatch(logout());
  };

  return (
    <div className={css.container}>
      <button
        className={`${css.userBarPopoverBtn} ${css.settingBtn}`}
        onClick={() => handleSetting('setting')}
      >
        <FiSettings className={css.btnIcon} />
        <p className={css.textBtn}>Setting</p>
      </button>
      <button className={css.userBarPopoverBtn} onClick={() => handleLogout('logout')}>
        <FiLogOut className={css.btnIcon} />
        <p className={css.textBtn}>Log out</p>
      </button>
    </div>
  );
};
export default UserBarPopover;
