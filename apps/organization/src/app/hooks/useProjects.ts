import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  AddProjectsResponse,
  AllProjectResponse,
  ErrorResponse,
  FindProjectType,
  FormValuesRequest,
} from '../types/projectsTypes';
import {
  createProject,
  deleteProjects,
  FormValuesProps,
  getAllProjects,
  getProject,
  onAllClients,
  updateArchive,
  updateProject,
} from '../api/ProjectsService';
import { queryKeys } from '@appname/service';
import { onDeptAllUsers } from '../api/DepartmentService';
import { showToast } from '@appname/ui';

type UseGetAllProjectsParams = {
  searchBy?: string;
  sortBy?: string | undefined;
  sortOrder?: 'ASC' | 'DESC' | undefined | string;
  pageNumber?: number;
  pageSize?: number;
  filterBy?: string;
  filterValue?: any;
  isArchive?: boolean;
};

/***********************************filter****************************************/
export const useGetAllDepartments = (
  params: UseGetAllProjectsParams
): UseQueryResult<any, Error> => {
  return useQuery<any, Error>({
    queryKey: [queryKeys.allDepartment],
    queryFn: () => onDeptAllUsers(params),
  });
};

export const useGetAllClients = (
  params: UseGetAllProjectsParams
): UseQueryResult<any, Error> => {
  return useQuery<any, Error>({
    queryKey: [queryKeys.allClients],
    queryFn: () => onAllClients(params),
  });
};

/***********************************project API's****************************************/

export const useGetAllProjects = (
  params: UseGetAllProjectsParams
): UseQueryResult<AllProjectResponse, Error> => {
  return useQuery<AllProjectResponse, Error>({
    queryKey: [queryKeys.allProject, params],
    queryFn: () => getAllProjects(params),
  });
};

export const useAddProject = () => {
  return useMutation({
    mutationKey: [queryKeys.newProject],
    mutationFn: (ProjectData: FormValuesRequest) => {
      return createProject(ProjectData);
    },
    onSuccess: (data: AddProjectsResponse) => {
      console.log(data, '=-=-=-=-=-data');
    },
    onError: (error: { response: { data: ErrorResponse } }) => {
      const errorResponse: ErrorResponse = error.response.data;
      const errorMessages = errorResponse.errors
        .map((error) => error.message)
        .join(', ');
      showToast(errorMessages, 'error');
    },
  });
};

//get project by id
export const useGetProjectById = (
  id: string | undefined
): UseQueryResult<FindProjectType, Error> => {
  return useQuery<FindProjectType, Error>({
    queryKey: [queryKeys.projectbyId, id],
    queryFn: () => getProject(id),
  });
};
export const useDeleteProjects = () => {
  return useMutation({
    mutationKey: [queryKeys.deleteProject],
    mutationFn: (userId: string | undefined) => deleteProjects(userId),
    onError: (error: { response: { data: ErrorResponse } }) => {
      const errorResponse: ErrorResponse = error.response.data;
      const errorMessages = errorResponse.errors
        .map((error) => error.message)
        .join(', ');
      showToast(errorMessages, 'error');
    },
  });
};

export const useUpdateProject = () => {
  return useMutation({
    mutationKey: [queryKeys.updateProject],
    mutationFn: ({
      id,
      formValues,
    }: {
      id: string | undefined;
      formValues: FormValuesRequest;
    }) => updateProject(id, formValues),
    onError: (error: { response: { data: ErrorResponse } }) => {
      const errorResponse: ErrorResponse = error.response.data;
      const errorMessages = errorResponse.errors
        .map((error) => error.message)
        .join(', ');
      showToast(errorMessages, 'error');
    },
  });
};

export const useUpdateArchive = () => {
  return useMutation({
    mutationKey: [queryKeys.updateProject],
    mutationFn: ({
      id,
      formValues,
    }: {
      id: string | undefined;
      formValues: FormValuesProps;
    }) => updateArchive(id, formValues),
    onError: (error: { response: { data: ErrorResponse } }) => {
      const errorResponse: ErrorResponse = error.response.data;
      const errorMessages = errorResponse.errors
        .map((error) => error.message)
        .join(', ');
      showToast(errorMessages, 'error');
    },
  });
};
