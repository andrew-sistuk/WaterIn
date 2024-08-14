import { useEffect, useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';

import UserBarPopover from '../UserBarPopover/UserBarPopover.jsx';
import ModalWindow from '../ModalWindow/ModalWindow.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/modal/slice.js';
import { selectUser } from '../../redux/auth/selectors.js';
import { useTranslation } from 'react-i18next';

import css from './UserPanel.module.css';

const UserPanel = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Закриття UserBarPopover при кліку у будь яке місце екрану
  useEffect(() => {
    // Функція, яка викликається при кліку
    function handleClick(event) {
      // Перевіряємо, чи клік був не на кнопці чи її дочірніх елементах
      if (event.target.closest('button')) {
        return;
      }
      // Клік на екран
      setMenuOpen(false);
    }
    // Додаємо обробник подій на документ при завантаженні компонента
    document.addEventListener('click', handleClick);
    // Видаляємо обробник подій при демонтажі компонента
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const getFirstName = fullName => {
    return fullName.split(' ')[0];
  };

  return (
    <div className={css.userPanelContainer} data-tour="settings-panel">
      <h2 className={css.title}>
        {t('Userbar.hello')},{' '}
        <span className={css.firstUserName}>{user.name ? getFirstName(user.name) : 'User'}!</span>
      </h2>
      <button className={css.userPanelBtn} onClick={toggleMenu}>
        <p className={css.userName}>{user.name ? getFirstName(user.name) : 'User'}</p>

        <div className={css.userAvatarContainer}>
          {user.photo ? (
            <img src={user.photo} alt="User Avatar" className={css.avatarImg} />
          ) : (
            <FaUser className={css.userAvatarIcon} />
          )}
        </div>
        <IoChevronDown className={`${css.iconBtn} ${menuOpen ? css.isOpen : ''}`} />
      </button>
      {menuOpen && <UserBarPopover toggleMenu={toggleMenu} />}
      <ModalWindow onClose={handleCloseModal} />
    </div>
  );
};
export default UserPanel;
