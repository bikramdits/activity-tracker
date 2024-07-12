import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Box, Typography } from '@mui/material';
import ScreenWrapper from '../../components/ScreenWrapper';
import AddClient from './AddClient';

import {
  InputField,
  Button,
  ButtonWithIcon,
  MultiSelectFormControl,
  showToast,
  MultilineTextField,
  Loader,
} from '@appname/ui';
import { validationSchema } from '../validationSchema';
import { BackIcon } from '@appname/assets';
import {
  useAddProject,
  useGetProjectById,
  useUpdateProject,
} from '../../../hooks/useProjects';
import { FormValuesRequest } from '../../../types/projectsTypes';
import { Form, Formik } from 'formik';
import { useDepartment } from '../../../hooks/useDepartment';
import { useClients } from '../../../hooks/useClients';
import { AddProjectEnum, ProjectEnum } from '../../enums/ProjectEnum';

type ButtonStyleProps = React.CSSProperties & {
  '&:hover'?: React.CSSProperties;
};

const AddProjects: React.FC = () => {
  const [initialValues, setInitialValues] = useState<FormValuesRequest>({
    name: '',
    code: '',
    departments: [],
    clientId: '',
    startDate: '',
    endDate: '',
    description: '',
    budgetedHours: 0,
  });
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [clientFormData, setClientFormData] = useState<{
    organizationName?: string;
    clientCode?: string;
  }>({});

  const { mutateAsync } = useAddProject();
  const { data: departments } = useDepartment({});
  const { data: clients } = useClients({});
  const { mutateAsync: updateProjectMutation } = useUpdateProject();
  const { data } = useGetProjectById(id);
  const [loader, setLoader] = React.useState(false);

  // Utility function to convert Unix timestamp (in seconds) to date string
  const unixToDate = (unixTimestamp: string): string => {
    const date = new Date(parseInt(unixTimestamp) * 1000);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (data) {
      const project = data?.data;

      const departmentIds = Array.isArray(project?.departments)
        ? project?.departments.map((dept: any) => dept.id)
        : [];

      setInitialValues({
        name: project?.name || '',
        code: project?.code || '',
        departments: departmentIds || '',
        clientId: project?.client?.id || '',

        startDate: project?.startDate ? unixToDate(project.startDate) : '',
        endDate: project?.endDate ? unixToDate(project.endDate) : '',
        description: project?.description || '',
        budgetedHours: project?.budgetedHours || 0,
      });
    }
  }, [data]);

  const handleAddClient = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleSaveClient = (formData: {
    organizationName?: string;
    clientCode?: string;
  }) => {
    setClientFormData(formData);
    setDrawerOpen(false);
  };

  /**********************Function to add a new project *****************************/

  const addProjects = async (values: FormValuesRequest) => {
    setLoader(true);
    const startDataUnix = values.startDate
      ? Math.floor(new Date(values.startDate).getTime() / 1000).toString()
      : '';
    const endDataUnix = values.endDate
      ? Math.floor(new Date(values.endDate).getTime() / 1000).toString()
      : '';
    const response = await mutateAsync({
      name: values.name,
      code: values.code,
      departments: values.departments,
      clientId: values.clientId,
      startDate: startDataUnix,
      endDate: endDataUnix,
      description: values.description,
      budgetedHours: values.budgetedHours,
    });
    if (response.statusCode === 200) {
      showToast(response.message, 'success');
      navigate('/organization/projects');
    } else {
      showToast(response.errorRes, 'error');
    }
  };

  /****************************Function to update project ***************************/

  const updateProject = async (values: FormValuesRequest) => {
    setLoader(true);
    const startDataUnix = values.startDate
      ? Math.floor(new Date(values.startDate).getTime() / 1000).toString()
      : '';
    const endDataUnix = values.endDate
      ? Math.floor(new Date(values.endDate).getTime() / 1000).toString()
      : '';
    const updateValues = {
      name: values.name,
      code: values.code,
      departments: values.departments,
      clientId: values.clientId,
      startDate: startDataUnix,
      endDate: endDataUnix,
      description: values.description,
      budgetedHours: values.budgetedHours,
    };

    const response = await updateProjectMutation({
      id: id,
      formValues: updateValues,
    });
    if (response.statusCode == 200) {
      showToast(response?.message, 'success');
      navigate('/organization/projects');
    } else {
      showToast(response.errorRes, 'error');
    }
  };

  return (
    <>
      <div className="maindiv w-full bg-gray-50 text-left">
        <div className="maindiv w-full bg-gray-50 text-left p-[13px] mt-[68px] flex-grow">
          <div className="headerdiv flex justify-between my-4">
            <div className="text">
              <Typography
                variant="h5"
                component="h5"
                className="text-[26px] md:font-bold"
              >
                <h2 className="font-semibold mt-2 text-2xl/[26px]">
                  {id
                    ? AddProjectEnum.EDIT_PROJECT
                    : AddProjectEnum.ADD_NEW_PROJECT}
                </h2>
              </Typography>
            </div>
            <ButtonWithIcon
              icon={
                <BackIcon
                  sx={{
                    fontSize: 20,
                    stroke: '#3c59d4',
                    strokeWidth: 1.5,
                  }}
                />
              }
              onClick={() => navigate('../')}
              sx={
                {
                  color: '#3c59d4',
                  border: '1px solid #0070fa',
                  fontWeight: '550',
                  backgroundColor: 'white',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#cae2ff',
                    borderColor: '#3c59d4',
                  },
                } as ButtonStyleProps
              }
            >
              {AddProjectEnum.BACK}
            </ButtonWithIcon>
          </div>
          <div className="py-2">
            <ScreenWrapper title="">
              <Formik
                initialValues={initialValues}
                onSubmit={id ? updateProject : addProjects}
                validationSchema={validationSchema}
                enableReinitialize={true}
              >
                {({
                  values,
                  handleBlur,
                  handleChange,
                  errors,
                  touched,
                  setFieldValue,
                  resetForm,
                }) => (
                  <Form className="form-container  block">
                    <Box sx={{ my: 2, mx: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <div className="custom-input">
                            <InputField
                              name={ProjectEnum.NAME}
                              id="outlined-basic"
                              label={
                                <span>
                                  {AddProjectEnum.PROJECT_NAME}
                                  <span className="text-red-500 text-sm ml-[2px]">
                                    *
                                  </span>
                                </span>
                              }
                              variant="outlined"
                              className="w-full"
                              type="text"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.name && errors.name}
                            />
                            {errors && errors.name && touched.name && (
                              <span className="text-red-500 text-sm">
                                {errors.name}
                              </span>
                            )}
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <div className="custom-input">
                            <InputField
                              id={AddProjectEnum.CODE}
                              name={AddProjectEnum.CODE}
                              label={
                                <span>
                                  {AddProjectEnum.PROJECT_Key_CODE}
                                  <span className="text-red-500 text-sm ml-[2px]">
                                    *
                                  </span>
                                </span>
                              }
                              variant="outlined"
                              className="w-full"
                              type="text"
                              value={values.code}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={errors.code && touched.code}
                            />
                            {errors && errors.code && touched.code && (
                              <span className="text-red-500 text-sm">
                                {errors.code}
                              </span>
                            )}
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <MultiSelectFormControl
                            isMultiple={true}
                            label={
                              <span>
                                {ProjectEnum.DEPARTMENT}
                                <span className="text-red-500 text-sm ml-[2px]">
                                  *
                                </span>
                              </span>
                            }
                            placeholder="Select departments"
                            value={values.departments || ''}
                            options={departments?.data?.departments || []}
                            onChange={(e) => {
                              const FindDepId =
                                departments?.data?.departments.find(
                                  (department) =>
                                    department.id === e.target.value
                                );

                              setFieldValue('departments', FindDepId);
                              setFieldValue('departments', e.target.value);
                            }}
                            idKey={'id'}
                            nameKey={(option) => option.name}
                          />
                          {errors &&
                            errors.departments &&
                            touched.departments && (
                              <span className="text-red-500 text-sm">
                                {errors.departments}
                              </span>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <MultiSelectFormControl
                            label={
                              <span>
                                {ProjectEnum.CLIENT}
                                <span className="text-red-500 text-sm ml-[2px]">
                                  *
                                </span>
                              </span>
                            }
                            isMultiple={false}
                            placeholder="Select Client"
                            value={values?.clientId || ''}
                            onChange={(e) => {
                              const FindClientId = clients?.data?.clients.find(
                                (client) => client.id === e.target.value
                              );

                              setFieldValue('client', FindClientId);
                              setFieldValue('clientId', e.target.value);
                            }}
                            options={clients?.data?.clients || []}
                            idKey={'id'}
                            nameKey={(option) => option.organizationName}
                          />
                          {errors && errors.clientId && touched.clientId && (
                            <span className="text-red-500 text-sm">
                              {errors.clientId}
                            </span>
                          )}
                          <Button
                            onClick={handleAddClient}
                            sx={{
                              color: '#3c59d4',
                              height: '41px',
                              fontWeight: '550',
                            }}
                          >
                            Add Client
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <div className="custom-input">
                            <InputField
                              name={AddProjectEnum.START_DATE}
                              id={AddProjectEnum.START_DATE}
                              label={
                                <span>
                                  {AddProjectEnum.START_DATE_LABEL}
                                  <span className="text-red-500 text-sm ml-[2px]">
                                    *
                                  </span>
                                </span>
                              }
                              variant="outlined"
                              className="w-full"
                              type="date"
                              value={values.startDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={errors.startDate && touched.startDate}
                            />
                            {errors &&
                              errors.startDate &&
                              touched.startDate && (
                                <span className="text-red-500 text-sm">
                                  {errors.startDate}
                                </span>
                              )}
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <div className="custom-input">
                            <InputField
                              id={AddProjectEnum.END_DATE}
                              name={AddProjectEnum.END_DATE}
                              label={
                                <span>
                                  {AddProjectEnum.END_DATE_LABEL}
                                  <span className="text-red-500 text-sm ml-[2px]">
                                    *
                                  </span>
                                </span>
                              }
                              variant="outlined"
                              className="w-full"
                              type="date"
                              value={values.endDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.endDate && errors.endDate}
                            />
                            {errors && errors.endDate && touched.endDate && (
                              <span className="text-red-500 text-sm">
                                {errors.endDate}
                              </span>
                            )}
                          </div>
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <div className="custom-input mt-6">
                          <MultilineTextField
                            label={AddProjectEnum.DESCRIPTION_LABEL}
                            maxRows={4}
                            name={AddProjectEnum.DESCRIPTION}
                            id="description"
                            className="w-full"
                            value={values.description}
                            onChange={handleChange}
                            error={touched.description && errors.description}
                          />
                          {errors &&
                            errors.description &&
                            touched.description && (
                              <span className="text-red-500 text-sm">
                                {errors.description}
                              </span>
                            )}
                        </div>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <div className="custom-input mt-6">
                            <InputField
                              label={
                                <span>
                                  {AddProjectEnum.BUDGETED_HOURS}
                                  <span className="text-red-500 text-sm ml-[2px]">
                                    *
                                  </span>
                                </span>
                              }
                              name={AddProjectEnum.BUDGETED_HOURS_NAME}
                              id="budgetedHours"
                              variant="outlined"
                              className="w-full"
                              type="number"
                              value={values.budgetedHours}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.budgetedHours && errors.budgetedHours
                              }
                            />
                            {errors &&
                              errors.budgetedHours &&
                              touched.budgetedHours && (
                                <span className="text-red-500 text-sm">
                                  {errors.budgetedHours}
                                </span>
                              )}
                          </div>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        container
                        justifyContent="flex-end"
                        marginTop="10px"
                        spacing={2}
                      >
                        <Button
                          onClick={() => resetForm()}
                          type="reset"
                          sx={{
                            color: '#3c59d4',
                            borderColor: '#3c59d4',
                            marginRight: '5px',
                            fontWeight: '550',
                            height: '41px',
                            textTransform: 'none',
                            '&:hover': {
                              backgroundColor: '#cae2ff',
                              borderColor: '#3c59d4',
                            },
                          }}
                        >
                          {AddProjectEnum.CANCEL}
                        </Button>
                        <Button
                          type="submit"
                          sx={{
                            border: '1px solid #0070fa',
                            color: '#3c59d4',
                            fontWeight: '550',
                            textTransform: 'none',
                            '&:hover': {
                              backgroundColor: '#cae2ff',
                              borderColor: '#3c59d4',
                            },
                          }}
                        >
                          {loader ? (
                            <Loader />
                          ) : id ? (
                            AddProjectEnum.UPDATE
                          ) : (
                            AddProjectEnum.SAVE
                          )}
                        </Button>
                      </Grid>
                    </Box>
                  </Form>
                )}
              </Formik>
            </ScreenWrapper>
          </div>
        </div>
      </div>

      <AddClient
        open={drawerOpen}
        onClose={handleDrawerClose}
        onSave={handleSaveClient}
        clientFormData={clientFormData}
      />
    </>
  );
};

export default AddProjects;
