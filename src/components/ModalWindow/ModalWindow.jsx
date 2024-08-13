import Modal from 'react-modal';
import LogOutModal from '../LogOutModal/LogOutModal.jsx';
import { IoIosClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

/////////////////////////////////
// import { selectUser } from '../../redux/auth/selectors.js';
////////////////////////////

import { selectStateModal, selectTypeModal } from '../../redux/modal/selectors.js';
import { closeModal } from '../../redux/modal/slice.js';

import css from './ModalWindow.module.css';
// import SettingModal from '../SettingModal/SettingModal.jsx';
import UserSettingModal from '../UserSettingModal/UserSettingModal.jsx';
import { useEffect } from 'react';
// import UserSettingsModal from '../UserSettingsModal/UserSettingsModal.jsx';
import DeleteEntryModal from '../DeleteEntryModal/DeleteEntryModal.jsx';
import WaterModal from '../WaterModal/WaterModal.jsx';

Modal.setAppElement('#root');

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'fixed',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 'none',
    borderRadius: '14px',
    maxHeight: '90vh',
    overflowY: 'auto',
    scrollbarWidth: 'none',
  },
};

function addContentModal(modalType) {
  // 'setting' або 'logout' або 'delete'
  switch (modalType) {
    case 'logout':
      return <LogOutModal />;
    case 'setting':
      return <UserSettingModal />;
    case 'delete':
      return <DeleteEntryModal />;
    case 'addWater':
      return <WaterModal />;
    case 'editWater':
      return <WaterModal />;
    default:
      return null;
  }
}

export default function ModalWindow({ onClose }) {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectStateModal);
  const modalType = useSelector(selectTypeModal);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Блокуємо прокрутку фону
    } else {
      document.body.style.overflow = ''; // Восстановлюємо прокрутку фону
    }

    return () => {
      document.body.style.overflow = ''; // Очистка по завершенню
    };
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName={{
        base: css.modalContainer,
        afterOpen: css.openedModalContainer,
        beforeClose: css.closedModalContainer,
      }}
      style={modalStyles}
      closeTimeoutMS={500}
      onRequestClose={onClose}
    >
      <button
        className={css.closeBtn}
        onClick={() => {
          dispatch(closeModal());
        }}
      >
        <IoIosClose className={css.closeIcon} size={32} />
      </button>
      {addContentModal(modalType)}
    </Modal>
  );
}
