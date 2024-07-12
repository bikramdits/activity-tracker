import { Typography } from '@mui/material';
import {
  Button,
  InputField,
  MultilineTextField,
  showToast,
  Loader,
} from '@appname/ui';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  useAddRole,
  useGetRoleById,
  useUpdateRole,
} from '../../../hooks/useRole';
import { Formik, Form } from 'formik';
import {
  AddRoleEnum,
  AddRoleLabelEnum,
  AddRoleNameEnum,
  AddRoleTitleEnum,
  ButtonTitleEnum,
} from '../enum/RolesEnum';
import { AddRoleValidationSchema } from '../../../utils/schema/AddRoleValidationSchema';
import { Permissions, Permission } from './Permissions';

import React from 'react';

/********** Define formvalues interface *************/
export interface PermissionProps {
  activityManagement: Permission;
  clientManagement: Permission;
  leaveManagement: Permission;
  projectManagement: Permission;
  shiftManagement: Permission;
  taskManagement: Permission;
  taskTemplateManagement: Permission;
  userManagement: Permission;
}

export interface FormValues {
  name: string | undefined;
  description: string | undefined;
  slug: string | undefined;
  isActive: boolean;
  permission: PermissionProps;
}
export const AddRole = () => {
  const [loader, setLoader] = React.useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const permissionsInitialvalues: Permission = {
    read: false,
    write: false,
  };

  /**************** Hooks for mutation and data fetching *******************/

  const { mutateAsync } = useAddRole();
  const { mutateAsync: updateRoleMutation } = useUpdateRole();
  const { data, isLoading } = useGetRoleById(id);
  const getRole = data?.data?.role ?? null;
  let convertJson = null;
  let convertPermissionJson;

  if (getRole && typeof getRole.permission === 'string') {
    try {
      convertJson = JSON.parse(getRole?.permission);
      if (convertJson !== null) {
        convertPermissionJson = convertJson[0];
      }
    } catch (e) {
      console.error('Error parsing JSON:', e);
    }
  }

  /******************** Function to transform permissions object to array ***************************/

  const transformPermissionsToArray = (
    permissions: FormValues['permission']
  ) => {
    const {
      activityManagement,
      clientManagement,
      leaveManagement,
      projectManagement,
      shiftManagement,
      taskManagement,
      taskTemplateManagement,
      userManagement,
    } = permissions;
    return [
      {
        activityManagement,
        clientManagement,
        leaveManagement,
        projectManagement,
        shiftManagement,
        taskManagement,
        taskTemplateManagement,
        userManagement,
      },
    ];
  };

  /**********************Function to add a new role *****************************/

  const addRoles = async (values: FormValues) => {
    setLoader(true);
    try {
      const transformedPermissions = transformPermissionsToArray(
        values.permission
      );
      const response = await mutateAsync({
        name: values.name,
        // slug: values.name,
        description: values.description,
        isActive: true,
        permission: transformedPermissions,
      });
      showToast(response.message, 'success');
      setLoader(false);
      navigate('/settings/roles');
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  /****************************Function to update role ***************************/

  const updateRoles = async (values: FormValues) => {
    setLoader(true);
    const transformedPermissions = transformPermissionsToArray(
      values.permission
    );
    const updateValues = {
      name: values.name,
      description: values.description,
      // slug: values.name,
      isActive: true,
      isArchive: true,
      permission: transformedPermissions,
    };
    try {
      const response = await updateRoleMutation({
        id: id,
        formValues: updateValues,
      });
      showToast(response?.message, 'success');
      navigate('/settings/roles');
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    <div>Loading...</div>;
  }
  return (
    <div className="w-full pt-[80px] bg-[#f9f9f9] h-full p-4">
      <div className="flex justify-between items-center bg-[#f9f9f9]">
        <Typography variant="h5" component="h5" className="text-2xl !font-bold">
          {id ? AddRoleTitleEnum.EDIT_ROLE : AddRoleTitleEnum.ADD_ROLE}
        </Typography>
        <Button
          id="button"
          tailwindClasses="!font-bold hover:!bg-[#cae2ff] !border-[#0070fa] !border-solid !border !text-[#3c59d4] bg-white	!text-[15px] !capitalize !shadow-none !cursor-pointer !leading-6.4 !py-[8px] !px-[11px] !gap-1"
          onClick={() => navigate('/settings/roles')}
        >
          <KeyboardBackspaceIcon />
          {AddRoleEnum.BACK}
        </Button>
      </div>
      <div className="bg-white border rounded-lg mt-3 h-[calc(100vh-150px)] overflow-auto">
        <Formik
          initialValues={{
            slug: getRole ? getRole?.slug : '',
            name: getRole ? getRole?.name : '',
            description: getRole ? getRole?.description : '',
            isActive: true,
            permission:
              getRole && getRole?.permission
                ? convertPermissionJson || getRole?.permission[0]
                : {
                    activityManagement: permissionsInitialvalues,
                    clientManagement: permissionsInitialvalues,
                    leaveManagement: permissionsInitialvalues,
                    projectManagement: permissionsInitialvalues,
                    shiftManagement: permissionsInitialvalues,
                    taskManagement: permissionsInitialvalues,
                    taskTemplateManagement: permissionsInitialvalues,
                    userManagement: permissionsInitialvalues,
                  },
          }}
          validationSchema={AddRoleValidationSchema}
          onSubmit={id ? updateRoles : addRoles}
          enableReinitialize={true}
        >
          {({ values, handleChange, errors, touched }) => {
            return (
              <Form>
                <div className="p-4 inputFieldWrapper relative">
                  <InputField
                    id="outlined-basic"
                    label={
                      <span>
                        {AddRoleLabelEnum.NAME}
                        <span className="text-red-500 text-sm ml-[2px]">*</span>
                      </span>
                    }
                    variant="outlined"
                    className="!w-full"
                    name={AddRoleNameEnum.ROLE_NAME}
                    type="text"
                    value={values?.name}
                    onChange={handleChange}
                    error={touched.name ? errors.name : null}
                  />
                  {errors && touched.name && errors.name && (
                    <div className="text-red-500 text-sm absolute">
                      {errors.name}
                    </div>
                  )}
                </div>
                <div className="w-full p-4 relative">
                  <MultilineTextField
                    id="outlined-multiline-flexible"
                    label={
                      <span>
                        {AddRoleLabelEnum.DESCRIPTION}
                        <span className="text-red-500 text-sm ml-[2px]">*</span>
                      </span>
                    }
                    maxRows={4}
                    className="!w-full"
                    name={AddRoleNameEnum.DESCRIPTION_NAME}
                    onChange={handleChange}
                    value={values?.description}
                    error={touched.description ? errors.description : null}
                  />
                  {errors && errors.description && touched.description && (
                    <div className="text-red-500 text-sm absolute">
                      {errors.description}
                    </div>
                  )}
                </div>
                <Permissions />
                <div className="flex justify-end p-4 buttonWrapper">
                  <Button
                    tailwindClasses="!text-[#3c59d4] !bg-[#FFFFFF] !text-[15px] !capitalize !shadow-none !cursor-pointer !font-bold !leading-6.4 !py-[8px] !px-[11px] !gap-1 !mr-[20px]"
                    onClick={() => navigate('/settings/roles')}
                  >
                    {ButtonTitleEnum.CANCEL}
                  </Button>
                  <Button
                    type="submit"
                    sx={{
                      border: '1px solid #0070fa',
                    }}
                    tailwindClasses="!text-[#3c59d4] !bg-[#FFFFFF] !text-[15px] !capitalize !shadow-none !cursor-pointer !font-bold !leading-6.4 !py-[8px] !px-[11px] !gap-1"
                  >
                    {loader ? (
                      <Loader />
                    ) : id ? (
                      ButtonTitleEnum.UPDATE
                    ) : (
                      ButtonTitleEnum.SAVE
                    )}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
