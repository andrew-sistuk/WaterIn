import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { closeModal } from '../../redux/modal/slice.js';
import { deleteWaterNote } from '../../redux/waterNote/operations.js';

import css from './DeleteEntryModal.module.css';
import { toast } from 'react-toastify';

const DeleteEntryModal = ({ entryId, token }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteClick = async () => {
    setLoading(true);
    try {
      await dispatch(deleteWaterNote({ data: { _id: entryId }, token }));
    } catch (error) {
      toast(`Error deleting entry: ${error}`);
      console.error(`Error deleting entry: ${error}`);
    } finally {
      setLoading(false);
      // onClose();
      dispatch(closeModal());
    }
  };

  const handleDeleteClickTest = () => {
    console.log('Delete clicked');
    closeModal();
  };

  return (
    <div className={css.modalContent}>
      <div className={css.textContainer}>
        <h2 className={css.title}>Delete entry</h2>
        <p className={css.text}>Are you sure you want to delete the entry?</p>
      </div>
      <div className={css.buttonContainer}>
        <button className={css.deleteButton} onClick={handleDeleteClickTest} disabled={loading}>
          Delete
        </button>
        <button className={css.cancelButton} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteEntryModal;
