import { ScreenshotProjectIdResponse } from './../types/Activitytypes';
import { ENDPOINTS, get, del } from '@appname/service';
import {  DeletedScreenshotResponse, DeletedScreenshotRequest, ScreenshotApiResponse } from '../types/Activitytypes';

export const fetchScreenshots = (params: any): Promise<ScreenshotApiResponse> => {
  console.log({params});
  
  const startDate = params?.startDate ? `startDate=${params?.startDate}` : '';
  const endDate = params?.endDate ? `&endDate=${params?.endDate}` : '';
  const filterBy =params?.filterBy ? `&filterBy=${params?.filterBy}` :'';
  let filterValue = '';
  if (params?.filterValue) {
    filterValue = params.filterValue.map((value: any, index: any) => `&filterValue[${index}]=${value}`).join('');
  }
  const queryParams = `${startDate}${endDate}${filterBy}${filterValue}`;
  return get<ScreenshotApiResponse>(ENDPOINTS.getAllScreenshot + '?' + queryParams);
};

export const deleteScreenshot = (id: string | undefined): Promise<DeletedScreenshotResponse> => {
  return del<DeletedScreenshotResponse, DeletedScreenshotRequest>(ENDPOINTS.deleteScreenshot(id as string));
};


type GetAllParams = {
  searchBy?: string;
  sortBy?: string | undefined;
  sortOrder?: 'ASC' | 'DESC' | undefined | string;
  pageNumber?: number;
  pageSize?: number;
  filterBy?:string;
  filterValue?:string
};

export const getAllPeople = (
  params: GetAllParams
): Promise<any> => {
  const queryParams = new URLSearchParams();

  if (params.searchBy) queryParams.append('searchBy', params.searchBy);
  if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
  if (params.sortBy)
    queryParams.append('sortByColumn', params.sortBy);
  if (params.pageNumber !== undefined)
    queryParams.append('pageNumber', params.pageNumber.toString());
  if (params.pageSize !== undefined)
    queryParams.append('pageSize', params.pageSize.toString());
    if (params.filterBy !== undefined)
    queryParams.append('filterBy', params.filterBy.toString());
    if (params.filterValue !== undefined)
    queryParams.append('filterValue', params.filterValue.toString());

  return get<any>(`${ENDPOINTS.getAllUsers}?${queryParams.toString()}`);
};

export const getAllProject = (
  params: GetAllParams
): Promise<any> => {
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


export const onDeptAllUsers = (
  params:GetAllParams
):Promise<any> => {
  const queryParams = new URLSearchParams();

  if (params.searchBy) queryParams.append('searchBy', params.searchBy);
  if (params.sortOrder !== undefined) queryParams.append('sortOrder', params.sortOrder.toString());
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.pageSize !== undefined) queryParams.append('pageSize', params.pageSize.toString());
  if (params.pageNumber !== undefined) queryParams.append('pageNumber', params.pageNumber.toString());

  return get<any>(`${ENDPOINTS.getAlldepartments}?${queryParams.toString()}`);
};

type UseClientsParams = {
  pageSize?: number;
  pageNumber?: number;
  searchBy?: string;
  filterBy?: string;
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
  if (params.filterBy) queryParams.append('filterBY', params.filterBy);
  if (params.isArchive !== undefined)
    queryParams.append('isArchive', params.isArchive.toString());

  return get<any>(
    `${ENDPOINTS.getAllClients}?${queryParams.toString()}`
  );
};





type GetAllProjectsParams = {
  search?: string;
  sortByColumn?: 'ASC' | 'DESC' | undefined | string;
  sort?: string | undefined ;
  page?: number;
  limit?: number;
};

export const AllProject =(params:GetAllProjectsParams):Promise<ScreenshotProjectIdResponse>=>{
  const queryParams = new URLSearchParams();
  return get<ScreenshotProjectIdResponse>(`${ENDPOINTS.getAllProjects}?${queryParams.toString()}`)
}


type GetAllUserParams = {
  pageSize?: number;
  pageNumber?: number;
  searchBy?: string;
  filterBy?: string;
  sortBy?: string | undefined;
  sortOrder?: 'ASC' | 'DESC' | undefined | string;
  isArchive?: boolean;
  filterValue?: string;
};
export const AllPeople = (
  params: GetAllUserParams
): Promise<any> => {
  const queryParams = new URLSearchParams();
  return get<any>(
    `${ENDPOINTS.getAllUsers}?${queryParams.toString()}`
  );
};

