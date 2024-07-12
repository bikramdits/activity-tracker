import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address.')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Enter valid email.'
    )
    .required('Email is required.'),
  password: Yup.string().required('Password is required.'),
});
