import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiUpload } from 'react-icons/fi';
// import { FiLogOut } from 'react-icons/fi';
import { BsExclamationLg } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors.js';

import css from './UserSettingModal.module.css';

export default function UserSettingModal() {
  const user = useSelector(selectUser);

  // const user = {
  //   _id: '66afc309b11d818541430639',
  //   email: 'deidar@gmail.com',
  //   name: 'Deidar',
  //   photo: 'https://res.cloudinary.com/dqxbq53ls/image/upload/v1722796433/jngdxrfxafigmgez1wdr.jpg',
  //   sportHours: 4,
  //   weight: 44,
  //   waterRate: 1500,
  //   gender: 'man',
  // };

  const [photo, setPhoto] = useState(user.photo);
  const [name, setName] = useState(user.name);
  const [gender, setGender] = useState(user.gender);
  const [weight, setWeight] = useState(user.weight);
  const [sportHours, setSportHours] = useState(user.sportHours);
  const [waterRate, setWaterRate] = useState(user.waterRate / 1000);

  const onChangeAvatar = event => {
    const avatarImg = event.target.files[0];
    if (avatarImg) {
      setPhoto(URL.createObjectURL(avatarImg));
    }
  };

  const handleSetGender = event => {
    setGender(event.target.value);
    console.log(event.target.value);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(3).max(20),
    email: Yup.string().email('Invalid email').required('Email is required'),
    weight: Yup.number()
      .required('Weight is required')
      .positive('Weight must be positive')
      .min(40, 'Weight must be at least 40 kg')
      .max(180, 'Weight must be at most 180 kg'),
    sportHours: Yup.number()
      .required('Activity time is required')
      .positive('Activity time must be positive')
      .min(1, 'Activity time will be more 1 hour')
      .max(8, 'Activity time will not be more 8 hour'),
    waterRate: Yup.number()
      .required('Water intake is required')
      .positive('Water intake must be positive')
      .min(1, 'Water intake will be more 1 L !'),
  });

  const {
    // register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  let intake = '';

  useEffect(() => {
    if (weight && sportHours && gender) {
      const M = parseFloat(weight);
      const T = parseFloat(sportHours);

      // console.log(M);
      // console.log(T);
      // console.log(gender);

      if (gender === 'woman') {
        intake = (M * 0.03 + T * 0.4).toFixed(1);
      } else if (gender === 'man') {
        intake = (M * 0.04 + T * 0.6).toFixed(1);
      }
      setWaterRate(intake);
      setValue('waterIntake', intake);

      // console.log(intake);
    }
  }, [weight, sportHours, gender, waterRate, setValue]);

  const onSubmit = async data => {
    const formData = {
      _id: user._id,
      email: user.email,
      name: name,
      photo: photo,
      sportHours: sportHours,
      weight: weight,
      waterRate: waterRate,
      gender: gender,
    };
    console.log(formData);
    console.log(data);

    patchUser(formData);
  };

  // try {
  //   const response = await fetch('/tracker', {
  //     method: 'POST',
  //     body: formData,
  //   });

  //   if (!response.ok) {
  //     // iziToast
  //   }

  //   const result = await response.json();

  //   onUpdate(result);

  //   // iziToast
  //   onClose();
  // } catch (error) {
  //   // iziToast
  // }

  async function patchUser(data) {
    try {
      const result = await axios.patch(`https://waterin-server.onrender.com/users/${data._id}`, {
        body: data,
      });
      console.log(result);

      // return result
    } catch (err) {
      console.log('Error while trying to patch user!');
    }
  }

  return (
    <div className={css.wraper}>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={css.title}>Setting</h2>
        <div className={css.avatar}>
          <img className={css.avatarImg} src={photo} alt="photo" />
          <button className={css.avatarBtn} onClick={onChangeAvatar} type="button">
            <FiUpload size={18} className={css.avatarSvg} />
            Upload a photo
          </button>
          <input className={css.avatarInput} type="file" accept=".jpg,.jpeg,.png,.webp" />
        </div>
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
                <input
                  className={clsx(css.input, css.inputName, errors.name && css['error-input'])}
                  id="name"
                  type="text"
                  autoComplete="off"
                  defaultValue={name}
                  onChange={event => setName(event.target.value)}
                  // {...register('name')}
                />
                {errors.name && <p className={css.errorMes}>Enter the name correctly!</p>}
              </div>
            </div>
            <div className={css.email}>
              <label htmlFor="email" className={css.params}>
                Email
              </label>
              <input
                className={css.input}
                id="email"
                type="text"
                autoComplete="off"
                defaultValue={user.email}
                disabled
              />
            </div>
            <div className={css.dailyNorma}>
              <p className={css.params}>My daily norma</p>
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
              <div className={css.dailyNormaTextContainer}>
                <p className={css.dailyNormaText}>
                  <span className={css.span}>*</span> V is the volume of the water norm in liters
                  per day, M is your body weight, T is the time of active sports, or another type of
                  activity commensurate in terms of loads (in the absence of these, you must set 0)
                </p>
              </div>
              <p className={css.activeText}>
                <BsExclamationLg className={css.activeIcon} size={18} />
                Active time in hours
              </p>
            </div>
          </div>
          <div>
            <div className={css.weight}>
              <label htmlFor="weight">Your weight in kilograms:</label>
              <div className={css['box-pass']}>
                <input
                  className={clsx(css.input, css.inputName, errors.weight && css['error-input'])}
                  onChange={event => setWeight(event.target.value)}
                  id="weight"
                  type="text"
                  placeholder="0"
                  autoComplete="off"
                  defaultValue={weight}
                  // {...register('weight')}
                />
                {errors.weight && <p className={css.errorMes}>Enter the weight correctly!</p>}
              </div>
            </div>

            <div className={css.activityTime}>
              <label htmlFor="sportHours">The time of active participation in sports:</label>
              <div className={css['box-pass']}>
                <input
                  className={clsx(
                    css.input,
                    css.inputName,
                    errors.sportHours && css['error-input']
                  )}
                  onChange={event => setSportHours(event.target.value)}
                  id="sportHours"
                  type="text"
                  placeholder="0"
                  autoComplete="off"
                  defaultValue={sportHours}
                  // {...register('sportHours')}
                />
                {errors.sportHours && (
                  <p className={css.errorMes}>Enter the time of activity correctly!</p>
                )}
              </div>
            </div>

            <div className={css.requiredWater}>
              <p>The required amount of water in liters per day:</p>
              <p className={css.water}>{waterRate} L</p>
            </div>

            <div className={css.waterIntake}>
              <label htmlFor="waterRate" className={css.params}>
                Write down how much water you will drink:
              </label>
              <div className={css['box-pass']}>
                <input
                  className={clsx(css.input, css.inputName, errors.waterRate && css['error-input'])}
                  defaultValue={waterRate}
                  placeholder="1.8"
                  id="waterRate"
                  type="text"
                  // {...register('waterRate')}
                />
                {errors.waterRate && (
                  <p className={css.errorMes}>Water intake will be more 1 L !</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <button className={css.saveBtn} type="submit">
          Save
        </button>
        <ToastContainer />
      </form>
    </div>
  );
}
