import * as Yup from 'yup';

export const AddClientSchema = Yup.object().shape({
    organizationName: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, 'Name must only contain letters and spaces.')
    .required('Organization Name is required.')
    .label('Invalid Name.')
    .min(5, 'Organization Name must be at least 5 characters.')
    .max(30, 'Organization Name cannot exceed 30 characters.'),
    clientCode: Yup.number()
        .required('Client Code is required.')
        .integer('Client Code must be an integer.')
        .positive('Client Code must be a positive number.')
        .min(100000, 'Client Code must be a 6-digit number.')
        .max(999999, 'Client Code must be a 6-digit number.')
        .typeError('Client Code must be a number.')
});