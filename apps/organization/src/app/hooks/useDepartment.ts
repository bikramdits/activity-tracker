import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import { deleteDepartment, formValuesProps, getAllProject, getDepartment, onAllClients, onCreateDepartment, onDeptAllUsers, updateDepartment, updateDeptArchive } from '../api/DepartmentService';
import { queryKeys } from '@appname/service';
import { ErrorResponse, FormValuesprops, GetDepartmentResponseById, UseDepartmentParams } from '../types/departmentTypes';
import { showToast } from '@appname/ui';

type GetAllParams = {
  searchBy?: string;
  sortBy?: string | undefined;
  sortOrder?: 'ASC' | 'DESC' | undefined | string;
  pageNumber?: number;
  pageSize?: number;
  filterBy?:string;
  filterValue?:string | string[] | undefined;
};

export const useDepartment = (params: Partial<UseDepartmentParams>) => {
  return useQuery({
    queryKey: [queryKeys.allDepartment, params],
    queryFn: () => onDeptAllUsers(params),
  });
};

export const useCreateNewDepartment = () => {
  return useMutation({
    mutationKey: [queryKeys.newDepartment],
    mutationFn: (departmentData: FormValuesprops) => {
      return onCreateDepartment(departmentData);
    },
    onSuccess:(data)=>{
      const newdata=data.data
      console.log(newdata);
    },
    onError: (error:{ response: { data: ErrorResponse}}) => {
      const errorResponse : ErrorResponse = error.response.data;
      const errorMessages = errorResponse.errors.map(error => error.message).join(', ');
      showToast(errorMessages,'error')
    }
  }
  )
}

export const useDeleteDepartment = () => {
  return useMutation({
    mutationKey: [queryKeys.deleteDepartment],
    mutationFn: (userId: string | undefined) => deleteDepartment(userId),
    onError: (error:{ response: { data: ErrorResponse}}) => {
      const errorResponse : ErrorResponse = error.response.data;
      const errorMessages = errorResponse.errors.map(error => error.message).join(', ');
      showToast(errorMessages,'error')
    }
  })
}

//get department by id
 export const useGetDepartmentById =(id:string | undefined) : UseQueryResult <GetDepartmentResponseById,Error> =>{
  return useQuery <GetDepartmentResponseById,Error> ({
    queryKey:[queryKeys.departmentbyId,id],
    queryFn:()=>getDepartment(id),
  })
 }

// update department
export const useUpdateDepartment =()=>{
  return useMutation ({
    mutationKey:[queryKeys.updateDepartment],
    mutationFn:({id,formValues}:{ id: string | undefined; formValues: FormValuesprops }) =>
      updateDepartment(id,formValues),
    onError: (error: { response: { data: ErrorResponse}}) => {
      const errorResponse : ErrorResponse = error.response.data;
      const errorMessages = errorResponse.errors.map(error => error.message).join(', ');
      showToast(errorMessages,'error')
    }
  });
};

export const useGetAllProject= (params: GetAllParams): UseQueryResult<any, Error> => {
  return useQuery<any, Error>({
    queryKey: [queryKeys.allProject, params],
    queryFn: () => getAllProject(params),
  });
};

export const useGetAllClients=(params:GetAllParams):UseQueryResult<any,Error>=>{
  return useQuery<any,Error>({
     queryKey:[queryKeys.allClients],
     queryFn:()=>onAllClients(params)
  })
 }

export const useDepartmentArchive = ()=>{
  return useMutation({
    mutationKey:[queryKeys.updateDepartment],
    mutationFn:({
      id,
      formValues,
    }: {
      id: string;
      formValues: formValuesProps;
    }) =>updateDeptArchive(id,formValues),
    onError: (error:{ response: { data: ErrorResponse}}) => {
      const errorResponse : ErrorResponse = error.response.data;
      const errorMessages = errorResponse.errors.map(error => error.message).join(', ');
      showToast(errorMessages,'error')
    }
    })
}
