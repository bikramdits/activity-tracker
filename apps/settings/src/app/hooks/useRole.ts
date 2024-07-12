import { useQuery, UseQueryResult, useMutation } from '@tanstack/react-query';
import { GetRoleType } from '../roles/components/types/GetRoleType';
import {
  addRole,
  deleteRole,
  getAllRoles,
  getRole,
  updateRole,
  updateRolesPermissions,
  updateRolesValuesProps,
} from '../api/RoleService';
import { FindRoleType } from '../roles/components/types/GetRoleTypeById';
import { FormValuesProps } from '../roles/components/types/FormValuesProps';
import { queryClient, queryKeys } from '@appname/service';

type UseGetAllRolesParams = {
  searchBy?: string;
  sortBy?: string | undefined;
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

// Delete role
export const useDeleteRole = () => {
  return useMutation({
    mutationKey: [queryKeys.deleteRole],
    mutationFn: (userId: string | undefined) => deleteRole(userId),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
//get role by id
export const useGetRoleById = (
  id: string | undefined
): UseQueryResult<FindRoleType, Error> => {
  return useQuery<FindRoleType, Error>({
    queryKey: [queryKeys.rolebyId, id],
    queryFn: () => getRole(id),
  });
};

export const useAddRole = () => {
  return useMutation({
    mutationKey: [queryKeys.newRole],
    mutationFn: (formValues: FormValuesProps) => {
      return addRole(formValues);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
// update role
export const useUpdateRole = () => {
  return useMutation({
    mutationKey: [queryKeys.updateRole],
    mutationFn: ({
      id,
      formValues,
    }: {
      id: string | undefined;
      formValues: FormValuesProps;
    }) => updateRole(id, formValues),
    onError: (error) => {
      console.error('Error updating role:', error);
    },
    onSuccess: (data) => {
      console.log('Role updated successfully:', data);
    },
  });
};

export const useUpdateRolesAndPermissions = () => {
  return useMutation({
    mutationKey: [queryKeys.updateRole],
    mutationFn: ({
      id,
      formValues,
    }: {
      id: string | undefined;
      formValues: updateRolesValuesProps;
    }) =>updateRolesPermissions(id, formValues),
    onError: (error) => {
      console.error('Error updating role:', error);
    },
    onSuccess: (data) => {
      console.log('Role updated successfully:', data);
    },
  });
};

