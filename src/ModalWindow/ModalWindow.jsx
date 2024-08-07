import Modal from 'react-modal';
import styles from './ModalWindow.module.css';
import { IoIosClose } from "react-icons/io";

Modal.setAppElement('#root');

const ModalWindow = ({ modalIsOpen, onCloseModal, children }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onCloseModal}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <button className={styles.closeButton} onClick={onCloseModal}><IoIosClose/></button>
      {children}
    </Modal>
  );
};

export default ModalWindow;
