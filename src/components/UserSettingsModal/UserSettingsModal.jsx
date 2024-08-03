import React from 'react';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';
import Modal from 'react-modal';

const customStyles = {
  content: {
    // top: '50%',
    // left: '50%',
    // right: 'auto',
    // bottom: 'auto',
    // marginRight: '-50%',
    // transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement(UserSettingsModal);

export default function UserSettingsModal() {
  const [modalIsOpen, setIsOpen] = React.useState(true);

  // function openModal() {
  //   setIsOpen(true);
  // }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Modal"
    >
      <h2>Setting</h2>
      <UserSettingsForm />
    </Modal>
  );
}
