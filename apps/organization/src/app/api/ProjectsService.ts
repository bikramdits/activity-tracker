import { ENDPOINTS, del, get, post, put } from '@appname/service';
import {
  AddProjectsResponse,
  AllProjectResponse,
  DeleteProjectResponse,
  FindProjectType,
  FormValuesRequest,
  UpdateProjectResponse,
} from '../types/projectsTypes';

type GetAllProjectsParams = {
  searchBy?: string;
  sortBy?: string | undefined;
  sortOrder?: 'ASC' | 'DESC' | undefined | string;
  pageNumber?: number;
  pageSize?: number;
  filterValue?: any;
  filterBy?: any;
  isArchive?: boolean;
};
/*********************************** Department filter****************************************/

export const onDeptAllUsers = (params: GetAllProjectsParams): Promise<any> => {
  const queryParams = new URLSearchParams();

  if (params.searchBy) queryParams.append('searchBy', params.searchBy);
  if (params.sortOrder !== undefined)
    queryParams.append('sortOrder', params.sortOrder.toString());
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.pageSize !== undefined)
    queryParams.append('pageSize', params.pageSize.toString());
  if (params.pageNumber !== undefined)
    queryParams.append('pageNumber', params.pageNumber.toString());
  // if (params.filterBy) queryParams.append('filterBy', params.filterBy);
  // if (params?.filterValue)
  //   queryParams.append('filterValue', params.filterValue);
  return get<any>(`${ENDPOINTS.getAlldepartments}?${queryParams.toString()}`);
};

/***********************************Client filter****************************************/

type UseClientsParams = {
  pageSize?: number;
  pageNumber?: number;
  searchBy?: string;
  filterBy?: string;
  filterValue?: string;
  sortBy?: string;
  sortOrder?: string;
  isArchive?: boolean;
  totalPages?: number;
};
export const onAllClients = (params: Partial<UseClientsParams>) => {
  const queryParams = new URLSearchParams();
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
  if (params.searchBy) queryParams.append('searchBy', params.searchBy);
  if (params.pageSize !== undefined)
    queryParams.append('pageSize', params.pageSize.toString());
  if (params.pageNumber !== undefined)
    queryParams.append('pageNumber', params.pageNumber.toString());
  if (params.filterBy) queryParams.append('filterBy', params.filterBy);
  if (params.filterValue) queryParams.append('filterValue', params.filterValue);
  if (params.isArchive !== undefined)
    queryParams.append('isArchive', params.isArchive.toString());

  return get<any>(`${ENDPOINTS.getAllClients}?${queryParams.toString()}`);
};

/***********************************Project All API's****************************************/

export const getAllProjects = (params: any): Promise<AllProjectResponse> => {
  const queryParams = new URLSearchParams();

  if (params.searchBy) queryParams.append('searchBy', params.searchBy);
  if (params.sortOrder !== undefined)
    queryParams.append('sortOrder', params.sortOrder.toString());
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.pageNumber !== undefined)
    queryParams.append('pageNumber', params.pageNumber.toString());
  if (params.pageSize !== undefined)
    queryParams.append('pageSize', params.pageSize.toString());
  if (params.filterBy) queryParams.append('filterBy', params.filterBy);
  if (params.filterValue !== undefined) {
    params.filterValue.forEach((value: string, index: number) => {
      queryParams.append(`filterValue[${index}]`, value.toString());
    });
  }
  if (params.isArchive !== undefined && params.isArchive !== null)
    queryParams.append('isArchive', params.isArchive.toString());

  return get<AllProjectResponse>(
    `${ENDPOINTS.getAllProjects}?${queryParams.toString()}`
  );
};

export const createProject = (
  AddProject: FormValuesRequest
): Promise<AddProjectsResponse> => {
  return post<AddProjectsResponse, FormValuesRequest>(
    ENDPOINTS.createProjects,
    AddProject
  );
};
export const getProject = (
  id: string | undefined
): Promise<FindProjectType> => {
  return get<FindProjectType>(`${ENDPOINTS.getProjectsbyId(id as string)}`);
};

export const deleteProjects = (
  userId: string | undefined
): Promise<DeleteProjectResponse> => {
  return del<DeleteProjectResponse, void>(
    `${ENDPOINTS.deleteProjects(userId as string)}`
  );
};

export const updateProject = (
  id: string | undefined,
  formValues: FormValuesRequest
): Promise<UpdateProjectResponse> => {
  const requestUpdateproject: FormValuesRequest = formValues;
  return put<UpdateProjectResponse, FormValuesRequest>(
    `${ENDPOINTS.updateProjects(id as string)}`,
    requestUpdateproject
  );
};

export interface FormValuesProps {
  isArchive: boolean;
}
export const updateArchive = (
  id: string | undefined,
  formValues: FormValuesProps
): Promise<UpdateProjectResponse> => {
  const requestUpdateArchive: FormValuesProps = formValues;
  return put<UpdateProjectResponse, FormValuesProps>(
    ENDPOINTS.updateProjects(id as string),
    requestUpdateArchive
  );
};
