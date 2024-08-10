import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Minimum 3 characters')
    .max(20, 'Maximum 20 characters'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  weight: Yup.number()
    .required('Weight is required')
    .positive('Weight must be positive')
    .min(40, 'Weight must be at least 40 kg')
    .max(180, 'Weight must be at most 180 kg'),
  sportHours: Yup.number()
    .required('Activity time is required')
    .positive('Activity time must be positive')
    .min(1, 'Activity time must be at least 1 hour')
    .max(8, 'Activity time must be at most 8 hours'),
  waterRate: Yup.number()
    .required('Water intake is required')
    .positive('Water intake must be positive')
    .min(1, 'Water intake must be at least 1 L'),
});
