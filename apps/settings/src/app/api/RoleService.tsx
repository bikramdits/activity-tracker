import { get, del, post, put } from '@appname/service';
import { GetRoleType } from '../roles/components/types/GetRoleType';
import { DeleteRoleResponse } from '../roles/components/types/DeleteRoleResponse';
import { FindRoleType } from '../roles/components/types/GetRoleTypeById';
import { AddRoleResponseType } from '../roles/components/types/AddRoleResponseType';
import { UpdateRoleResponse } from '../roles/components/types/UpdateRoleResponse';
import { FormValuesProps } from '../roles/components/types/FormValuesProps';
import { ENDPOINTS } from '@appname/service';

type GetAllRolesParams = {
  searchBy?: string;
  sortBy?: string | undefined;
  sortOrder?: 'ASC' | 'DESC' | undefined | string;
  pageNumber?: number;
  pageSize?: number;
};

export const getAllRoles = (
  params: GetAllRolesParams
): Promise<GetRoleType> => {
  const queryParams = new URLSearchParams();

  if (params.searchBy) queryParams.append('searchBy', params.searchBy);
  if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
  if (params.sortBy)
    queryParams.append('sortBy', params.sortBy);
  if (params.pageNumber !== undefined)
    queryParams.append('pageNumber', params.pageNumber.toString());
  if (params.pageSize !== undefined)
    queryParams.append('pageSize', params.pageSize.toString());

  return get<GetRoleType>(`${ENDPOINTS.getAllRoles}?${queryParams.toString()}`);
};

export const deleteRole = (
  userId: string | undefined
): Promise<DeleteRoleResponse> => {
  return del<DeleteRoleResponse, void>(ENDPOINTS.deleteRole(userId));
};

export const getRole = (id: string | undefined): Promise<FindRoleType> => {
  return get<FindRoleType>(ENDPOINTS.getRolebyId(id));
};

export const addRole = (
  formValues: FormValuesProps
): Promise<AddRoleResponseType> => {
  return post<AddRoleResponseType, FormValuesProps>(ENDPOINTS.createRole, formValues);
};

export const updateRole = (
  id: string | undefined,
  formValues: FormValuesProps
): Promise<UpdateRoleResponse> => {
  const requestUpdateRole: FormValuesProps = formValues;
  return put<UpdateRoleResponse, FormValuesProps>(
    ENDPOINTS.updateRole(id),
    requestUpdateRole
  );
};

export interface updateRolesValuesProps {
  isActive: boolean;
}

export const updateRolesPermissions = (
  id: string | undefined ,
  formValues: updateRolesValuesProps
): Promise<UpdateRoleResponse> => {
  const requestUpdateArchive: updateRolesValuesProps = formValues;
  return put<UpdateRoleResponse, updateRolesValuesProps>(ENDPOINTS.updateRole(id), requestUpdateArchive);
};
