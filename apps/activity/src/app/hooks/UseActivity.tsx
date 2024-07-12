import { UseQueryResult, useMutation , useQuery, useQueryClient } from '@tanstack/react-query';
import {  ScreenshotApiResponse } from '../types/Activitytypes';
import { deleteScreenshot, fetchScreenshots, getAllPeople, getAllProject, onAllClients, onDeptAllUsers,  } from '../api/ActivityService';
import { queryKeys } from '@appname/service';



  export const useScreenshots =(params:any): UseQueryResult<ScreenshotApiResponse,Error> =>{
    
    return useQuery<ScreenshotApiResponse,Error> ({
      queryKey:[params],
      queryFn:() => fetchScreenshots(params),
      refetchOnWindowFocus:false,
      enabled:(!!params?.startDate&&!!params?.endDate)
    })
    
  }
  export const DeleteScreenshots = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: [queryKeys.delteScreenshot],
      mutationFn: (id: string | undefined) => deleteScreenshot(id),
      onSuccess: () => {
        console.log('Screenshot deleted successfully');
        queryClient.invalidateQueries();
      },
      onError:(error)=>{
        console.error('Error deleting screenshot', error);
      }
    });
  };
  type GetAllParams = {
    searchBy?: string;
    sortBy?: string | undefined;
    sortOrder?: 'ASC' | 'DESC' | undefined | string;
    pageNumber?: number;
    pageSize?: number;
    filterBy?:string;
    filterValue?:any
  };
  // Get all roles
  export const useGetAllPeople = (params: GetAllParams): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
      queryKey: [queryKeys.allUsers, params],
      queryFn: () => getAllPeople(params),
    });
  };
 
  export const useGetAllProject= (params: GetAllParams): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
      queryKey: [queryKeys.allProject, params],
      queryFn: () => getAllProject(params),
    });
  };

  export const useGetAllDepartments =(params:GetAllParams):UseQueryResult<any,Error>=>{
    return useQuery<any,Error>({
      queryKey:[queryKeys.allDepartment],
      queryFn:()=>onDeptAllUsers(params)
    })
  }

  export const useGetAllClients=(params:GetAllParams):UseQueryResult<any,Error>=>{
   return useQuery<any,Error>({
      queryKey:[queryKeys.allClients],
      queryFn:()=>onAllClients(params)
   })
  }
 
  // export const AddScreenshot = (): UseMutationResult<ScreenshotApiResponse, Error, ScreenshotRequest> => {
  //   const queryClient = useQueryClient();
  //   return useMutation({
  //     mutationKey: [queryKeys.newScreenshot],
  //     mutationFn: (screenshotData) => addScreenshot(screenshotData),

  //     onSuccess: () => {
  //       console.log('Screenshot added successfully');
  //       queryClient.invalidateQueries();
  //     },
  //     onError: (error) => {
  //       console.error('Error adding screenshot', error);
  //     },
  //   });
  // }

type UseGetAllUsersParams = {
  pageSize?: number;
  pageNumber?: number;
  searchBy?: string;
  filterBy?: string;
  sortBy?: string | undefined;
  sortOrder?: 'ASC' | 'DESC' | undefined | string;
  isArchive?: boolean;
  filterValue?: string;
};

export const useAllPeople = (
  params: UseGetAllUsersParams
): UseQueryResult<any, Error> => {
  return useQuery<any, Error>({
    queryKey: [queryKeys.allUsers, params],
    queryFn: () => getAllPeople(params),
  });
};



