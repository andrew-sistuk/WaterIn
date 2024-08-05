//import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import css from './Modal.module.css';

const rootModal = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const closeModalByEsc = e => {
      if (e.code !== 'Escape') {
        return;
      }
      onClose();
    };

    document.addEventListener('keydown', closeModalByEsc);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', closeModalByEsc);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    onClose();
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      {children}
    </div>,
    rootModal
  );
};

export default Modal;
