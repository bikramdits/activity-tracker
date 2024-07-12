import * as Yup from 'yup';
export const ResetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.'
    ),
  confirmPassword: Yup.string()
    .required('Confirm password is required.')
    .oneOf([Yup.ref('password')], 'Passwords must match.'),
});
