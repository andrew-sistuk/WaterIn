import React from 'react';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';
import Modal from 'react-modal';
import css from './UserSettingsModal.module.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export default function UserSettingsModal() {
  const [modalIsOpen, setIsOpen] = React.useState(true);

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
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Modal"
    >
      <h2 className={css.title}>Setting</h2>

      <UserSettingsForm onClose={closeModal} onUpdate={handleUpdate} />
    </Modal>
  );
}
