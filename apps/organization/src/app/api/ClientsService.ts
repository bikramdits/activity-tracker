import { get, ENDPOINTS, post, del, put } from '@appname/service';
import {
  CreatedClientsRequest,
  CreatedClientsResponse,
  GetAllClientsResponse,
  DeleteClientResponse,
  UpdateClientResponse,
  GetClientByIdResponse,
  FormValuesprops,
  GetAllParams
} from '../types/clientsTypes';

type UseClientsParams = {
  pageSize?: number;
  pageNumber?: number;
  searchBy?: string;
  filterBy?: string;
  sortBy?: string;
  sortOrder?: string;
  isArchive?: boolean;
  filterValue?:any;
  totalPages?: number;
};


// get All Clients
export const onGetAllClients = (params: Partial<UseClientsParams>) => {
  const queryParams = new URLSearchParams();
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
  if (params.searchBy) queryParams.append('searchBy', params.searchBy);
  if (params.pageSize !== undefined)
    queryParams.append('pageSize', params.pageSize.toString());
  if (params.pageNumber !== undefined)
    queryParams.append('pageNumber', params.pageNumber.toString());
  if (params.filterBy) queryParams.append('filterBy', params.filterBy);
  if(params.filterValue !== undefined){
    params.filterValue.forEach((value :string, index:number) => {
      queryParams.append(`filterValue[${index}]`, value.toString());
    });
  }
  if (params.isArchive !== undefined)
    queryParams.append('isArchive', params.isArchive.toString());

  return get<GetAllClientsResponse>(
    `${ENDPOINTS.getAllClients}?${queryParams.toString()}`
  );
};


// addclient //create client
export const createClient = (
  clientData: CreatedClientsRequest
): Promise<CreatedClientsResponse> => {
  return post<CreatedClientsResponse, CreatedClientsRequest>(
    ENDPOINTS.createClients,
    clientData
  );
};



// get client byid
export const GetClientByID =(Id: string | undefined) : Promise<GetClientByIdResponse> => {
   return get<GetClientByIdResponse>(`${ENDPOINTS.getClientbyId(Id as string)}`)
}



// delete client
export const deleteClient = (
  clientId: string | undefined
): Promise<DeleteClientResponse> => {
  return del<DeleteClientResponse, void>(
    `${ENDPOINTS.deleteClients(clientId as string)}`
  );
};


// edit or update
export const updateClient = (
  id :string | undefined ,
  formValues:  FormValuesprops
): Promise<UpdateClientResponse> => {
  const UpdateClientRequest: FormValuesprops = formValues;
  return put<UpdateClientResponse, FormValuesprops>(`${ENDPOINTS.updateClient(id as string)}`, UpdateClientRequest)
}





///for dropdowndata api
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

export interface formValuesProps{
  isArchive: boolean;
}

export const updateClientArchive=(
  id:string,
  formValues: formValuesProps
):Promise<UpdateClientResponse> =>{
  const requestupdateClientArchive : formValuesProps = formValues;
  return put<UpdateClientResponse,formValuesProps>(ENDPOINTS.updateClient(id),requestupdateClientArchive)
}