import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  UserAllUsersResponse,
  GetRoleType,
  UserProfileResponse,
  GetAllParams,
  FindRoleType,
  ErrorResponse,
} from '../types/usersTypes';
import {
  AllUsers,
  onCreateUsers,
  getAllRoles,
  deleteUser,
  OnUserProfile,
  onDeptAllUsers,
  getAllProject,
  updateUser,
  getUserById,
  updateArchive,
  FormValuesProps,
  getRole,
} from '../api/UserService';
import { queryKeys } from '@appname/service';
import { showToast } from '@appname/ui';

type UseGetAllUsersParams = {
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
export const useAllUsers = (
  params: UseGetAllUsersParams
): UseQueryResult<UserAllUsersResponse, Error> => {
  return useQuery<UserAllUsersResponse, Error>({
    queryKey: [queryKeys.allUsers, params],
    queryFn: () => AllUsers(params),
  });
};
export const useCreateNewUser = () => {
  return useMutation({
    mutationKey: [queryKeys.newUser],
    mutationFn: (userData: any) => {
      return onCreateUsers(userData);
    },
    // onSuccess: (data: CreateUserResponse) => {
    //   console.log(data);
    // },
    onError: (error: { response: { data: ErrorResponse } }) => {
      const errorResponse: ErrorResponse = error.response.data;
      const errorMessages = errorResponse.errors
        .map((error) => error.message)
        .join(', ');
      showToast(errorMessages, 'error');
    },
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationKey: [queryKeys.deleteUser],
    mutationFn: (userId: string | undefined) => deleteUser(userId),
  });
};

// roles hooks
type UseGetAllRolesParams = {
  searchBy?: string;
  sortByColumn?: string | undefined;
  sortOrder?: 'ASC' | 'DESC' | undefined | string;
  pageNumber?: number;
  pageSize?: number;
};
// Get all roles
export const useGetAllRoles = (
  params: UseGetAllRolesParams
): UseQueryResult<GetRoleType, Error> => {
  return useQuery<GetRoleType, Error>({
    queryKey: [queryKeys.allRoles, params],
    queryFn: () => getAllRoles(params),
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: [queryKeys.updateUser],
    mutationFn: ({
      id,
      formValues,
    }: {
      id: string | undefined;
      formValues: FormData;
    }) => updateUser(id, formValues),
    onError: (error) => {
      console.error('Error updating role:', error);
    },
    onSuccess: (data) => {
      console.log('Role updated successfully:', data);
    },
  });
};
// ***********************useGetUserById*****************************

export const useGetUserById = (
  id: string | undefined
): UseQueryResult<UserProfileResponse, Error> => {
  return useQuery<UserProfileResponse, Error>({
    queryKey: [queryKeys.projectbyId, id],
    queryFn: () => getUserById(id),
  });
};
// ***********************useMyProfileById*****************************

export const useMyProfile = (id: string | undefined) => {
  return useQuery<UserProfileResponse>({
    queryKey: [queryKeys.userbyId],
    queryFn: () => OnUserProfile(id),
  });
};
// ***********************RoleById*****************************
export const useGetRoleById = (
  id: string | undefined
): UseQueryResult<FindRoleType, Error> => {
  return useQuery<FindRoleType, Error>({
    queryKey: [queryKeys.rolebyId, id],
    queryFn: () => getRole(id),
  });
};
// ***********************useUpdateArchive*****************************

export const useUpdateArchive = () => {
  return useMutation({
    mutationKey: [queryKeys.updateUser],
    mutationFn: ({
      id,
      formValues,
    }: {
      id: string | undefined;
      formValues: FormValuesProps;
    }) => updateArchive(id, formValues),
    onError: (error) => {
      console.error('Error updating role:', error);
    },
    onSuccess: (data) => {
      console.log('Role updated successfully:', data);
    },
  });
};

/***********************************filter****************************************/
export const useGetAllDepartments = (
  params: GetAllParams
): UseQueryResult<any, Error> => {
  return useQuery<any, Error>({
    queryKey: [queryKeys.allDepartment],
    queryFn: () => onDeptAllUsers(params),
  });
};
export const useGetAllProject = (
  params: GetAllParams
): UseQueryResult<any, Error> => {
  return useQuery<any, Error>({
    queryKey: [queryKeys.allProject, params],
    queryFn: () => getAllProject(params),
  });
};
