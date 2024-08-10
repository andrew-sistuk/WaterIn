import clsx from 'clsx';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiUpload } from 'react-icons/fi';
import { BsExclamationLg } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors.js';
import { closeModal } from '../../redux/modal/slice.js';

import css from './UserSettingModal.module.css';
import { validationSchema } from '../../validation/userSettings.js';

export default function UserSettingModal() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState(user.photo);
  const [name, setName] = useState(user.name);
  const [gender, setGender] = useState(user.gender);
  const [weight, setWeight] = useState(user.weight);
  const [sportHours, setSportHours] = useState(user.sportHours);
  const [waterRate, setWaterRate] = useState(user.waterRate.toFixed(1));

  const inputFileRef = useRef(null);

  const handleClick = event => {
    event.preventDefault();
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
    defaultValues: {
      name: user.name,
      email: user.email,
      weight: user.weight,
      sportHours: user.sportHours,
      waterRate: 1.8,
    },
  });

  const onChangeAvatar = event => {
    const avatarImg = event.target.files[0];
    if (avatarImg) {
      setPhoto(URL.createObjectURL(avatarImg));
      // setPhoto(avatarImg);
    }
  };

  const handleSetGender = event => {
    setGender(event.target.value);
  };

  useEffect(() => {
    if (weight && sportHours && gender) {
      const M = parseFloat(weight);
      const T = parseFloat(sportHours);
      let intake = '';

      if (gender === 'woman') {
        intake = (M * 0.03 + T * 0.4).toFixed(1);
      } else if (gender === 'man') {
        intake = (M * 0.04 + T * 0.6).toFixed(1);
      }
      setWaterRate(intake);
      setValue('waterIntake', intake);
    }
  }, [weight, sportHours, gender, control, setValue]);

  const onSubmit = data => {
    const formData = new FormData();
    formData.append('id', user.id);
    formData.append('email', user.email);
    formData.append('name', name);
    formData.append('gender', gender);
    formData.append('weight', weight);
    formData.append('sportHours', sportHours);
    formData.append('waterRate', data.waterRate);

    if (photo) {
      formData.append('photo', photo);
    }

    dispatch(closeModal());

    // Для перегляду об`экту що створюється при сабміті форми
    // У продакшені ВИДАЛИТИ !!!
    console.log('Form Data:', Object.fromEntries(formData));
  };

  return (
    <div className={css.wraper}>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={css.title}>Setting</h2>
        <div className={css.avatar}>
          <img className={css.avatarImg} src={photo} alt="photo" />
          <button className={css.avatarBtn} type="button" onClick={handleClick}>
            <FiUpload size={18} className={css.avatarSvg} />
            Upload a photo
          </button>
          <input
            className={css.avatarInput}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={onChangeAvatar}
            ref={inputFileRef}
          />
        </div>
        <div className={css.userInfoContainer}>
          <div className={css.userInfoSection}>
            <div className={css.gender}>
              <p htmlFor="gender" className={css.params}>
                Your gender identity
              </p>
              <div className={css.genderWrapper}>
                <div className={css.genderRadio}>
                  <label className={css.label} htmlFor="woman">
                    <input
                      className={css.genderRadioBtn}
                      id="woman"
                      type="radio"
                      value="woman"
                      name="gender"
                      checked={gender === 'woman'}
                      onChange={handleSetGender}
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
                      name="gender"
                      checked={gender === 'man'}
                      onChange={handleSetGender}
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
                  <label htmlFor="name" className={css.params}>
                    Your name
                  </label>
                  <div>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <input
                          className={clsx(
                            css.input,
                            css.inputName,
                            errors.name && css['error-input']
                          )}
                          id="name"
                          type="text"
                          autoComplete="off"
                          placeholder="Enter your name"
                          {...field}
                          onChange={e => {
                            field.onChange(e);
                            setName(e.target.value);
                          }}
                        />
                      )}
                    />
                    {errors.name && <p className={css.errorMes}>{errors.name.message}</p>}
                  </div>
                </div>
                <div className={css.email}>
                  <label htmlFor="email" className={css.params}>
                    Email
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={clsx(
                          css.input,
                          css.inputName,
                          errors.email && css['error-input']
                        )}
                        id="email"
                        type="text"
                        autoComplete="off"
                        disabled
                        {...field}
                      />
                    )}
                  />
                  {errors.email && <p className={css.errorMes}>{errors.email.message}</p>}
                </div>
                <div className={css.dailyNorma}>
                  <p className={css.params}>My daily norma</p>
                  <ul className={css.dailyNormaList}>
                    <li className={css.formulaTitle}>
                      For woman:
                      <p className={css.dailyNormaFormula}>V=(M*0,03) + (T*0,4)</p>
                    </li>
                    <li className={css.formulaTitle}>
                      For man:
                      <p className={css.dailyNormaFormula}>V=(M*0,04) + (T*0,6)</p>
                    </li>
                  </ul>
                  <div className={css.dailyNormaTextContainer}>
                    <p className={css.dailyNormaText}>
                      <span className={css.span}>*</span> V is the volume of the water norm in
                      liters per day, M is your body weight, T is the time of active sports, or
                      another type of activity commensurate in terms of loads (in the absence of
                      these, you must set 0)
                    </p>
                  </div>
                  <p className={css.activeText}>
                    <BsExclamationLg className={css.activeIcon} size={18} />
                    Active time in hours
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={css.userInfoSection}>
            <div>
              <div className={css.weight}>
                <label htmlFor="weight">Your weight in kilograms:</label>
                <div className={css['box-pass']}>
                  <Controller
                    name="weight"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={clsx(
                          css.input,
                          css.inputName,
                          errors.weight && css['error-input']
                        )}
                        id="weight"
                        type="text"
                        placeholder="0"
                        autoComplete="off"
                        {...field}
                        onChange={e => {
                          field.onChange(e);
                          setWeight(e.target.value);
                        }}
                      />
                    )}
                  />
                  {errors.weight && <p className={css.errorMes}>{errors.weight.message}</p>}
                </div>
              </div>

              <div className={css.activityTime}>
                <label htmlFor="sportHours">The time of active participation in sports:</label>
                <div className={css['box-pass']}>
                  <Controller
                    name="sportHours"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={clsx(
                          css.input,
                          css.inputName,
                          errors.sportHours && css['error-input']
                        )}
                        id="sportHours"
                        type="text"
                        placeholder="0"
                        autoComplete="off"
                        {...field}
                        onChange={e => {
                          field.onChange(e);
                          setSportHours(e.target.value);
                        }}
                      />
                    )}
                  />
                  {errors.sportHours && <p className={css.errorMes}>{errors.sportHours.message}</p>}
                </div>
              </div>

              <div className={css.requiredWater}>
                <p className={css.reqWaterDescription}>
                  The required amount of water in liters per day:
                </p>
                <p className={css.water}>{waterRate} L</p>
              </div>

              <div className={css.waterIntake}>
                <label htmlFor="waterRate" className={css.params}>
                  Write down how much water you will drink:
                </label>
                <div className={css['box-pass']}>
                  <Controller
                    name="waterRate"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={clsx(
                          css.input,
                          css.inputName,
                          errors.waterRate && css['error-input']
                        )}
                        id="waterRate"
                        type="text"
                        placeholder="1.8"
                        autoComplete="off"
                        value={waterRate}
                        {...field}
                      />
                    )}
                  />
                  {errors.waterRate && <p className={css.errorMes}>{errors.waterRate.message}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className={css.saveBtn} type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
