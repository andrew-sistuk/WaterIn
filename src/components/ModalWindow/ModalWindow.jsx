import Modal from 'react-modal';
import LogOutModal from '../LogOutModal/LogOutModal.jsx';
import { IoIosClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

import { selectStateModal, selectTypeModal } from '../../redux/modal/selectors.js';
import { closeModal } from '../../redux/modal/slice.js';

import css from './ModalWindow.module.css';
import SettingModal from '../SettingModal/SettingModal.jsx';

Modal.setAppElement('#root');

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  },
};

export default function ModalWindow({ onClose }) {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectStateModal);
  const modalType = useSelector(selectTypeModal);

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
        <IoIosClose className={css.closeIcon} />
      </button>
      {modalType === 'logout' ? <LogOutModal /> : <SettingModal />}
    </Modal>
  );
}
