import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function UserSettingsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

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

  return (
    <form onSubmit={handleSubmit()}>
      <div>
        <label htmlFor="avatar">Upload a photo</label>
        <input id="avatar" type="file" {...register('avatar')} />
      </div>
      <div>
        <label htmlFor="gender">Your gender identity</label>
        Woman
        <input id="gender" type="radio" {...register('test')} value="woman" />
        Man
        <input id="gender" type="radio" {...register('test')} value="man" />
      </div>
      <div>
        <label htmlFor="name">Yuor name</label>
        <input id="name" type="text" {...register('name')} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" {...register('email')} />
      </div>

      <div>
        <h3>My daily norma</h3>
        <ul>
          <li>
            For woman:
            <p>V=(M*0,03) + (T*0,4)</p>
          </li>
          <li>
            For man:
            <p>V=(M*0,04) + (T*0,6)</p>
          </li>
        </ul>
        <p>
          <span>*</span>V is the volume of the water norm in liters per day, M is your body weight,
          T is the time of active sports, or another type of activity commensurate in terms of loads
          (in the absence of these, you must set 0)
        </p>
        <p>
          <span>!</span>Active time in hours
        </p>
      </div>

      <div>
        <label htmlFor="weight">Your weight in kilograms:</label>
        <input id="weight" type="text" {...register('weight')} />
      </div>
      <div>
        <label htmlFor="activity-time">The time of active participation in sports:</label>
        <input id="activity-time" type="text" {...register('activity-time')} />
      </div>
      <p>The required amount of water in liters per day:</p>
      {/* <p>Calculate water</p> */}
      <div>
        <label htmlFor="will-drink">Write down how much water you will drink:</label>
        <input id="will-drink" type="text" {...register('will-drink')} />
      </div>
    </form>
  );
}
