import { Typography } from '@mui/material';
import {
  AddRoleEnum,
  AddRoleLabelEnum,
  AddRoleTitleEnum,
} from '../enum/RolesEnum';
import { Checkbox } from '@appname/ui';
import { FormikHelpers, useFormikContext } from 'formik';
import { FormValues } from './RoleForm';

/********* Define permissions interface *************/
export interface Permission {
  read: boolean;
  write: boolean;
}
export const Permissions = () => {
  
  /*********************** Use the useFormikContext hook to access form values and functions **********************************/

  const { setFieldValue, values } = useFormikContext<FormValues>();

  /**************** Function to handle permission change ********************/

  const permissionChange = (
    setFieldValue: FormikHelpers<FormValues>['setFieldValue'],
    section: keyof FormValues['permission'],
    permission: keyof Permission,
    value: boolean
  ) => {
    setFieldValue(`permission.${section}.${permission}`, value);
  };
  return (
    <div>
      <Typography variant="h5" component="h5" className="!text-xl p-4">
        {AddRoleEnum.PERMISSIONS}
      </Typography>
      <div className="grid grid-cols-3 border-b border-t">
        <div className="flex-1 flex flex-col p-4 pl-0 border-r border-slate-300 pr-[24px] border-b">
          <div className="flex justify-between items-center pl-5">
            <Typography variant="h5" component="h5" className="!text-base">
              {AddRoleTitleEnum.ACTIVITY_MANAGEMENT}
            </Typography>
            <Checkbox
              label={AddRoleLabelEnum.ALL}
              checked={
                values?.permission?.activityManagement?.read &&
                values?.permission?.activityManagement?.write
              }
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.ACTIVITY_MANAGEMENT,
                  AddRoleEnum.READ,
                  isChecked
                );
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.ACTIVITY_MANAGEMENT,
                  AddRoleEnum.WRITE,
                  isChecked
                );
              }}
              name={AddRoleLabelEnum.ALL.toLocaleLowerCase()}
            />
          </div>
          <div className="pl-5">
            <Checkbox
              label={AddRoleLabelEnum.READ}
              checked={values?.permission?.activityManagement?.read}
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.ACTIVITY_MANAGEMENT,
                  AddRoleEnum.READ,
                  isChecked
                );
              }}
              name={AddRoleEnum.READ}
            />
          </div>
          <div className="pl-5">
            <Checkbox
              label={AddRoleLabelEnum.WRITE}
              checked={values?.permission?.activityManagement?.write}
              //
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.ACTIVITY_MANAGEMENT,
                  AddRoleEnum.WRITE,
                  isChecked
                );
              }}
              name={AddRoleEnum.WRITE}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col p-4 border-r border-slate-300 pr-[24px] border-b">
          <div className="flex justify-between items-center p-0">
            <Typography variant="h5" component="h5" className="!text-base">
              {AddRoleTitleEnum.CLIENT_MANAGEMENT}
            </Typography>
            <Checkbox
              label={AddRoleLabelEnum.ALL}
              checked={
                values.permission.clientManagement.read &&
                values.permission.clientManagement.write
              }
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.CLIENT_MANAGEMENT,
                  AddRoleEnum.READ,
                  isChecked
                );
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.CLIENT_MANAGEMENT,
                  AddRoleEnum.WRITE,
                  isChecked
                );
              }}
              name={AddRoleLabelEnum.ALL.toLowerCase()}
            />
          </div>
          <div className="w-20">
            <Checkbox
              label={AddRoleLabelEnum.READ}
              checked={values.permission.clientManagement.read}
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.CLIENT_MANAGEMENT,
                  AddRoleEnum.READ,
                  isChecked
                );
              }}
              name={AddRoleEnum.READ}
            />
          </div>
          <div className="w-20">
            <Checkbox
              label={AddRoleLabelEnum.WRITE}
              checked={values.permission.clientManagement.write}
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.CLIENT_MANAGEMENT,
                  AddRoleEnum.WRITE,
                  isChecked
                );
              }}
              name={AddRoleEnum.WRITE}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col p-4 border-b border-slate-300">
          <div className="flex justify-between items-center p-0 ">
            <Typography variant="h5" component="h5" className="!text-base">
              {AddRoleTitleEnum.LEAVE_MANAGEMENT}
            </Typography>
            <Checkbox
              label={AddRoleLabelEnum.ALL}
              checked={
                values.permission.leaveManagement.read &&
                values.permission.leaveManagement.write
              }
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.LEAVE_MANAGEMENT,
                  AddRoleEnum.READ,
                  isChecked
                );
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.LEAVE_MANAGEMENT,
                  AddRoleEnum.WRITE,
                  isChecked
                );
              }}
              name={AddRoleLabelEnum.ALL.toLowerCase()}
            />
          </div>
          <div className="w-20">
            <Checkbox
              label={AddRoleLabelEnum.READ}
              checked={values.permission.leaveManagement.read}
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.LEAVE_MANAGEMENT,
                  AddRoleEnum.READ,
                  isChecked
                );
              }}
              name={AddRoleEnum.READ}
            />
          </div>
          <div className="w-20">
            <Checkbox
              label={AddRoleLabelEnum.WRITE}
              checked={values.permission.leaveManagement.write}
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.LEAVE_MANAGEMENT,
                  AddRoleEnum.WRITE,
                  isChecked
                );
              }}
              name={AddRoleEnum.WRITE}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col p-4 pl-0 border-r border-slate-300 pr-[24px] border-b">
          <div className="flex justify-between items-center pl-5">
            <Typography variant="h5" component="h5" className="!text-base">
              {AddRoleTitleEnum.PROJECT_MANAGEMENT}
            </Typography>
            <Checkbox
              label={AddRoleLabelEnum.ALL}
              checked={
                values.permission.projectManagement.read &&
                values.permission.projectManagement.write
              }
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.PROJECT_MANAGEMENT,
                  AddRoleEnum.WRITE,
                  isChecked
                );
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.PROJECT_MANAGEMENT,
                  AddRoleEnum.READ,
                  isChecked
                );
              }}
              name={AddRoleLabelEnum.ALL.toLowerCase()}
            />
          </div>
          <div className="pl-5">
            <Checkbox
              label={AddRoleLabelEnum.READ}
              checked={values.permission.projectManagement.read}
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.PROJECT_MANAGEMENT,
                  AddRoleEnum.READ,
                  isChecked
                );
              }}
              name={AddRoleEnum.READ}
            />
          </div>
          <div className="pl-5">
            <Checkbox
              label={AddRoleLabelEnum.WRITE}
              checked={values.permission.projectManagement.write}
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.PROJECT_MANAGEMENT,
                  AddRoleEnum.WRITE,
                  isChecked
                );
              }}
              name={AddRoleEnum.WRITE}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col p-4 border-r border-slate-300 pr-[24px] border-b">
          <div className="flex justify-between items-center p-0">
            <Typography variant="h5" component="h5" className="!text-base">
              {AddRoleTitleEnum.SHIFT_MANAGEMENT}
            </Typography>
            <Checkbox
              label={AddRoleLabelEnum.ALL}
              checked={
                values.permission.shiftManagement.read &&
                values.permission.shiftManagement.write
              }
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.SHIFT_MANAGEMENT,
                  AddRoleEnum.READ,
                  isChecked
                );
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.SHIFT_MANAGEMENT,
                  AddRoleEnum.WRITE,
                  isChecked
                );
              }}
              name={AddRoleLabelEnum.ALL.toLowerCase()}
            />
          </div>
          <div className="w-20">
            <Checkbox
              label={AddRoleLabelEnum.READ}
              checked={values.permission.shiftManagement.read}
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.SHIFT_MANAGEMENT,
                  AddRoleEnum.READ,
                  isChecked
                );
              }}
              name={AddRoleEnum.READ}
            />
          </div>
          <div className="w-20">
            <Checkbox
              label={AddRoleLabelEnum.WRITE}
              checked={values.permission.shiftManagement.write}
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.SHIFT_MANAGEMENT,
                  AddRoleEnum.WRITE,
                  isChecked
                );
              }}
              name={AddRoleEnum.WRITE}
            />
          </div>
        </div>
        <div className="flex-1 p-4 flex flex-col border-b border-slate-300">
          <div className="flex justify-between items-center p-0">
            <Typography variant="h5" component="h5" className="!text-base">
              {AddRoleTitleEnum.TASK_MANAGEMENT}
            </Typography>
            <Checkbox
              label={AddRoleLabelEnum.ALL}
              checked={
                values.permission.taskManagement.read &&
                values.permission.taskManagement.write
              }
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.TASK_MANAGEMENT,
                  AddRoleEnum.WRITE,
                  isChecked
                );
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.TASK_MANAGEMENT,
                  AddRoleEnum.READ,
                  isChecked
                );
              }}
              name={AddRoleLabelEnum.ALL.toLowerCase()}
            />
          </div>
          <div className="w-20">
            <Checkbox
              label={AddRoleLabelEnum.READ}
              checked={values.permission.taskManagement.read}
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.TASK_MANAGEMENT,
                  AddRoleEnum.READ,
                  isChecked
                );
              }}
              name={AddRoleEnum.READ}
            />
          </div>
          <div className="w-20">
            <Checkbox
              label={AddRoleLabelEnum.WRITE}
              checked={values.permission.taskManagement.write}
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.TASK_MANAGEMENT,
                  AddRoleEnum.WRITE,
                  isChecked
                );
              }}
              name={AddRoleEnum.WRITE}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col p-4 pl-0 border-r border-slate-300 pr-[24px]">
          <div className="flex justify-between items-center pl-5">
            <Typography variant="h5" component="h5" className="!text-base">
              {AddRoleTitleEnum.TASK_TEMPLATE_MANAGEMENT}
            </Typography>
            <Checkbox
              label={AddRoleLabelEnum.ALL}
              checked={
                values.permission.taskTemplateManagement.read &&
                values.permission.taskTemplateManagement.write
              }
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.TASK_TEMPLATE_MANAGEMENT,
                  AddRoleEnum.WRITE,
                  isChecked
                );
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.TASK_TEMPLATE_MANAGEMENT,
                  AddRoleEnum.READ,
                  isChecked
                );
              }}
              name={AddRoleLabelEnum.ALL.toLowerCase()}
            />
          </div>
          <div className="pl-5">
            <Checkbox
              label={AddRoleLabelEnum.READ}
              checked={values.permission.taskTemplateManagement.read}
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.TASK_TEMPLATE_MANAGEMENT,
                  AddRoleEnum.READ,
                  isChecked
                );
              }}
              name={AddRoleEnum.READ}
            />
          </div>
          <div className="pl-5">
            <Checkbox
              label={AddRoleLabelEnum.WRITE}
              checked={values.permission.taskTemplateManagement.write}
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.TASK_TEMPLATE_MANAGEMENT,
                  AddRoleEnum.WRITE,
                  isChecked
                );
              }}
              name={AddRoleEnum.WRITE}
            />
          </div>
        </div>
        <div className="flex-1 p-4 flex flex-col border-r border-slate-300 pr-[24px]">
          <div className="flex  justify-between items-center ">
            <Typography variant="h5" component="h5" className="!text-base">
              {AddRoleTitleEnum.USER_MANAGEMENT}
            </Typography>
            <Checkbox
              label={AddRoleLabelEnum.ALL}
              checked={
                values.permission.userManagement.read &&
                values.permission.userManagement.write
              }
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.USER_MANAGEMENT,
                  AddRoleEnum.WRITE,
                  isChecked
                );
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.USER_MANAGEMENT,
                  AddRoleEnum.READ,
                  isChecked
                );
              }}
              name={AddRoleLabelEnum.ALL.toLowerCase()}
            />
          </div>
          <div className="w-20">
            <Checkbox
              label={AddRoleLabelEnum.READ}
              checked={values.permission.userManagement.read}
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.USER_MANAGEMENT,
                  AddRoleEnum.READ,
                  isChecked
                );
              }}
              name={AddRoleEnum.READ}
            />
          </div>
          <div className="w-20">
            <Checkbox
              label={AddRoleLabelEnum.WRITE}
              checked={values.permission.userManagement.write}
              onChange={(e) => {
                const isChecked = e.target.checked;
                permissionChange(
                  setFieldValue,
                  AddRoleEnum.USER_MANAGEMENT,
                  AddRoleEnum.WRITE,
                  isChecked
                );
              }}
              name={AddRoleEnum.WRITE}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
