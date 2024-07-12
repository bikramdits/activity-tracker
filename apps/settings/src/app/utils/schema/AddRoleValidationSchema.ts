import * as Yup from 'yup';

export const AddRoleValidationSchema = Yup.object({
  name: Yup.string()
    .required('This field is required.')
    .min(3, 'Name must be at least 3 characters.')
    .max(30, 'Name must be 30 characters or less.'),
  description: Yup.string().required('This field is required.')
    .max(3000, 'Description must be 3000 characters or less.')
});
