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
import { editWaterNote, addWaterNote } from '../../redux/day/operations.js';
import { selectIsToken } from '../../redux/auth/selectors.js';
import { fetchDates } from '../../redux/dates/operations.js';
import { selectItemsDay } from '../../redux/changeDay/changeDay.js';
import isToday from '../../utils/isToday.js';
import createMonth from '../../utils/createMonth';

import { useTranslation } from 'react-i18next';

export const TIME_PATTERN = '^(?:0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$';

const WaterModal = () => {
  const token = useSelector(selectIsToken);
  let type = useSelector(selectTypeModal);
  const dataInfo = useSelector(selectModalInfo);
  const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const [volume, setVolume] = useState(50);
  const [drinkTime, setDrinkTime] = useState(timeNow);
  const lastDay = useSelector(selectItemsDay);

  const { t } = useTranslation();

  const WaterSchema = Yup.object().shape({
    volume: Yup.number()
      .typeError(`${t('modals.addEdit.errors.type')}`)
      .required(`${t('modals.addEdit.errors.volumeRequired')}`)
      .min(50, `${t('modals.addEdit.errors.volumeMin')}`)
      .max(9999, `${t('modals.addEdit.errors.volumeMax')}`),
    drinkTime: Yup.string()
      .required(`${t('modals.addEdit.errors.drinkRequired')}`)
      .matches(TIME_PATTERN, `${t('modals.addEdit.errors.drinkMatches')}`),
  });

  let title;
  let subtitle;

  if (type === 'editWater') {
    title = t('modals.addEdit.edit');
    subtitle = t('modals.addEdit.correct');
  } else if (type === 'addWater') {
    title = t('modals.addEdit.add');
    subtitle = t('modals.addEdit.choose');
  }

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
    trigger, // Добавляем trigger для валидации в реальном времени
  } = useForm({
    defaultValues: {
      volume,
      drinkTime,
    },
    resolver: yupResolver(WaterSchema),
    mode: 'onChange', // Включаем валидацию при каждом изменении
  });

  const onSubmit = () => {
    const transformedData = {
      volume: parseInt(volume, 10),
      drinkTime,
      token,
      lastDay,
    };
    if (type === 'editWater') {
      dispatch(editWaterNote({ ...transformedData, _id: dataInfo._id }));

      setTimeout(() => {
        dispatch(fetchDates(new Date(lastDay).getTime() + 10800000));
      }, 1000);
    } else if (type === 'addWater') {
      dispatch(addWaterNote(transformedData));
      setTimeout(() => {
        dispatch(fetchDates(new Date(lastDay).getTime() + 10800000));
      }, 1000);
    }
    dispatch(closeModal());
  };

  const handleIncrease = () => {
    const newVolume = parseInt(volume, 10) + 50 || 50;
    if (newVolume <= 9999) {
      setVolume(newVolume.toString());
      setValue('volume', newVolume);
      trigger('volume'); // Триггерим валидацию после изменения
    }
  };

  const handleDecrease = () => {
    if (volume > 0) {
      const newVolume = parseInt(volume, 10) - 50 || 50;
      if (newVolume >= 0) {
        setVolume(newVolume.toString());
        setValue('volume', newVolume);
        trigger('volume'); // Триггерим валидацию после изменения
      }
    }
  };

  const day1 = useSelector(selectItemsDay);
  const { monthName } = createMonth({ date: new Date(day1) });

  const fullDay = `${t('modals.addEdit.errors.attention')} ${new Date(day1).getDate()}, ${t(
    `ChooseDate.${monthName}`
  )}`;
  return (
    <div className={styles.waterModalContainer}>
      <h2 className={styles.waterModalTitle}>{title}</h2>
      {!isToday(lastDay) && <span className={styles.notToday}>{fullDay}</span>}
      <h3 className={styles.waterModalSubtitle}>{subtitle}</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.waterForm}>
        <div className={styles.formGroup}>
          <label htmlFor="volume" className={styles.formLabel}>
            {t('modals.addEdit.amount')}
          </label>
          <div className={styles.amountControl}>
            <button type="button" onClick={handleDecrease}>
              <FiMinus />
            </button>
            <div>
              {volume} {t('dailyInfo.ml')}
            </div>
            <button type="button" onClick={handleIncrease}>
              <FiPlus />
            </button>
          </div>
          <Controller
            name="volume"
            control={control}
            render={({ field }) => <input type="hidden" {...field} value={volume} />}
          />
        </div>
        <div className={`${styles.formGroup} ${styles.formGroupSmallGap}`}>
          <label htmlFor="drinkTime" className={styles.formLabel}>
            {t('modals.addEdit.time')}
          </label>
          <Controller
            name="drinkTime"
            control={control}
            render={({ field }) => (
              <input
                type="time"
                {...field}
                onBlur={() => trigger('drinkTime')}
                onChange={e => {
                  const value = e.target.value;
                  if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
                    setDrinkTime(value);
                    field.onChange(e);
                    trigger('drinkTime');
                  }
                }}
                value={drinkTime}
              />
            )}
          />
          {errors.drinkTime && <p className={styles.errorMessage}>{errors.drinkTime.message}</p>}
        </div>
        <div className={`${styles.formGroup} ${styles.formGroupSmallGap}`}>
          <label htmlFor="volume">{t('modals.addEdit.value')}</label>
          <Controller
            name="volume"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                onBlur={() => trigger('volume')}
                value={volume}
                onChange={e => {
                  const value = e.target.value;
                  if (value === '' || (Number(value) <= 9999 && Number(value) >= 1)) {
                    setVolume(value);
                    field.onChange(e);
                    trigger('volume');
                  }
                }}
              />
            )}
          />
          {errors.volume && <p className={styles.errorMessage}>{errors.volume.message}</p>}
        </div>
        <MainButton text={"Save"} />
      </form>
    </div>
  );
};

export default WaterModal;
