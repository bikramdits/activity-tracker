import * as Yup from 'yup';

export const DepartmentValidationSchema = Yup.object().shape({
  name: Yup.string().
    required('Name is required')
    .label('Invalid Name')
    .matches(/^[a-zA-Z\s]*$/, 'Name must only contain letters and spaces')
    .max(30,'Department name must be at most 30 characters')
    .min(5, 'Department name must be above 5 characters')
    

  // description: Yup.string()
  //   .required('Description is required')
  //   .matches(/^[a-zA-Z\s]*$/, 'description must only contain letters and spaces')
});
