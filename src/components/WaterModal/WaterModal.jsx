import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { closeModal } from '../../redux/modal/slice.js';
import MainButton from '../MainButton/MainButton';
import styles from './WaterModal.module.css';
import { selectModalInfo, selectTypeModal } from '../../redux/modal/selectors.js';
import { editWaterNote, addWaterNote } from '../../redux/waterNote/operations.js';

export const TIME_PATTERN = '^(?:0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$';
const WaterSchema = Yup.object().shape({
  volume: Yup.number()
    .typeError('Volume must be a number')
    .required('Volume is required')
    .min(50, 'Minimum value is 50')
    .max(9999, 'Maximum value is 9999'),
  drinkTime: Yup.string()
    .required('Recording time is required')
    .matches(TIME_PATTERN, 'Invalid time format (xx:xx)'),
});

const WaterModal = () => {
  const type = useSelector(selectTypeModal);
  const dataInfo = useSelector(selectModalInfo);
  const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const [volume, setVolume] = useState(50);
  const [drinkTime, setDrinkTime] = useState(timeNow);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dataInfo) {
      setVolume(dataInfo.volume);
      setDrinkTime(dataInfo.drinkTime);
    }
  }, [dataInfo]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm({
    defaultValues: {
      volume,
      drinkTime,
    },
    resolver: yupResolver(WaterSchema),
  });

  const watchedVolume = watch('volume');

  useEffect(() => {
    if (watchedVolume) {
      trigger('volume');
    }
  }, [watchedVolume, trigger]);

  const onSubmit = () => {
    const transformedData = {
      volume: parseInt(volume, 10),
      drinkTime,
    };
    if (type === 'editWater') {
      dispatch(editWaterNote(transformedData));
    } else if (type === 'addWater') {
      dispatch(addWaterNote(transformedData));
    }
    dispatch(closeModal());
  };

  const handleIncrease = () => {
    const newVolume = (parseInt(volume, 10) || 0) + 50;
    if (newVolume <= 9999) {
      setVolume(newVolume.toString());
      setValue('volume', newVolume);
    }
  };

  const handleDecrease = () => {
    const newVolume = (parseInt(volume, 10) || 0) - 50;
    if (newVolume >= 50) {
      setVolume(newVolume.toString());
      setValue('volume', newVolume);
    }
  };

  const handleVolumeChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      if (value === '') {
        setVolume('');
        setValue('volume', '');
      } else if (parseInt(value, 10) <= 9999) {
        setVolume(value);
        setValue('volume', value);
      }
    }
  };

  return (
    <div className={styles.waterModalContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.waterForm}>
        <h2 className={styles.waterModalTitle}>
          {type === 'editWater' ? 'Edit the entered amount of water' : 'Add Water'}
        </h2>
        <h3 className={styles.waterModalSubtitle}>
          {type === 'editWater' ? 'Correct entered data:' : 'Choose a value:'}
        </h3>
        <div className={styles.formGroup}>
          <label htmlFor="volume" className={styles.formLabel}>
            Amount of water:
          </label>
          <div className={styles.amountControl}>
            <button type="button" onClick={handleDecrease}>
              <FiMinus />
            </button>
            <div>{volume ? `${volume} ml` : '0 ml'}</div>
            <button type="button" onClick={handleIncrease}>
              <FiPlus />
            </button>
          </div>
          <Controller
            name="volume"
            control={control}
            render={({ field }) => (
              <input
                type="hidden"
                {...field}
                value={volume}
                onChange={handleVolumeChange}
              />
            )}
          />
        </div>
        
        <div className={`${styles.formGroup} ${styles.formGroupSmallGap}`}>
          <label htmlFor="drinkTime" className={styles.formLabel}>
            Recording time:
          </label>
          <Controller
            name="drinkTime"
            control={control}
            render={({ field }) => (
              <input
                type="time"
                {...field}
                onChange={e => {
                  const value = e.target.value;
                  if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
                    setDrinkTime(value);
                    field.onChange(e);
                  }
                }}
                value={drinkTime}
              />
            )}
          />
          {errors.drinkTime && <p className={styles.errorMessage}>{errors.drinkTime.message}</p>}
        </div>
        
        <div className={`${styles.formGroup} ${styles.formGroupSmallGap}`}>
          <label htmlFor="volume">Enter the value of the water used:</label>
          <Controller
            name="volume"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                value={volume}
                onChange={handleVolumeChange}
                maxLength={4} // Limit to 4 digits
              />
            )}
          />
          {errors.volume && <p className={styles.errorMessage}>{errors.volume.message}</p>}
        </div>
        
        <MainButton text="Save" />
      </form>
    </div>
  );
};

export default WaterModal;
