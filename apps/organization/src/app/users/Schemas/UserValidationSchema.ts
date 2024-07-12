import * as Yup from 'yup';

export const UserValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, 'First name is invalid.')
    .required('First name is required.')
    .max(30, 'First name must be 30 characters or less.')
    .min(3, 'First name must be 3 characters or more.'),

  lastName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Last name is invalid.')
    .required('Last name is required.')
    .max(30, 'Last name must be 30 characters or less.')
    .min(3, 'Last name must be 3 characters or more.'),
  memberId: Yup.string().required('MemberId is required.'),
  dob: Yup.string().required('DOB is required.'),
  employeeId: Yup.string().required('EmployeeId is required.'),
  companyEmail: Yup.string()
    .email()
    .required('Company email is required.')
    .test(
      'email-contains-word-and-number.',
      'Email must contain both a word and a number.',
      (value) => {
        const hasWord = /[a-zA-Z]+/.test(value);
        // const hasNumber = /\d+/.test(value);
        return hasWord;
        // && hasNumber;
      }
    ),
  workPhone: Yup.string()
    .matches(/^\d{12}$/, 'Work phone maximum 12 digits.')
    .required('Work phone is required.'),
  personalPhone: Yup.string()
    .matches(/^\d{12}$/, 'Personal phone maximum 12 digits.')
    .required('Personal phone is required.'),
  dateOfJoining: Yup.string().required('Date of joining is required.'),
  reportingManagerId: Yup.string().required('Reporting manager is required.'),
  // backupManagerId: Yup.string().required('backupManagerId is required'),
  // locationId: Yup.string().required('locationId is required'),
  // shift: Yup.string().required('shift is required'),
  // departmentId: Yup.string().required('departmentId is required'),
  // contractType: Yup.string().required('contractType is required'),
  workType: Yup.string().required('Work type is required.'),
  roleId: Yup.string().required('Role is required.'),
});
