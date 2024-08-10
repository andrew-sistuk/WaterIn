import { FiSettings } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { openModal } from '../../redux/modal/slice.js';

import { useDispatch } from 'react-redux';

import css from './UserBarPopover.module.css';

const UserBarPopover = ({ toggleMenu }) => {
  const dispatch = useDispatch();

  const handleClick = modalType => {
    dispatch(openModal(modalType));
    toggleMenu();
  };

  return (
    <div className={css.container}>
      <button
        className={`${css.userBarPopoverBtn} ${css.settingBtn}`}
        onClick={() => handleClick('setting')}
      >
        <FiSettings className={css.btnIcon} />
        <p className={css.textBtn}>Setting</p>
      </button>
      <button className={css.userBarPopoverBtn} onClick={() => handleClick('logout')}>
        <FiLogOut className={css.btnIcon} />
        <p className={css.textBtn}>Log out</p>
      </button>
    </div>
  );
};
export default UserBarPopover;
