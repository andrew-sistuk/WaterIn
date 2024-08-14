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
import NoCheck from '../../assets/icons/noCheck.svg?react';
import Check from '../../assets/icons/check.svg?react';

import { useTranslation } from 'react-i18next';

import css from './UserSettingModal.module.css';
import { patchUser } from '../../redux/auth/operations.js';
import Languages from '../Languages/Languages.jsx';

const regex = {
  emailRegexp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
};

export default function UserSettingModal() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState(user.name);
  const [gender, setGender] = useState(user.gender);
  const [weight, setWeight] = useState(user.weight);
  const [sportHours, setSportHours] = useState(user.sportHours);
  const [waterRate, setWaterRate] = useState(user.waterRate.toFixed(1) / 1000);

  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(`${t('modals.UserSettingsForm.errors.nameRequired')}`)
      .min(3)
      .max(40),
    email: Yup.string()
      .email(`${t('modals.UserSettingsForm.errors.emailInvalid')}`)
      .required(`${t('modals.UserSettingsForm.errors.emailRequired')}`)
      .matches(regex.emailRegexp, `${t('modals.UserSettingsForm.errors.emailMatch')}`),
    weight: Yup.number()
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      // .required(`${t('modals.UserSettingsForm.errors.weightRequired')}`)
      .positive(`${t('modals.UserSettingsForm.errors.weightPositive')}`)
      .min(35, `${t('modals.UserSettingsForm.errors.weightMin')}`)
      .max(150, `${t('modals.UserSettingsForm.errors.weightMax')}`),
    sportHours: Yup.number()
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      // .required(`${t('modals.UserSettingsForm.errors.sportHoursRequired')}`)
      .positive(`${t('modals.UserSettingsForm.errors.sportHoursPositive')}`)
      .min(1, `${t('modals.UserSettingsForm.errors.sportHoursMin')}`)
      .max(10, `${t('modals.UserSettingsForm.errors.sportHoursMax')}`),
    waterRate: Yup.number()
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required(`${t('modals.UserSettingsForm.errors.waterRateRequired')}`)
      .positive(`${t('modals.UserSettingsForm.errors.waterRatePositive')}`)
      .min(1, `${t('modals.UserSettingsForm.errors.waterRateMin')}`),
  });

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
      waterRate: waterRate,
    },
  });

  const onChangeAvatar = event => {
    const avatarImg = event.target.files[0];
    if (avatarImg) {
      setPhoto(avatarImg);
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
    formData.append('name', name);
    formData.append('email', user.email);
    formData.append('gender', gender);
    formData.append('waterRate', data.waterRate * 1000);

    if (weight !== '') {
      formData.append('weight', weight);
    }

    if (sportHours !== '') {
      formData.append('sportHours', sportHours);
    }

    if (photo) {
      formData.append('photo', photo);
    }

    const userPatch = Object.fromEntries(formData);
    console.log(userPatch);

    dispatch(patchUser({ Id: user.id, userPatch }));
    dispatch(closeModal());
  };

  return (
    <div className={css.wraper}>
      <Languages type={true} />

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={css.title}>{t('modals.UserSettingsForm.settings')}</h2>
        <div className={css.avatar}>
          <img
            className={css.avatarImg}
            src={photo ? URL.createObjectURL(photo) : user.photo}
            alt="photo"
          />
          <button className={css.avatarBtn} type="button" onClick={handleClick}>
            <FiUpload size={18} className={css.avatarSvg} />
            {t('modals.UserSettingsForm.uploadPhotoBtn')}
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
                {t('modals.UserSettingsForm.yourGenderLabel')}
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

                    <span className={css.labelText}>
                      {t('modals.UserSettingsForm.femaleGenderLabel')}
                    </span>
                    <NoCheck className={css.noCheck} />
                    <Check className={css.check} />
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

                    <span className={css.labelText}>
                      {t('modals.UserSettingsForm.maleGenderLabel')}
                    </span>
                    <NoCheck className={css.noCheck} />
                    <Check className={css.check} />
                  </label>
                </div>
              </div>
            </div>
            <div className={css.container}>
              <div>
                <div className={css.name}>
                  <label htmlFor="name" className={css.params}>
                    {t('modals.UserSettingsForm.yourNameLabel')}
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
                          placeholder={t('modals.UserSettingsForm.labelEmail')}
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
                    {t('modals.UserSettingsForm.placeEmail')}
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
                  <p className={css.params}>{t('modals.UserSettingsForm.dailyNorma')}</p>
                  <ul className={css.dailyNormaList}>
                    <li className={css.formulaTitle}>
                      {t('modals.UserSettingsForm.forWomanP')}
                      <p className={css.dailyNormaFormula}>V=(M*0,03) + (T*0,4)</p>
                    </li>
                    <li className={css.formulaTitle}>
                      {t('modals.UserSettingsForm.forManP')}
                      <p className={css.dailyNormaFormula}>V=(M*0,04) + (T*0,6)</p>
                    </li>
                  </ul>
                  <div className={css.dailyNormaTextContainer}>
                    <p className={css.dailyNormaText}>
                      <span className={css.span}>*</span> {t('modals.UserSettingsForm.startText')}
                    </p>
                  </div>
                  <p className={css.activeText}>
                    <BsExclamationLg className={css.activeIcon} size={18} />
                    {t('modals.UserSettingsForm.activeText')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={css.userInfoSection}>
            <div>
              <div className={css.weight}>
                <label htmlFor="weight">{t('modals.UserSettingsForm.infoUser')}</label>
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
                <label htmlFor="sportHours">
                  {t('modals.UserSettingsForm.TheTimeSportsLabel')}
                </label>
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
                  {t('modals.UserSettingsForm.requiredWater')}
                </p>
                <p className={css.water}>
                  {waterRate} {t('modals.UserSettingsForm.l')}
                </p>
              </div>

              <div className={css.waterIntake}>
                <label htmlFor="waterRate" className={css.params}>
                  {t('modals.UserSettingsForm.writeDownLabel')}
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
          {t('modals.UserSettingsForm.saveBtn')}
        </button>
      </form>
    </div>
  );
}
