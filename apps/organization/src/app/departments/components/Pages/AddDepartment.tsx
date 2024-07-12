import { Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, ButtonWithIcon, InputField, MultilineTextField, MultiSelectFormControl, showToast, } from '@appname/ui';
import { BackIcon } from '@appname/assets';
import { Form, Formik } from 'formik';
import { FormValuesprops } from '../../../types/departmentTypes';
import { DepartmentValidationSchema } from '../../Schemas/DepartmentValidationSchema';
import { useCreateNewDepartment, useGetDepartmentById, useUpdateDepartment, } from '../../../hooks/useDepartment';
import { addDepartmentEnum } from '../../enums/DepartmentEnums';
import { useAllUsers } from '../../../hooks/useUsers';
import { useClients } from '../../../hooks/useClients';

type ButtonStyleProps = React.CSSProperties & {
  '&:hover'?: React.CSSProperties;
};

const AddDepartment: React.FC = () => {
  const [initialValues, setInitialValues] = useState<FormValuesprops>({
    // id:'',
    name: '',
    description: '',
    clientId: '',
    usersId: '',
    isArchive: false,
    client: {
      id: '',
      organizationName: '',
      clientCode: '',
      image: null,
      createdAt: 0,
    },
  });

  const [isChecked, setIsChecked] = useState(false);
  const { data: users } = useAllUsers({});
  const { mutateAsync } = useCreateNewDepartment();
  const { data: clients } = useClients({});
  
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const { data, isLoading } = useGetDepartmentById(id);
  const { mutateAsync: updateDepartmentMutation } = useUpdateDepartment();

  useEffect(() => {
    if (data) {
      const department = data?.data?.department;
      const usersName = Array.isArray(department?.users)
        ? department?.users.map((user: any) => user.id)
        : [];

      setInitialValues({
        name: department?.name || '',
        description: department?.description || '',
        clientId: department?.client?.id || '',
        usersId: usersName || '',
        isArchive: department?.isArchive || false,
        client: department?.client || {
          id: '',
          organizationName: '',
          clientCode: '',
          image: null,
          createdAt: 0,
        },
      });
    }
  }, [data]);

  const updateDepartment = async (values: FormValuesprops) => {
    const updatedValues = {
      name: values.name,
      description: values.description,
      isArchive: values.isArchive,
      clientId: values.clientId?.length ? values.clientId : null,
      usersId: values.usersId,
      client: values.clientId && values.client?.id ? values.client : undefined,
    };
    const response = await updateDepartmentMutation({
      id: id,
      formValues: updatedValues,
    });
    if (response.statusCode === 201) {
      showToast(response.message, 'success');
      navigate('../');
    }
  };
  
  if (isLoading) {
    <div>Loading...</div>;
  }

  const handleBackClick = () => {
    navigate('../');
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const addDepartment = async (values: FormValuesprops) => {
    const response = await mutateAsync({
      name: values.name,
      description: values.description,
      clientId: values.clientId,
      usersId: values.usersId,
      isArchive: values.isArchive,
      client: values.client,
    });

    if (response.statusCode === 201) {
      showToast(response.message, 'success');
      setTimeout(() => {
        navigate('../');
      }, 1000);
    } else {
      showToast(response.message, 'error');
    }
  };

  return (
    <div className="w-full  bg-gray-50 p-[15px] h-full">
      <div className="flex justify-between">
        <Typography
          variant="h5"
          component="h5"
          className="text-[26px] md:font-bold">
          <h2 className="mt-2 text-2xl/[26px] font-semibold">
            {id
              ? `${addDepartmentEnum.EDIT_DEPARTMENT}`
              : `${addDepartmentEnum.ADD_NEW_DEPARTMENT}`}</h2> </Typography>
        <ButtonWithIcon
          onClick={handleBackClick}
          icon={<BackIcon

            sx={{
              fontSize: '17px',
              stroke: '#3c59d4',
              strokeWidth: 1.5,
            }}
          />
          }
          sx={
            {
              color: '#3c59d4',
              backgroundColor: 'white',
              fontSize: '17px',
              border: '1px solid #0070fa',
              fontWeight: '550',
              padding: '6px 12px',
              textTransform: 'none',
              height: '44px',
              '&:hover': {
                backgroundColor: '#cae2ff',
                borderColor: '#3c59d4',
                textTransform: 'none',
              },
            } as ButtonStyleProps
          }
        >
          {addDepartmentEnum.BACK}
        </ButtonWithIcon>
      </div>
      <div className="border-2 rounded-md  h-4/5 overflow-hidden p-6 mt-[14px]">
        <Stack spacing={3}>
          <Formik
            initialValues={initialValues}
            onSubmit={id ? updateDepartment : addDepartment}
            validationSchema={DepartmentValidationSchema}
            enableReinitialize={true}
          >
            {({
              values,
              handleChange,
              errors,
              touched,
              setFieldValue,
              resetForm,
            }) => {
              return (
                <Form className="form-container block">
                  <InputField
                    name={addDepartmentEnum.NAME}
                    variant="outlined"
                    type="text"
                    label={
                      <span>
                        {addDepartmentEnum.DEPARTMENT_NAME}
                        <span className="text-red-500 text-sm ml-[2px]">*</span>
                      </span>
                    }
                    id="standard-error-helper-text"
                    className="department-textField !w-full"
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name ? touched.name : ''}
                  />
                  {errors && errors.name && touched.name && (
                    <div className="justify-start text-start">
                      <span className="text-red-500 text-sm ml-2">
                        {errors.name}
                      </span>
                    </div>
                  )}
                  <MultilineTextField
                    name="description"
                    maxRows={4}
                    label="Description"
                    id="description"
                    className="!w-full !mt-7"
                    value={values?.description}
                    onChange={handleChange}
                    error={errors.description ? touched.description : ''}
                  />
                  {errors && errors.description && touched.description && (
                    <div className="justify-start text-start">
                      <span className="text-red-500 text-sm ml-2">
                        {errors.description}
                      </span>
                    </div>
                  )}
                  <br />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={addDepartmentEnum.INCLUDING_MEMBERS}
                    className="!mt-7"
                  />
                  {isChecked && (
                    <div className=" w-full flex gap-2 !mt-7">
                      <div className="w-1/2 h-11">
                        <MultiSelectFormControl
                          label={addDepartmentEnum.CLIENT}
                          isMultiple={false}
                          placeholder={addDepartmentEnum.SELECT_CLIENT}
                          value={values.clientId || ""}
                          onChange={(e) => {
                            const clientID = clients?.data?.clients.find(c => c.id === e.target.value)
                            setFieldValue('client', clientID);
                            setFieldValue('clientId', e.target.value);
                          }}
                          options={clients?.data?.clients || []}
                          idKey={'id'}
                          nameKey={(option) => `${option.organizationName}`}
                        />
                      </div>
                      <div className="w-1/2">
                        <MultiSelectFormControl
                          label={addDepartmentEnum.USERS}
                          placeholder={addDepartmentEnum.SELECTED_DEPARTMENT}
                          value={values.usersId || ""}
                          onChange={(e) => {
                            const usersList = users?.data?.users.find(c => c.id === e.target.value)
                            setFieldValue('users', usersList);
                            setFieldValue('usersId', e.target.value);
                          }}
                          options={users?.data?.users || []}
                          idKey={'id'}
                          nameKey={(option) => `${option.firstName}`}
                        />
                      </div>
                    </div>
                  )}
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="flex-end"
                    className="!mt-7"
                  >
                    <Button
                      sx={{ fontSize: '15px', lineHeight: '1.5', height: '44px', textTransform: 'none', padding: '6px 12px', fontWeight: '550', color: '#3c59d4', marginRight: '10px', '&:hover': { backgroundColor: '#cae2ff' } }}
                      onClick={() => resetForm()}
                      type="reset"
                    >
                      {addDepartmentEnum.CANCEL}
                    </Button>
                    <Button
                      sx={{ fontSize: '15px', lineHeight: '1.5', height: '44px', textTransform: 'none', padding: '6px 12px', border: '1px solid #3c59d4', fontWeight: '550', color: '#3c59d4', '&:hover': { backgroundColor: '#cae2ff' } }}
                      type="submit"
                    >
                      {id
                        ? `${addDepartmentEnum.EDIT}`
                        : `${addDepartmentEnum.SAVE}`}
                    </Button>
                  </Stack>
                </Form>
              );
            }}
          </Formik>
        </Stack>
      </div>
    </div>
  );
};
export default AddDepartment;
