import { FiSettings } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { openModal } from '../../redux/modal/slice.js';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import css from './UserBarPopover.module.css';

const UserBarPopover = ({ toggleMenu }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
        <p className={css.textBtn}>{t('Userbar.settings')}</p>
      </button>
      <button className={css.userBarPopoverBtn} onClick={() => handleClick('logout')}>
        <FiLogOut className={css.btnIcon} />
        <p className={css.textBtn}>{t('Userbar.logOut')}</p>
      </button>
    </div>
  );
};
export default UserBarPopover;
