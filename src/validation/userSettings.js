import * as Yup from 'yup';

// export const validationSchema = Yup.object().shape({
//   name: Yup.string()
//     .required('Name is required')
//     .min(3, 'Minimum 3 characters')
//     .max(20, 'Maximum 20 characters'),
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   weight: Yup.number()
//     .required('Weight is required')
//     .positive('Weight must be positive')
//     .min(40, 'Weight must be at least 40 kg')
//     .max(180, 'Weight must be at most 180 kg'),
//   sportHours: Yup.number()
//     .required('Activity time is required')
//     .positive('Activity time must be positive')
//     .min(1, 'Activity time must be at least 1 hour')
//     .max(8, 'Activity time must be at most 8 hours'),
//   waterRate: Yup.number()
//     .required('Water intake is required')
//     .positive('Water intake must be positive')
//     .min(1, 'Water intake must be at least 1 L'),
// });

const regex = {
  emailRegexp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(3).max(40),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required')
    .matches(regex.emailRegexp, 'Invalid e-mail format: example@mail.com'),
  weight: Yup.number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required('Weight is required')
    .positive('Weight must be positive')
    .min(20, 'Weight must be at least 20 kg')
    .max(180, 'Weight must be at most 180 kg'),
  sportHours: Yup.number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required('Activity time is required')
    .positive('Activity time must be positive')
    .min(1, 'Activity time will be more 1 hour')
    .max(8, 'Activity time will not be more 8 hour'),
  waterRate: Yup.number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required('Water intake is required')
    .positive('Water intake must be positive')
    .min(1, 'Water intake will be more 1 L !'),
});
