import { ENDPOINTS, del, get, patch, post} from '@appname/service';
import { DeletedDepartmentResponse, DeptAllUsersResponse, DeptCreateResponse, FormValuesprops, GetDepartmentResponseById, UpdateDepartmentResponse, UseDepartmentParams } from '../types/departmentTypes'

type GetAllParams = {
  searchBy?: string;
  sortBy?: string | undefined;
  sortOrder?: 'ASC' | 'DESC' | undefined | string;
  pageNumber?: number;
  pageSize?: number;
  filterBy?:string;
  filterValue?:any
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
  filterValue?:any;
};

// will also come endpoints here
export const onDeptAllUsers = (params: Partial<UseDepartmentParams>) => {
  const queryParams = new URLSearchParams();

  if (params.searchBy) queryParams.append('searchBy', params.searchBy);
  if (params.sortOrder !== undefined) queryParams.append('sortOrder', params.sortOrder.toString());
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.pageSize !== undefined) queryParams.append('pageSize', params.pageSize.toString());
  if (params.pageNumber !== undefined) queryParams.append('pageNumber', params.pageNumber.toString());
  if (params.filterBy !== undefined)queryParams.append('filterBy', params.filterBy.toString());
  // if (params.filterValue !== undefined)queryParams.append('filterValue', params.filterValue.toString());
if(params.filterValue !== undefined){
  params.filterValue.forEach((value :string, index:number) => {
    queryParams.append(`filterValue[${index}]`, value.toString());
  });
}

  if (params.isArchive !== undefined && params.isArchive !== null)
    queryParams.append('isArchive', params.isArchive.toString());
  
  // const searchBy = params?.searchBy ? `searchBy=${params?.searchBy}`: '';
  // const sortOrder = params?.sortOrder ? `sortOrder=${params?.sortOrder}`: '';
  // const sortBy = params?.sortBy ? `sortBy=${params?.sortBy}`: '';
  // const pageSize = params?.pageSize ? `pageSize=${params?.pageSize}`: '';
  // const pageNumber = params?.pageNumber ? `pageNumber=${params?.pageNumber}`: '';
  // const isArchive = params?.isArchive ? `isArchive=${params?.isArchive}`: '';
  // const filterBy =params?.filterBy ? `&filterBy=${params?.filterBy}` :'';
  // let filterValue = '';
  // if (params?.filterValue) {
  //   filterValue = params.filterValue.map((value: any, index: any) => `&filterValue[${index}]=${value}`).join('');
  // }
  // const queryParams = `${searchBy}${sortOrder}${sortBy}${pageSize}${pageNumber}${isArchive} ${filterBy}`

  // return get<DeptAllUsersResponse>(`${ENDPOINTS.getAlldepartments}?${queryParams.toString()}`);
  return get<DeptAllUsersResponse>(ENDPOINTS.getAlldepartments +'?' + queryParams);
};

export const onCreateDepartment = (createDepartment: FormValuesprops): Promise<DeptCreateResponse> => {

  return post<DeptCreateResponse, FormValuesprops>(ENDPOINTS.createDepartment, createDepartment)
}

export const deleteDepartment = (userId: string | undefined): Promise<DeletedDepartmentResponse> => {
  
  return del<DeletedDepartmentResponse, void>(`${ENDPOINTS.deleteDepartmentbyId(userId as string)}`);
};

// Get Department By ID ==>
export const getDepartment = (id: string | undefined): Promise<GetDepartmentResponseById>=>{
  return get<GetDepartmentResponseById>(`${ENDPOINTS.getDepartmentbyId(id as string)}`);
};


// Upadte Department ===>
export const updateDepartment =(
  id:string | undefined,
  formValues : FormValuesprops
) : Promise <UpdateDepartmentResponse>=>{
  const requestUpdateDepartment : FormValuesprops = formValues;
  return patch<UpdateDepartmentResponse,FormValuesprops>(
   `${ENDPOINTS.updateDepartmentbyId(id as string)}`,
    requestUpdateDepartment
  )
}

export const getAllProject = (
  params: GetAllParams
): Promise<any> => {
  const queryParams = new URLSearchParams();
  return get<any>(`${ENDPOINTS.getAllProjects}?${queryParams.toString()}`);
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
  if (params.filterBy !== undefined)queryParams.append('filterBy', params.filterBy.toString());
  if (params.filterValue !== undefined)queryParams.append('filterValue', params.filterValue.toString());
 
  if (params.isArchive !== undefined)
    queryParams.append('isArchive', params.isArchive.toString());

  return get<any>(
    `${ENDPOINTS.getAllClients}?${queryParams.toString()}`
  );
};
export interface formValuesProps{
  isArchive: boolean;
}

export const updateDeptArchive=(
    id:string,
    formValues: formValuesProps
):Promise<UpdateDepartmentResponse> =>{
    const requestupdateDeptArchive : formValuesProps = formValues;
    return patch<UpdateDepartmentResponse,formValuesProps>(ENDPOINTS.updateDepartmentbyId(id),requestupdateDeptArchive)
  }

