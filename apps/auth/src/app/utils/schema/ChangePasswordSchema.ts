import * as Yup from 'yup';

export const ChangePasswordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Old Password is required.'),
  newPassword: Yup.string()
    .required('New Password is required.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.'
    ),
  confirmNewPassword: Yup.string()
    .required('Confirm New Password is required.')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match.'),
});
