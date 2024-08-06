//import React from 'react';
import css from './DeleteEntryModal.module.css';
import { useState } from 'react';
import { IoIosClose } from 'react-icons/io';

import { useDispatch } from 'react-redux';
//import { deleteEntry } from '../../';

const DeleteEntryModal = ({ deleteRecordId, onClose }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteClick = async () => {
    setLoading(true);
    try {
      dispatch(deleteEntry(deleteRecordId));
    } catch (error) {
      console.error("Error deleting entry", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button type="button" className={css.closebtn} onClick={onClose}>
          <IoIosClose className={css.iconclosebtn} />
        </button>

        <div className={css.maincontent}>
          <h2 className={css.title}>Delete entry</h2>
          <p className={css.text}>Are you sure you want to delete the entry?</p>

          <div className={css.btncontainer}>
            <button type="button" className={css.deletebtn} onClick={handleDeleteClick} disabled={loading}>
              Delete
            </button>

            <button type="button" className={css.cancelbtn} onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteEntryModal;
