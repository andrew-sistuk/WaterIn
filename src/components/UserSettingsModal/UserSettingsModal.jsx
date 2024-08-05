import { IoIosClose } from 'react-icons/io';
import React from 'react';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';
import Modal from 'react-modal';
import css from './UserSettingsModal.module.css';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(47, 47, 47, 0.6)',
    boxShadow: '0 4px 50px 0 rgba(0, 0, 0, 0.1)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '15px',
  },
};

Modal.setAppElement('#root');

export default function UserSettingsModal() {
  const [isOpen, setIsOpen] = React.useState(true);

  // const openModal=()=> {
  //   setIsOpen(true);
  // }

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUpdate = data => {
    console.log(data);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Modal">
      <div className={css.wrapper}>
        <h2 className={css.title}>Setting</h2>
        <button type="button">
          <IoIosClose className={css.closeBtn} />
        </button>

        <UserSettingsForm onClose={closeModal} onUpdate={handleUpdate} />
      </div>
    </Modal>
  );
}
