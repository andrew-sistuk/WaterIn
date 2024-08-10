import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiUpload } from 'react-icons/fi';

import { selectUser } from '../../redux/auth/selectors.js';
import { patchUser } from '../../redux/auth/operations';
import MainButton from '../MainButton/MainButton';
import css from './UserSettingsForm.module.css';
import { validationSchema } from '../../validation/userSettings.js';

export default function UserSettingsForm({ closeModal }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      weight: user.weight,
      sportHours: user.sportHours,
      waterRate: user.waterRate / 1000, // convert ml to liters
      gender: user.gender,
    },
  });

  useEffect(() => {
    calculateWaterIntake();
  }, [user.weight, user.sportHours, user.gender]);

  const calculateWaterIntake = () => {
    const { weight, sportHours, gender } = user;

    let intake = '';
    if (weight && sportHours && gender) {
      const M = parseFloat(weight);
      const T = parseFloat(sportHours);

      if (gender === 'woman') {
        intake = (M * 0.03 + T * 0.4).toFixed(2);
      } else if (gender === 'man') {
        intake = (M * 0.04 + T * 0.6).toFixed(2);
      }
      setValue('waterRate', intake);
    }
  };

  const onSubmit = async data => {
    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);
      formData.append('name', data.name);
      formData.append('sportHours', data.sportHours);
      formData.append('weight', data.weight);
      formData.append('waterRate', data.waterRate);

      const response = await dispatch(patchUser({ id: user.id, formData }));

      if (response.error) {
        toast.error(response.error.message || 'Failed to update user data');
      } else {
        toast.success('User data updated successfully');
        closeModal();
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.avatar}>
        <img
          className={css.avatarImg}
          src={selectedFile ? URL.createObjectURL(selectedFile) : user.photo}
          alt="User Avatar"
        />
        <label htmlFor="photo" className={css.avatarBtn}>
          <FiUpload size={18} className={css.avatarSvg} />
          Upload a photo
        </label>
        <input
          id="photo"
          type="file"
          accept="image/*,.jpg,.jpeg,.png,.webp,.gif"
          onChange={e => setSelectedFile(e.target.files[0])}
          className={css.hidden}
        />
      </div>

      <div className={css.gender}>
        <p>Your gender identity</p>
        <div className={css.genderWrapper}>
          <label className={css.label}>
            <input type="radio" value="woman" {...register('gender')} />
            Woman
          </label>
          <label className={css.label}>
            <input type="radio" value="man" {...register('gender')} />
            Man
          </label>
        </div>
      </div>

      <div className={css.container}>
        <div>
          <div className={css.name}>
            <label htmlFor="name">Your name</label>
            <input
              id="name"
              type="text"
              autoComplete="off"
              {...register('name')}
              className={errors.name ? css['error-input'] : ''}
            />
            {errors.name && <p className={css.errorMes}>{errors.name.message}</p>}
          </div>

          <div className={css.email}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="off"
              {...register('email')}
              disabled
              className={errors.email ? css['error-input'] : ''}
            />
            {errors.email && <p className={css.errorMes}>{errors.email.message}</p>}
          </div>

          <div className={css.weight}>
            <label htmlFor="weight">Your weight in kilograms</label>
            <input
              id="weight"
              type="text"
              {...register('weight')}
              className={errors.weight ? css['error-input'] : ''}
            />
            {errors.weight && <p className={css.errorMes}>{errors.weight.message}</p>}
          </div>

          <div className={css.activityTime}>
            <label htmlFor="sportHours">Active sports hours per day</label>
            <input
              id="sportHours"
              type="text"
              {...register('sportHours')}
              className={errors.sportHours ? css['error-input'] : ''}
            />
            {errors.sportHours && <p className={css.errorMes}>{errors.sportHours.message}</p>}
          </div>

          <div className={css.requiredWater}>
            <p>The required amount of water per day:</p>
            <input
              id="waterRate"
              type="text"
              {...register('waterRate')}
              className={errors.waterRate ? css['error-input'] : ''}
            />
            {errors.waterRate && <p className={css.errorMes}>{errors.waterRate.message}</p>}
          </div>
        </div>
      </div>

      <MainButton className={css.saveBtn} type="submit" text="Save" />
    </form>
  );
}
