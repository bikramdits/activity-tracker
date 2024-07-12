import {useMutation, UseQueryResult, useQuery} from "@tanstack/react-query";
import {CreatedClientsRequest, ErrorResponse, FormValuesprops, GetAllClientsResponse, GetAllParams, GetClientByIdResponse} from '../types/clientsTypes'
import { GetClientByID, createClient, deleteClient, formValuesProps, getAllProject, onDeptAllUsers, onGetAllClients, updateClient, updateClientArchive} from "../api/ClientsService";
import { toast } from 'react-toastify';
import { queryKeys } from "@appname/service";
import { showToast } from "@appname/ui";

type UseClientsParams = {
    pageSize?:number;
    pageNumber?: number;
    searchBy?: string;
    filterBy?:string;
    sortBy?:'ASC' |'DESC'| undefined | string;
    sortOrder?: string;
    isArchive?: boolean;
    totalPages?:number;
    filterValue?: any;
    
  };
export const useClients = (params: UseClientsParams): UseQueryResult<GetAllClientsResponse,Error> => {
    return useQuery<GetAllClientsResponse, Error>({
        queryKey:[queryKeys.allClients, params],
        queryFn:()=> onGetAllClients(params),   
    })
}
// add client (data) create (post api)
export const useCreateClient= ()=>{
    return useMutation({
        mutationKey:[queryKeys.newClient],
        mutationFn:(clientData:CreatedClientsRequest)=>{
            return createClient(clientData) 
        },
        onError: (error: { response: { data: ErrorResponse } }) => {
          const errorResponse : ErrorResponse = error.response.data;
          const errorMessages = errorResponse.errors.map(error => error.message).join(', ');
          showToast(errorMessages,'error')
        }
    })
}
// Client delete
export const useDeleteClient =()=>{
    return useMutation({
        mutationKey:[queryKeys.deleteClient],
        mutationFn:(clientId: string | undefined) => deleteClient(clientId)
    })
}

export const useClientById = (
    id: string | undefined
  ): UseQueryResult<GetClientByIdResponse, Error> => {
    return useQuery<GetClientByIdResponse, Error>({
      queryKey: [queryKeys.clientbyId, id],
      queryFn: () => GetClientByID(id)
  ,
    });
  };

  export const useUpdateClient = () => {
    return useMutation({
      mutationKey: [queryKeys.updateClient],
      mutationFn: ({
        id,
        formValues,
      }: {
        id: string | undefined;
        formValues: FormValuesprops;
      }) => updateClient(id, formValues),
      onError: (error) => {
        console.error('Error updating client:', error);
      },
      onSuccess: (data) => {
        console.log('Client updated successfully:', data);
      },
    });
  }
  //dropdata
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

  export const useClientArchive = ()=>{
    return useMutation({
      mutationKey:[queryKeys.updateClient],
      mutationFn:({
        id,
        formValues,
      }: {
        id: string;
        formValues: formValuesProps;
      }) =>updateClientArchive(id,formValues),
      onError:(error)=>{
        showToast(error.message,'error')
      },
      })
  }