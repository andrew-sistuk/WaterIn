import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import clsx from 'clsx';
// import * as Yup from 'yup';
// import { toast, ToastContainer } from 'react-toastify';
import { FiUpload } from 'react-icons/fi';

import css from './UserSettingsForm.module.css';
import MainButton from '../MainButton/MainButton.jsx';
import { selectUser } from '../../redux/auth/selectors.js';
import { patchUser } from '../../redux/auth/operations.js';
import { validationSchema } from '../../validation/userSettings.js';
import { closeModal } from '../../redux/modal/slice.js';
import { toast } from 'react-toastify';

export default function UserSettingsForm() {
  // const [selectedFile, setSelectedFile] = useState(null);

  // const user = useSelector(selectUser);

  // const [name, setName] = useState(user.name);
  // const [gender, setGender] = useState(user.gender);
  // const [weight, setWeight] = useState(user.weight);
  // const [sportHours, setSportHours] = useState(user.sportHours);
  // const [waterRate, setWaterRate] = useState(user.waterRate / 1000);

  // const dispatch = useDispatch();

  // const handleChange = event => {
  //   setSelectedFile(event.target.files[0]);
  // };

  // const handleSetGender = event => {
  //   setGender(event.target.value);
  // };

  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   formState: { errors },
  // } = useForm({ resolver: yupResolver(validationSchema) });

  // let intake = '';

  // useEffect(() => {
  //   if (weight && sportHours && gender) {
  //     const M = parseFloat(weight);
  //     const T = parseFloat(sportHours);

  //     if (gender === 'woman') {
  //       intake = (M * 0.03 + T * 0.4).toFixed(2);
  //     } else if (gender === 'man') {
  //       intake = (M * 0.04 + T * 0.6).toFixed(2);
  //     }
  //     setWaterRate(intake);
  //     setValue('waterIntake', intake);
  //   }
  // }, [weight, sportHours, gender, waterRate, setValue]);

  // const onSubmit = async () => {
  //   const id = user.id;

  //   const data = { name, sportHours, weight, waterRate };

  //   const formData = new FormData();
  //   formData.append('photo', selectedFile);
  //   // formData.append('email', email);
  //   formData.append('name', name);
  //   formData.append('sportHours', sportHours);
  //   formData.append('weight', weight);
  //   formData.append('waterRate', waterRate);
  //   // formData.append('gender', userPatch.gender);
  //   console.log(formData);
  //   console.log(data);
  //   // dispatch(patchUser({ id, formData }));
  // };

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
  }, [user, setValue]);

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
          alt="photo"
        />
        <button className={css.avatarBtn} type="button">
          <label htmlFor="photo">
            <FiUpload size={18} className={css.avatarSvg} />
            Upload a photo
          </label>
        </button>

        <input
          className={css.hiden}
          id="photo"
          type="file"
          accept="image/*,.jpg,.jpeg,.png,.webp,.gif,"
          // onChange={handleChange}
        />
      </div>

      <div className={css.gender}>
        <p htmlFor="gender">Your gender identity</p>
        <div className={css.genderWrapper}>
          <div className={css.genderRadio}>
            <label className={css.label} htmlFor="woman">
              <input
                className={css.genderRadioBtn}
                id="woman"
                type="radio"
                value="woman"
                name="genderRadio"
                checked={user.gender === 'woman'}
                {...register('gender')}
                // onChange={handleSetGender}
              />
              <span className={css.labelText}>Woman</span>
              <img className={css.noCheck} src="/src/img/icons/noCheck.svg" alt="noCheck" />
              <img className={css.check} src="/src/img/icons/check.svg" alt="check" />
            </label>
          </div>

          <div className={css.genderRadio}>
            <label className={css.label} htmlFor="man">
              <input
                className={css.genderRadioBtn}
                id="man"
                type="radio"
                value="man"
                name="genderRadio"
                checked={user.gender === 'man'}
                {...register('gender')}
                // onChange={handleSetGender}
              />
              <span className={css.labelText}>Man</span>

              <img className={css.noCheck} src="/src/img/icons/noCheck.svg" alt="noCheck" />
              <img className={css.check} src="/src/img/icons/check.svg" alt="check" />
            </label>
          </div>
        </div>
      </div>

      <div className={css.container}>
        <div>
          <div className={css.name}>
            <label htmlFor="name">Your name</label>
            <div className={css['box-pass']}>
              <input
                className={clsx(css.input, css.inputName, errors.name && css['error-input'])}
                id="name"
                type="text"
                autoComplete="off"
                defaultValue={name}
                // onChange={event => setName(event.target.value)}
                {...register('name')}
              />
              {errors.name && <p className={css.errorMes}>Enter the name correctly!</p>}
            </div>
          </div>

          <div className={css.email}>
            <label htmlFor="email">Email</label>
            <input
              className={css.input}
              id="email"
              type="text"
              autoComplete="off"
              defaultValue={user.email}
              disabled
              {...register('email')}
            />
          </div>

          <div className={css.dailyNorma}>
            <h3 className={css.dailyNormaTitle}>My daily norma</h3>
            <ul className={css.dailyNormaList}>
              <li>
                For woman:
                <p className={css.dailyNormaFormula}>V=(M*0,03) + (T*0,4)</p>
              </li>
              <li>
                For man:
                <p className={css.dailyNormaFormula}>V=(M*0,04) + (T*0,6)</p>
              </li>
            </ul>
            <p className={css.dailyNormaText}>
              <span className={css.span}>*</span>V is the volume of the water norm in liters per
              day, M is your body weight, T is the time of active sports, or another type of
              activity commensurate in terms of loads (in the absence of these, you must set 0)
            </p>
            <p className={css.dailyNormaTextSpan}>
              <span className={css.span}>!</span>Active time in hours
            </p>
          </div>
        </div>

        <div>
          <div className={css.weight}>
            <label htmlFor="weight">Your weight in kilograms:</label>
            <div className={css['box-pass']}>
              <input
                className={clsx(css.input, css.inputName, errors.weight && css['error-input'])}
                // onChange={event => setWeight(event.target.value)}
                id="weight"
                type="text"
                placeholder="0"
                autoComplete="off"
                defaultValue={user.weight}
                {...register('weight')}
              />
              {errors.weight && <p className={css.errorMes}>Enter the weight correctly!</p>}
            </div>
          </div>

          <div className={css.activityTime}>
            <label htmlFor="sportHours">The time of active participation in sports:</label>
            <div className={css['box-pass']}>
              <input
                className={clsx(css.input, css.inputName, errors.sportHours && css['error-input'])}
                // onChange={event => setSportHours(event.target.value)}
                id="sportHours"
                type="text"
                placeholder="0"
                autoComplete="off"
                defaultValue={user.sportHours}
                {...register('sportHours')}
              />
              {errors.sportHours && (
                <p className={css.errorMes}>Enter the time of activity correctly!</p>
              )}
            </div>
          </div>

          <div className={css.requiredWater}>
            <p>The required amount of water in liters per day:</p>
            <p className={css.water}>
              <span>{user.waterRate}</span>L
            </p>
          </div>

          <div className={css.waterIntake}>
            <label htmlFor="waterRate">Write down how much water you will drink:</label>
            <div className={css['box-pass']}>
              <input
                className={clsx(css.input, css.inputName, errors.waterRate && css['error-input'])}
                defaultValue={user.waterRate}
                placeholder="1.8"
                id="waterRate"
                type="text"
                {...register('waterRate')}
              />
              {errors.waterRate && <p className={css.errorMes}>Water intake will be more 1 L !</p>}
            </div>
          </div>
        </div>
      </div>
      <MainButton className={css.saveBtn} onClick={onSubmit} type="submit" text="Save" />
    </form>
  );
}