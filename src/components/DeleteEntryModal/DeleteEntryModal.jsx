import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { closeModal } from '../../redux/modal/slice.js';
import { deleteWaterNote } from '../../redux/day/operations.js';

import css from './DeleteEntryModal.module.css';
import { toast } from 'react-toastify';
import { selectModalId } from '../../redux/modal/selectors.js';
import { selectIsToken } from '../../redux/auth/selectors.js';
import { fetchDates } from '../../redux/dates/operations.js';
import { selectItemsDay } from '../../redux/changeDay/changeDay.js';
import { useTranslation } from 'react-i18next';

const DeleteEntryModal = () => {
  const lastDay = useSelector(selectItemsDay);
  const _id = useSelector(selectModalId);
  const token = useSelector(selectIsToken);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleDeleteClick = async () => {
    setLoading(true);
    try {
      await dispatch(deleteWaterNote({ _id, token }));
      setTimeout(() => {
        dispatch(fetchDates(new Date(lastDay).getTime() + 10800000));
      }, 1000);
    } catch (error) {
      toast(t('modals.delete.error')`: ${error}`);
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
        <h2 className={css.title}>{t('modals.delete.title')}</h2>
        <p className={css.text}>{t('modals.delete.text')}</p>
      </div>
      <div className={css.buttonContainer}>
        <button className={css.deleteButton} onClick={handleDeleteClick} disabled={loading}>
          {t('modals.delete.delete')}
        </button>

        <button className={css.cancelButton} onClick={() => dispatch(closeModal())}>
          {t('modals.delete.cancel')}
        </button>
      </div>
    </div>
  );
};

export default DeleteEntryModal;
