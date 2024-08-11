import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { closeModal } from '../../redux/modal/slice.js';
import { deleteWaterNote } from '../../redux/day/operations.js';

import css from './DeleteEntryModal.module.css';
import { toast } from 'react-toastify';
import { selectModalId } from '../../redux/modal/selectors.js';
import { selectIsToken } from '../../redux/auth/selectors.js';

const DeleteEntryModal = () => {
  const _id = useSelector(selectModalId);
  const token = useSelector(selectIsToken);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteClick = async () => {
    setLoading(true);
    try {
      await dispatch(deleteWaterNote({ _id, token }));
    } catch (error) {
      toast(`Error deleting entry: ${error}`);
      console.error(`Error deleting entry: ${error}`);
    } finally {
      setLoading(false);
      // onClose();
      dispatch(closeModal());
    }
  };

  // const handleDeleteClickTest = () => {
  //   console.log('Delete clicked');
  //   closeModal();
  // };

  return (
    <div className={css.modalContent}>
      <div className={css.textContainer}>
        <h2 className={css.title}>Delete entry</h2>
        <p className={css.text}>Are you sure you want to delete the entry?</p>
      </div>
      <div className={css.buttonContainer}>
        <button className={css.deleteButton} onClick={handleDeleteClick} disabled={loading}>
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
