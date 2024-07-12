import {
  ENDPOINTS,
  del,
  get,
  multipart,
  multipartput,
  put,
} from '@appname/service';
import {
  CreateUserRequest,
  CreateUserResponse,
  UserAllUsersResponse,
  GetRoleType,
  DeleteUserResponse,
  UserProfileResponse,
  GetAllParams,
  UpdateUserResponse,
  FindRoleType,
  // UserResponseById,
  // UpdateUserResponse,
} from '../types/usersTypes';

// ***********************Get All user*****************************

type GetAllUserParams = {
  pageSize?: number;
  pageNumber?: number;
  searchBy?: string;
  filterBy?: any;
  sortBy?: string | undefined;
  sortOrder?: 'ASC' | 'DESC' | undefined | string;
  isArchive?: boolean;
  totalPages?: number;
  filterValue?: any;
};
export const AllUsers = (
  params: GetAllUserParams
): Promise<UserAllUsersResponse> => {
  const queryParams = new URLSearchParams();
  if (params.searchBy) queryParams.append('searchBy', params.searchBy);
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
  if (params.filterBy) queryParams.append('filterBy', params.filterBy);
  if (params.filterValue !== undefined) {
    params.filterValue.forEach((value: string, index: number) => {
      queryParams.append(`filterValue[${index}]`, value.toString());
    });
  }
  if (params.isArchive !== undefined && params.isArchive !== null)
    queryParams.append('isArchive', params.isArchive.toString());
  if (params.pageSize !== undefined)
    queryParams.append('pageSize', params.pageSize.toString());
  if (params.pageNumber !== undefined)
    queryParams.append('pageNumber', params.pageNumber.toString());

  return get<UserAllUsersResponse>(
    `${ENDPOINTS.getAllUsers}?${queryParams.toString()}`
  );
};
// ***********************Create user*****************************

export const onCreateUsers = (
  createUsers: CreateUserRequest
): Promise<CreateUserResponse> => {
  return multipart<CreateUserResponse, CreateUserRequest>(
    ENDPOINTS.createuser,
    createUsers
  );
};
// ***********************Edit user*****************************

export const updateUser = (
  id: string | undefined,
  formValues: FormData
): Promise<UpdateUserResponse> => {
  return multipartput<UpdateUserResponse, FormData>(
    ENDPOINTS.updateUser(id ?? ''),
    formValues
  );
};
// ***********************Delete user*****************************

export const deleteUser = (
  userId: string | undefined
): Promise<DeleteUserResponse> => {
  return del<DeleteUserResponse, void>(
    `${ENDPOINTS.deleteUser(userId as string)}`
  );
};

// ***********************GetRoles*****************************
type GetAllRolesParams = {
  searchBy?: string;
  sortByColumn?: string | undefined;
  sortOrder?: 'ASC' | 'DESC' | undefined | string;
  pageNumber?: number;
  pageSize?: number;
};

export const getAllRoles = (
  params: GetAllRolesParams
): Promise<GetRoleType> => {
  const queryParams = new URLSearchParams();
  return get<GetRoleType>(`${ENDPOINTS.getAllRoles}?${queryParams.toString()}`);
};
// ***********************RoleById*****************************
export const getRole = (id: string | undefined): Promise<FindRoleType> => {
  return get<FindRoleType>(ENDPOINTS.getRolebyId(id));
};
// ***********************UserById*****************************

export const getUserById = (
  id: string | undefined
): Promise<UserProfileResponse> => {
  return get<UserProfileResponse>(`${ENDPOINTS.getUserbyId(id as string)}`);
};
// ***********************UserProfileById*****************************

export const OnUserProfile = (
  id: string | undefined
): Promise<UserProfileResponse> => {
  return get<UserProfileResponse>(`${ENDPOINTS.getUserbyId(id as string)}`);
};

export interface FormValuesProps {
  isArchive: boolean;
}
// ***********************Archive*****************************

export const updateArchive = (
  id: string | undefined,
  formValues: FormValuesProps
): Promise<UpdateUserResponse> => {
  const requestUpdateArchive: FormValuesProps = formValues;
  return put<UpdateUserResponse, FormValuesProps>(
    ENDPOINTS.updateUser(id),
    requestUpdateArchive
  );
};
/***********************************filter****************************************/

export const onDeptAllUsers = (params: GetAllParams): Promise<any> => {
  const queryParams = new URLSearchParams();

  if (params.searchBy) queryParams.append('searchBy', params.searchBy);
  if (params.sortOrder !== undefined)
    queryParams.append('sortOrder', params.sortOrder.toString());
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.pageSize !== undefined)
    queryParams.append('pageSize', params.pageSize.toString());
  if (params.pageNumber !== undefined)
    queryParams.append('pageNumber', params.pageNumber.toString());
  if (params.filterBy !== undefined)
    queryParams.append('filterBy', params.filterBy.toString());
  if (params?.filterValue !== undefined)
    queryParams.append('filterValue', params.filterValue.toString());
  return get<any>(`${ENDPOINTS.getAlldepartments}?${queryParams.toString()}`);
};
export const getAllProject = (params: GetAllParams): Promise<any> => {
  const queryParams = new URLSearchParams();

  // if (params.searchBy) queryParams.append('searchBy', params.searchBy);
  // if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
  // if (params.sortBy)
  //   queryParams.append('sortBy', params.sortBy);
  // if (params.pageNumber !== undefined)
  //   queryParams.append('pageNumber', params.pageNumber.toString());
  // if (params.pageSize !== undefined)
  //   queryParams.append('pageSize', params.pageSize.toString());
  //   if (params.filterBy !== undefined)
  //   queryParams.append('filterBy', params.filterBy.toString());
  //   if (params.filterValue !== undefined)
  //   queryParams.append('filterValue', params.filterValue.toString());

  return get<any>(`${ENDPOINTS.getAllProjects}?${queryParams.toString()}`);
};
