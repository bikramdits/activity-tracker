import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ButtonWithIcon,
  Button,
  InputField,
  MultiSelectFormControl,
  showToast,
  Loader,
} from '@appname/ui';
import { BackIcon } from '@appname/assets';
import UserPermessions from './UserPermessions';
import { Formik, Form } from 'formik';
import { CreateUserRequest } from '../../types/usersTypes';
import {
  useAllUsers,
  useCreateNewUser,
  useGetAllRoles,
  useGetUserById,
  useUpdateUser,
} from '../../hooks/useUsers';
import { UserValidationSchema } from '../Schemas/UserValidationSchema';
import { useDepartment } from '../../hooks/useDepartment';
import { AddPeople } from '../enums/PeopleEnums';

type ButtonStyleProps = React.CSSProperties & {
  '&:hover'?: React.CSSProperties;
};
const AddUser = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = React.useState(false);

  const [showPermissions, setShowPermissions] = useState(false);
  const [initialValues, setInitialValues] = useState<CreateUserRequest>({
    image: '',
    firstName: '',
    lastName: '',
    memberId: '',
    dob: '',
    employeeId: '',
    companyEmail: '',
    workPhone: '',
    personalPhone: '',
    dateOfJoining: '',
    reportingManagerId: '',
    backupManagerId: '',
    locationId: '',
    shift: '',
    departmentId: [],
    contractType: '',
    workType: '',
    roleId: '',
  });
  const { mutateAsync } = useCreateNewUser();
  const { data: departments } = useDepartment({});
  const { data: Users } = useAllUsers({});

  const BackupMangerOptions = [
    { id: '123e4567-e89b-12d3-a456-426614174000', name: 'Kevin Peter' },
    { id: '123e4567-e89b-12d3-a456-426614174001', name: 'Hamisha Marshall' },
    { id: '123e4567-e89b-12d3-a456-426614174002', name: 'Travor Borris' },
  ];

  const LocationOptions = [
    { id: '123e4567-e89b-12d3-a456-426614174006', name: 'India' },
    { id: '123e4567-e89b-12d3-a456-426614174007', name: 'The Philippines' },
    { id: '123e4567-e89b-12d3-a456-426614174008', name: 'United States' },
  ];

  const ShiftOptions = [
    {
      id: '123e4567-e89b-12d3-a456-426614174009',
      name: 'APPNAME General Timing',
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174010',
      name: 'APPNAME Evening Timing',
    },
  ];

  const ContractOptions = [
    { id: '123e4567-e89b-12d3-a456-426614174011', name: 'localContractor' },
    {
      id: '123e4567-e89b-12d3-a456-426614174012',
      name: 'internationalContractor',
    },
    { id: '123e4567-e89b-12d3-a456-426614174013', name: 'employee' },
  ];
  const WorkTypeOptions = [
    { id: 'office', name: 'From office' },
    { id: 'remote', name: 'Remote' },
    { id: 'hybrid', name: 'Hybrid' },
  ];

  const viewPermissions = () => {
    setShowPermissions(!showPermissions);
  };
  const handleSubmit = async (value: any = {}) => {
    setLoader(true);

    try {
      const formData = new FormData();

      const dobUnix = value.dob
        ? Math.floor(new Date(value.dob).getTime() / 1000).toString()
        : '';
      const dateOfJoiningUnix = value.dateOfJoining
        ? Math.floor(new Date(value.dateOfJoining).getTime() / 1000).toString()
        : '';

      // Append fields to FormData
      formData.append('image', value.image instanceof File ? value.image : '');
      formData.append('firstName', value.firstName ?? '');
      formData.append('lastName', value.lastName ?? '');
      formData.append('memberId', value.memberId ?? '');
      formData.append('dob', dobUnix);
      formData.append('employeeId', value.employeeId ?? '');
      formData.append('companyEmail', value.companyEmail ?? '');
      formData.append('workPhone', value.workPhone ?? '');
      formData.append('personalPhone', value.personalPhone ?? '');
      formData.append('dateOfJoining', dateOfJoiningUnix);
      (value.departmentId as string[]).forEach((d, i) => {
        formData.append(`departmentId[${i}]`, d);
      });
      formData.append('reportingManagerId', value.reportingManagerId ?? '');
      formData.append('roleId', value.roleId ?? '');
      formData.append('workType', value.workType ?? '');

      // Make the API call with FormData
      const response = await mutateAsync(formData);
      if (response.statusCode === 201) {
        showToast(response.message, 'success');
        setLoader(false);

        navigate('../');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const params = useParams();
  const { id } = params;
  const { data } = useGetAllRoles({});
  const { data: GetPeopleById } = useGetUserById(id);

  const { mutateAsync: updateMutate } = useUpdateUser();
  useEffect(() => {
    if (GetPeopleById) {
      const user = GetPeopleById?.data?.foundUser;
      const departmentIds = Array.isArray(user?.departments)
        ? user?.departments.map((dept: any) => dept.id)
        : [];

      setInitialValues({
        image: user?.image || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        memberId: user?.memberId || '',
        dob: user?.dob ? unixToDate(user?.dob.toString()) : '',
        employeeId: user?.employeeId || '',
        companyEmail: user?.companyEmail || '',
        workPhone: user?.workPhone || '',
        personalPhone: user?.personalPhone || '',
        dateOfJoining: user?.dateOfJoining
          ? unixToDate(user?.dateOfJoining.toString())
          : '',
        reportingManagerId: user?.reportingManagerId || '',
        backupManagerId: user?.backupManagerId || '',
        locationId: user?.locationId || '',
        shift: user?.shiftId || '',
        departmentId: departmentIds || [],
        contractType: user?.contractType || '',
        workType: user?.workType || '',
        roleId: user?.roleId || '',
      });
    }
  }, [data, GetPeopleById]);
  const handelUpdate = async (value: any = {}) => {
    setLoader(true);

    try {
      const formData = new FormData();

      const dobUnix = value.dob
        ? Math.floor(new Date(value.dob).getTime() / 1000).toString()
        : '';
      const dateOfJoiningUnix = value.dateOfJoining
        ? Math.floor(new Date(value.dateOfJoining).getTime() / 1000).toString()
        : '';

      formData.append('image', value.image instanceof File ? value.image : '');
      formData.append('firstName', value.firstName ?? '');
      formData.append('lastName', value.lastName ?? '');
      formData.append('memberId', value.memberId ?? '');
      formData.append('dob', dobUnix);
      formData.append('employeeId', value.employeeId ?? '');
      formData.append('companyEmail', value.companyEmail ?? '');
      formData.append('workPhone', value.workPhone ?? '');
      formData.append('personalPhone', value.personalPhone ?? '');
      formData.append('dateOfJoining', dateOfJoiningUnix);
      (value.departmentId as string[]).forEach((d, i) => {
        formData.append(`departmentId[${i}]`, d);
      });
      formData.append('reportingManagerId', value.reportingManagerId ?? '');
      formData.append('roleId', value.roleId ?? '');
      formData.append('workType', value.workType ?? '');
      const response = await updateMutate({ id, formValues: formData });

      if (response.statusCode === 201) {
        showToast(response.message, 'success');
        setLoader(false);
        navigate('../');
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const unixToDate = (unixTimestamp: string | number): string => {
    const timestamp =
      typeof unixTimestamp === 'number'
        ? unixTimestamp.toString()
        : unixTimestamp;

    const date = new Date(parseInt(timestamp) * 1000);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };
  function isFileOrBlob(obj: any): obj is File | Blob {
    return obj instanceof File || obj instanceof Blob;
  }

  return (
    <div className="maindiv bg-gray-50 w-full pb-2 mt-16">
      <div className="flex justify-between p-3 mt-2 -mb-2">
        <Typography variant="h5" component="h5" className="text-[26px] ">
          <h2 className="mt-2 text-2xl/[26px] font-semibold">
            {id ? `${AddPeople.Update_People}` : `${AddPeople.New_People}`}
          </h2>
        </Typography>
        <div className="newRole">
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
                },
              } as ButtonStyleProps
            }
          >
            Back
          </ButtonWithIcon>
        </div>
      </div>
      <div className="p-4">
        <Box
          className="bg-white"
          sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={UserValidationSchema}
            onSubmit={id ? handelUpdate : handleSubmit}
            enableReinitialize={true}
          >
            {({
              values,
              handleChange,
              errors,
              touched,
              setFieldValue,
              resetForm,
            }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    {values.image ? (
                      <Box
                        className="w-52 h-52 relative"
                        sx={{
                          border: '1px dashed #ccc',
                          textAlign: 'center',

                          p: 2,
                        }}
                      >
                        <img
                          src={
                            isFileOrBlob(values.image)
                              ? URL.createObjectURL(
                                  values.image as unknown as Blob
                                )
                              : values.image // Assuming it's a URL if not a File/Blob
                          }
                          alt={`${values.firstName} ${values.lastName}`}
                          className="w-full h-full object-cover relative"
                        />
                        <label htmlFor="file-upload">
                          <input
                            type="file"
                            name="image"
                            id="file-upload"
                            style={{ display: 'none' }}
                            onChange={(event) => {
                              const file = event.currentTarget.files
                                ? event.currentTarget.files[0]
                                : null;
                              setFieldValue('image', file);
                            }}
                          />
                          <Typography
                            variant="body2"
                            className="h-48 cursor-pointer flex items-center absolute top-32 left-10 w-full text-center p-4 rounded-md"
                          >
                            {AddPeople.SELECT_IMG}
                          </Typography>
                        </label>
                      </Box>
                    ) : (
                      <Box
                        className="w-52 h-52"
                        sx={{
                          border: '1px dashed #ccc',
                          textAlign: 'center',
                          p: 2,
                        }}
                      >
                        <label htmlFor="file-upload">
                          <input
                            type="file"
                            name="image"
                            id="file-upload"
                            style={{ display: 'none' }}
                            onChange={(event) => {
                              const file = event.currentTarget.files
                                ? event.currentTarget.files[0]
                                : null;
                              setFieldValue('image', file);
                            }}
                          />
                          <Typography
                            variant="body2"
                            className="h-48 cursor-pointer flex items-center"
                          >
                            {AddPeople.DROP_IMAGE}
                          </Typography>
                        </label>
                      </Box>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <InputField
                          type="text"
                          name="firstName"
                          className="w-full"
                          label={
                            <span>
                              {AddPeople.FIRST_NAME}
                              <span className="text-red-500 text-sm ml-[2px]">
                                *
                              </span>
                            </span>
                          }
                          id="firstName"
                          variant="outlined"
                          value={values?.firstName}
                          onChange={handleChange}
                          error={touched.firstName && errors.firstName}
                        />
                        {errors.firstName && touched.firstName && (
                          <div className="text-red-500 text-xs ">
                            {errors.firstName}
                          </div>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputField
                          type="text"
                          name="lastName"
                          className="w-full"
                          label={
                            <span>
                              {AddPeople.LAST_NAME}
                              <span className="text-red-500 text-sm ml-[2px]">
                                *
                              </span>
                            </span>
                          }
                          id="lastName"
                          variant="outlined"
                          onChange={handleChange}
                          value={values?.lastName}
                          error={touched.lastName && errors.lastName}
                        />
                        {errors.lastName && touched.lastName && (
                          <span className="text-red-500 text-xs ">
                            {errors.lastName}
                          </span>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputField
                          type="text"
                          className="w-full"
                          label={
                            <span>
                              {AddPeople.MEMBER_ID}
                              <span className="text-red-500 text-sm ml-[2px]">
                                *
                              </span>
                            </span>
                          }
                          id="MemberID"
                          name="memberId"
                          variant="outlined"
                          value={values?.memberId}
                          onChange={handleChange}
                          error={touched.memberId && errors.memberId}
                        />
                        {errors.memberId && touched.memberId && (
                          <div className="text-red-500 text-xs ">
                            {errors.memberId}
                          </div>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputField
                          type="date"
                          className="w-full"
                          label={
                            <span>
                              {AddPeople.DOB}
                              <span className="text-red-500 text-sm ml-[2px]">
                                *
                              </span>
                            </span>
                          }
                          id="dob"
                          name="dob"
                          variant="outlined"
                          value={values?.dob}
                          onChange={handleChange}
                          error={touched.dob && errors.dob}
                        />
                        {errors.dob && touched.dob && (
                          <div className="text-red-500 text-xs ">
                            {errors.dob}
                          </div>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputField
                          type="text"
                          className="w-full"
                          label={
                            <span>
                              {AddPeople.EmployeeID}
                              <span className="text-red-500 text-sm ml-[2px]">
                                *
                              </span>
                            </span>
                          }
                          id="EmployeeID"
                          name="employeeId"
                          variant="outlined"
                          value={values?.employeeId}
                          onChange={handleChange}
                          error={touched.employeeId && errors.employeeId}
                        />
                        {errors.employeeId && touched.employeeId && (
                          <div className="text-red-500 text-xs ">
                            {errors.employeeId}
                          </div>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputField
                          type="text"
                          className="w-full"
                          label={
                            <span>
                              {AddPeople.companyEmail}
                              <span className="text-red-500 text-sm ml-[2px]">
                                *
                              </span>
                            </span>
                          }
                          id="companyEmail"
                          name="companyEmail"
                          variant="outlined"
                          value={values?.companyEmail}
                          onChange={handleChange}
                          error={touched.companyEmail && errors.companyEmail}
                        />
                        {errors.companyEmail && touched.companyEmail && (
                          <div className="text-red-500 text-xs ">
                            {errors.companyEmail}
                          </div>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputField
                          type="text"
                          className="w-full"
                          label={
                            <span>
                              {AddPeople.workPhone}
                              <span className="text-red-500 text-sm ml-[2px]">
                                *
                              </span>
                            </span>
                          }
                          id="workPhone"
                          name="workPhone"
                          variant="outlined"
                          value={values?.workPhone}
                          onChange={handleChange}
                          error={touched.workPhone && errors.workPhone}
                        />
                        {errors.workPhone && touched.workPhone && (
                          <div className="text-red-500 text-xs ">
                            {errors.workPhone}
                          </div>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputField
                          type="text"
                          className="w-full"
                          label={
                            <span>
                              {AddPeople.Phone}
                              <span className="text-red-500 text-sm ml-[2px]">
                                *
                              </span>
                            </span>
                          }
                          id="personalPhone"
                          name="personalPhone"
                          variant="outlined"
                          value={values?.personalPhone}
                          onChange={handleChange}
                          error={touched.personalPhone && errors.personalPhone}
                        />
                        {errors.personalPhone && touched.personalPhone && (
                          <div className="text-red-500 text-xs ">
                            {errors.personalPhone}
                          </div>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputField
                          type="date"
                          className="w-full"
                          label="Date of Joining"
                          id="dateOfJoining"
                          name="dateOfJoining"
                          variant="outlined"
                          value={values?.dateOfJoining}
                          onChange={handleChange}
                          error={touched.dateOfJoining && errors.dateOfJoining}
                        />
                        {errors.dateOfJoining && touched.dateOfJoining && (
                          <div className="text-red-500 text-xs ">
                            {errors.dateOfJoining}
                          </div>
                        )}
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <MultiSelectFormControl
                          label={
                            <span>
                              {AddPeople.REPORTING_MANAGER}

                              <span className="text-red-500 text-sm ml-[2px]">
                                *
                              </span>
                            </span>
                          }
                          placeholder="Select item"
                          value={values.reportingManagerId || ''}
                          onChange={(e) => {
                            const FindClientId = Users?.data.users.find(
                              (user) => user.id === e.target.value
                            );

                            setFieldValue('user', FindClientId);
                            setFieldValue('reportingManagerId', e.target.value);
                          }}
                          options={Users?.data.users || []}
                          idKey="id"
                          nameKey={(option) =>
                            `${option.firstName}${option.lastName}`
                          }
                          isMultiple={false}
                        />
                        {errors.reportingManagerId &&
                          touched.reportingManagerId && (
                            <div className="text-red-500 text-xs absolute">
                              {errors.reportingManagerId}
                            </div>
                          )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MultiSelectFormControl
                          label={<span> {AddPeople.BACKUP_MANAGER}</span>}
                          placeholder="Select item"
                          value={values.backupManagerId || ''}
                          onChange={(e) => {
                            const FindBackupMangerOptions =
                              BackupMangerOptions.find(
                                (role) => role.id === e.target.value
                              );

                            setFieldValue(
                              'BackupMangerOptions',
                              FindBackupMangerOptions
                            );
                            setFieldValue('backupManagerId', e.target.value);
                          }}
                          options={BackupMangerOptions || []}
                          idKey="id"
                          nameKey={(option) => `${option.name}`}
                          isMultiple={false}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MultiSelectFormControl
                          label={<span>{AddPeople.LOCATION}</span>}
                          placeholder="Select item"
                          value={values.locationId || ''}
                          onChange={(e) => {
                            const FindLocationOptions = LocationOptions.find(
                              (role) => role.id === e.target.value
                            );

                            setFieldValue(
                              'LocationOptions',
                              FindLocationOptions
                            );
                            setFieldValue('locationId', e.target.value);
                          }}
                          options={LocationOptions || []}
                          idKey="id"
                          nameKey={(option) => `${option.name}`}
                          isMultiple={false}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MultiSelectFormControl
                          label={<span>{AddPeople.SHIFT}</span>}
                          placeholder="Select item"
                          value={values.shift || ''}
                          onChange={(e) => {
                            const FindShiftOptions = ShiftOptions.find(
                              (role) => role.id === e.target.value
                            );

                            setFieldValue('ShiftOptions', FindShiftOptions);
                            setFieldValue('shift', e.target.value);
                          }}
                          options={ShiftOptions || []}
                          idKey="id"
                          nameKey={(option) => `${option.name}`}
                          isMultiple={false}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MultiSelectFormControl
                          label="Department"
                          placeholder="Select departments"
                          value={values?.departmentId || ''}
                          onChange={(e) => {
                            const FindClientId =
                              departments?.data?.departments.find(
                                (dep) => dep.id === e.target.value
                              );

                            setFieldValue('department', FindClientId);
                            setFieldValue('departmentId', e.target.value);
                          }}
                          options={departments?.data?.departments || []}
                          idKey="id"
                          nameKey={(option) => `${option.name}`}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <MultiSelectFormControl
                          label={
                            <span>
                              {AddPeople.CONTRACT_TYPE}
                              {/* <span className="text-red-500 text-sm ml-[2px]">
                                *
                              </span> */}
                            </span>
                          }
                          placeholder="Select item"
                          value={values.contractType || ''}
                          onChange={(e) => {
                            const FindContractOptions = ContractOptions.find(
                              (role) => role.id === e.target.value
                            );

                            setFieldValue(
                              'ContractOptions',
                              FindContractOptions
                            );
                            setFieldValue('contractType', e.target.value);
                          }}
                          options={ContractOptions || []}
                          idKey="id"
                          nameKey={(option) => `${option.name}`}
                          isMultiple={false}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MultiSelectFormControl
                          label={
                            <span>
                              {AddPeople.WORK_TYPE}
                              <span className="text-red-500 text-sm ml-[2px]">
                                *
                              </span>
                            </span>
                          }
                          placeholder="Select item"
                          value={values.workType || ''}
                          onChange={(e) => {
                            const FindworkType = WorkTypeOptions.find(
                              (role) => role.id === e.target.value
                            );

                            setFieldValue('WorkTypeOptions', FindworkType);
                            setFieldValue('workType', e.target.value);
                          }}
                          options={WorkTypeOptions || []}
                          idKey="id"
                          nameKey={(option) => `${option.name}`}
                          isMultiple={false}
                        />
                        {errors.workType && touched.workType && (
                          <div className="text-red-500 text-xs absolute">
                            {errors.workType}
                          </div>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MultiSelectFormControl
                          label={
                            <span>
                              {AddPeople.ROLE}
                              <span className="text-red-500 text-sm ml-[2px]">
                                *
                              </span>
                            </span>
                          }
                          placeholder="Select item"
                          value={values.roleId || ''}
                          onChange={(e) => {
                            const FindClientId = data?.data?.roles.find(
                              (role) => role.id === e.target.value
                            );

                            setFieldValue('roles', FindClientId);
                            setFieldValue('roleId', e.target.value);
                          }}
                          options={data?.data?.roles || []}
                          idKey="id"
                          nameKey={(option) => `${option.name}`}
                          isMultiple={false}
                        />
                        {errors.roleId && touched.roleId && (
                          <div className="text-red-500 text-xs absolute">
                            {errors.roleId}
                          </div>
                        )}
                      </Grid>

                      <Grid item xs={12}>
                        <Typography
                          variant="body2"
                          color="primary"
                          onClick={viewPermissions}
                          style={{ cursor: 'pointer' }}
                        >
                          {AddPeople.VIEW_PERMESSIONS}
                        </Typography>
                      </Grid>
                      {showPermissions && (
                        <Grid item className="w-full overflow-x-auto">
                          <div className="flex relative">
                            <h1>{AddPeople.EFFECTIVE_PERMESSIONS}</h1>
                            <Typography
                              className="absolute left-3/4 bottom-2"
                              variant="body2"
                              color="primary"
                              onClick={viewPermissions}
                              style={{ cursor: 'pointer' }}
                            >
                              {AddPeople.HIDE_PERMESSIONS}
                            </Typography>
                          </div>
                          <UserPermessions roleId={values.roleId || ''} />
                        </Grid>
                      )}
                      <Grid
                        item
                        xs={12}
                        sx={{ display: 'flex', justifyContent: 'flex-end' }}
                      >
                        <div className="newRole flex space-x-4">
                          <Button
                            sx={{ border: 'none', fontWeight: '550' }}
                            tailwindClasses="!text-[#3c59d4] !bg-[#FFFFFF] !text-[15px] !capitalize !shadow-none !cursor-pointer !leading-6.4 !py-[8px] !px-[11px] !gap-1 "
                            onClick={() => resetForm()}
                            type="reset"
                          >
                            {AddPeople.CANCEL}
                          </Button>
                          <Button
                            sx={{
                              border: '1px solid #0070fa',
                              fontWeight: '550',
                            }}
                            tailwindClasses="!text-[#3c59d4] !bg-[#FFFFFF] !text-[15px] !capitalize !shadow-none !cursor-pointer !leading-6.4 !py-[8px] !px-[11px] !gap-1"
                            type="submit"
                            // onClick={() => setErrorState(true)}
                          >
                            {loader ? (
                              <Loader />
                            ) : id ? (
                              AddPeople.EDIT
                            ) : (
                              AddPeople.SAVE
                            )}
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
    </div>
  );
};

export default AddUser;
