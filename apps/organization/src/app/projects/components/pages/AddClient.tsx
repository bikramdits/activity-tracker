import React from 'react';
import { Drawer, Typography, Box } from '@mui/material';
import { FormikHelpers } from 'formik';
import { ClientFormData, DrawerProps } from './Interfaces';
import { InputField, Button, showToast } from '@appname/ui';
import { Formik, Form } from 'formik';
import { useCreateClient } from '../../../hooks/useClients';
import { CreatedClientsResponse } from '../../../types/clientsTypes';
import { AddClientSchema } from '../../../client/components/schemas/AddClientSchema';
import CloseIcon from '@mui/icons-material/Close';
const AddClient: React.FC<DrawerProps> = ({
  open,
  onClose,
  onSave,
  clientFormData: initialClientFormData,
}) => {
  const clientFormData: ClientFormData = {
    organizationName: initialClientFormData?.organizationName || '',
    clientCode: initialClientFormData?.clientCode || '',
  };

  const { mutateAsync } = useCreateClient();
  const handleSubmit = async (
    values: ClientFormData,
    actions: FormikHelpers<ClientFormData>
  ) => {
    try {
      const response: CreatedClientsResponse = await mutateAsync(values);
      onSave(response);
      actions.resetForm();
      onClose();
      if (response.statusCode == 200) {
        showToast(response.message, 'success');
      } else {
        showToast(response.errorRes, 'error');
      }
    } catch (error) {
      console.error('Failed to add client:', error);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: '50%' },
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          mt: 9,
        }}
      >
        <Typography
          variant="h5"
          component="h5"
          className="text-[26px] md:font-bold"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <h1 className="font-extrabold mb-[1.5rem]">Add New Client</h1>
          <CloseIcon onClick={onClose} />
        </Typography>
        <Formik
          initialValues={clientFormData}
          validationSchema={AddClientSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form className="form-container   " style={{ flexGrow: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 2,
                  width: '100%',
                }}
              >
                <div className="custom-input w-1/2">
                  <InputField
                    className="w-full"
                    name="organizationName"
                    label={
                      <span>
                        Organization Name
                        <span className="text-red-500 text-sm ml-[2px]">*</span>
                      </span>
                    }
                    variant="outlined"
                    id="organizationName"
                    fullWidth
                    type="text"
                    value={values.organizationName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.organizationName && errors.organizationName}
                  />

                  {errors.organizationName && touched.organizationName && (
                    <span className="text-red-500 text-sm">
                      {errors.organizationName}
                    </span>
                  )}
                </div>
                <div className="custom-input w-1/2">
                  <InputField
                    className="w-full"
                    name="clientCode"
                    label={
                      <span>
                        Client Code
                        <span className="text-red-500 text-sm ml-[2px]">*</span>
                      </span>
                    }
                    variant="outlined"
                    id="clientCode"
                    fullWidth
                    type="text"
                    value={values.clientCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.clientCode && errors.clientCode}
                  />

                  {errors.clientCode && touched.clientCode && (
                    <span className="text-red-500 text-sm">
                      {errors.clientCode}
                    </span>
                  )}
                </div>
              </Box>
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  onClick={onClose}
                  sx={{
                    color: '#3c59d4',
                    borderColor: '#3c59d4',
                    height: 41,
                    fontWeight: 550,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#cae2ff',
                      borderColor: '#3c59d4',
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  sx={{
                    border: '1px solid #0070fa',
                    color: '#3c59d4',
                    ml: 1,
                    fontWeight: 550,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#cae2ff',
                      borderColor: '#3c59d4',
                    },
                  }}
                >
                  Save
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Drawer>
  );
};

export default AddClient;
