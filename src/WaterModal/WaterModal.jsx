import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ModalWindow from '../ModalWindow/ModalWindow';
import styles from './WaterModal.module.css';
import MainButton from '../components/MainButton/MainButton';
import { FiPlus, FiMinus } from 'react-icons/fi';

export const TIME_PATTERN = '^(?:0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$';
const WaterSchema = Yup.object().shape({
  volume: Yup.number()
    .typeError('Volume must be a number')
    .required('Volume is required')
    .min(0, 'Minimum value is 0')
    .max(9999, 'Maximum value is 9999'),
  drinkTime: Yup.string()
    .required('Recording time is required')
    .matches(TIME_PATTERN, 'Invalid time format (xx:xx)'),
});

const WaterModal = ({ type, initialData, isOpen, closeModal, isLoading, setIsLoading }) => {
  const [volume, setVolume] = useState(initialData.volume || '');
  const title = type === 'add' ? 'Add Water' : 'Edit the entered amount of water';
  const subtitle = type === 'add' ? 'Choose a value:' : 'Correct entered data:';

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      volume: initialData.volume || '',
      drinkTime:
        initialData.drinkTime ||
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    resolver: yupResolver(WaterSchema),
  });

  const onSubmit = data => {
    setIsLoading(true);
    setTimeout(() => {
      const transformedData = {
        volume: parseInt(volume, 10),
        drinkTime: data.drinkTime,
      };
      console.log(transformedData);
      setIsLoading(false);
      closeModal();
    }, 500);
  };

  const handleIncrease = () => {
    const newVolume = parseInt(volume, 10) + 50 || 50;
    if (newVolume <= 9999) {
      setVolume(newVolume.toString());
      setValue('volume', newVolume);
    }
  };

  const handleDecrease = () => {
    if (volume > 0) {
      const newVolume = parseInt(volume, 10) - 50 || 0;
      if (newVolume >= 0) {
        setVolume(newVolume.toString());
        setValue('volume', newVolume);
      }
    }
  };

  return (
    <ModalWindow modalIsOpen={isOpen} onCloseModal={closeModal}>
      <div className={styles.waterModalContainer}>
        <div className={styles.waterModalHeader}>
          <h2 className={styles.waterModalTitle}>{title}</h2>
          <h3 className={styles.waterModalSubtitle}>{subtitle}</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.waterForm}>
          <div className={styles.formGroup}>
            <label htmlFor="volume">Amount of water:</label>
            <div className={styles.amountControl}>
              <button type="button" onClick={handleDecrease}>
                <FiMinus />
              </button>
              <div>{volume} ml</div>
              <button type="button" onClick={handleIncrease}>
                <FiPlus />
              </button>
            </div>
            <Controller
              name="volume"
              control={control}
              render={({ field }) => <input type="hidden" {...field} value={volume} />}
            />
            {errors.volume && <p>{errors.volume.message}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="drinkTime">Recording time:</label>
            <Controller
              name="drinkTime"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  onKeyDown={e => {
                    const invalidChars = ['e', 'E', '+', '-', '.', ',', ' '];
                    if (invalidChars.includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              )}
            />
            {errors.drinkTime && <p>{errors.drinkTime.message}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="volume">Enter the value of the water used:</label>
            <Controller
              name="volume"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  value={volume}
                  onChange={e => {
                    const value = e.target.value;
                    if (value === '' || (Number(value) <= 9999 && Number(value) >= 0)) {
                      setVolume(value);
                      field.onChange(e);
                    }
                  }}
                />
              )}
            />
            {errors.volume && <p>{errors.volume.message}</p>}
          </div>
          <MainButton text="Save" disabled={isLoading} />
        </form>
      </div>
    </ModalWindow>
  );
};

export default WaterModal;
