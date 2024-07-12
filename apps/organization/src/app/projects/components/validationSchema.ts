import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string()
    .min(5, 'Project Name must be at least 5 characters long.')
    .max(30, 'Project Name must be at most 30 characters long.')
    .required('Project Name is required.'),
  code: Yup.mixed()
    .test(
      'is-string-or-number',
      'Project Key/Code must be exactly 6 characters or digits.',
      (value) => typeof value === 'string' || typeof value === 'number'
    )
    .required('Project Key/Code is required.')
    .test(
      'length-6',
      'Project Key/Code must be exactly 6 characters or digits.',
      (value) => value && value.toString().length === 6
    ),
  departments: Yup.array()
    .of(Yup.string())
    .min(1, 'Department is required.')
    .required('Department is required'),
  clientId: Yup.string().required('Client is required.'),
  description: Yup.string().min(
    10,
    'Description must be at least 10 characters long'
  ),
  startDate: Yup.date().nullable().required('Start Date is required.'),
  endDate: Yup.date().nullable().required('End Date is required.'),
  budgetedHours: Yup.number()
    .nullable()
    .required('Budget Hours is required.')
    .moreThan(0, 'Budget Hours must be greater than 0.'),
});
