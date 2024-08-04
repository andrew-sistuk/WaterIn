import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiUpload } from 'react-icons/fi';
import * as Yup from 'yup';
import css from './UserSettingsForm.module.css';
// import { useState } from 'react';

export default function UserSettingsForm({ onClose, onUpdate }) {
  // const [avatar, setAvatar] = useState(null);

  // const onChangeAvatar = event => {
  //   const avatarImg = event.target.files[0];
  //   if (avatarImg) {
  //     setAvatar(URL.createObjectURL(avatarImg));
  //   }
  // };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    weight: Yup.number().required('Weight is required').positive('Weight must be positive'),
    activityTime: Yup.number()
      .required('Activity time is required')
      .positive('Activity time must be positive'),
    waterIntake: Yup.number()
      .required('Water intake is required')
      .positive('Water intake must be positive'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async data => {
    const formData = new FormData();
    formData.append('avatar', data.avatar[0]);
    formData.append('gender', data.gender);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('weight', data.weight);
    formData.append('activityTime', data.activityTime);
    formData.append('waterIntake', data.waterIntake);

    try {
      const response = await fetch('/tracker', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        // iziToast
      }

      const result = await response.json();

      onUpdate(result);

      // iziToast
      onClose();
    } catch (error) {
      // iziToast
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.avatar}>
        <img className={css.avatarImg} src="" alt="avatar" />
        <button className={css.avatarBtn} type="button">
          <FiUpload size={18} className={css.avatarSvg} />
          Upload a photo
        </button>
        <input
          className={css.avatarInput}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          {...register('avatar')}
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
                {...register('test')}
                checked
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
                {...register('test')}
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
            <input
              className={css.input}
              id="name"
              type="text"
              // placeholder="User"
              {...register('name')}
            />
            {errors.name && 'Enter the name correctly!'}
          </div>

          <div className={css.email}>
            <label htmlFor="email">Email</label>
            <input className={css.input} id="email" type="text" {...register('email')} />
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
            <input
              className={css.input}
              id="weight"
              type="text"
              placeholder="0"
              {...register('weight')}
            />
          </div>

          <div className={css.activityTime}>
            <label htmlFor="activityTime">The time of active participation in sports:</label>
            <input
              className={css.input}
              id="activityTime"
              type="text"
              placeholder="0"
              {...register('activityTime')}
            />
          </div>

          <div className={css.requiredWater}>
            <p>The required amount of water in liters per day:</p>
            <p className={css.water}>
              <span>1.8</span>L
            </p>
          </div>

          <div className={css.waterIntake}>
            <label htmlFor="waterIntake">Write down how much water you will drink:</label>
            <input
              className={css.input}
              id="waterIntake"
              type="text"
              {...register('waterIntake')}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
