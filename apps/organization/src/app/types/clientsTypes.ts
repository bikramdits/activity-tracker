export interface Client {
    createdAt: number;
    updatedAt: number;
    id: string;
    createdBy: string | null;
    updatedBy: string | null;
    isArchive: boolean;
    isDeleted: boolean;
    deletedAt: number | null;
    deletedBy: string | null;
    isActive: boolean;
    organizationName: string;
    clientCode: string;
    image: string | null;
    departments: Department[];
    
  }
 export interface Department {
    id: string;
    name: string;
    description: string;
}
export  interface  GetAllClientsRequest{
    pageSize?: number
    pageNumber?: number
    searchBy: string
    filterBy:string
    sortBy: string
    sortOrder:string
    isArchive?:boolean
 } 
 export  interface GetAllClientsResponse{
    statusCode: number;
    data: {
      clients: Client[];
      totalCount: number;
      totalPages:number;
      message: string;
      pageNumber:number;
      sortBy: string;
      sortOrder:string;
      itemCount: number;
      activeCount: number;
      archiveCount: number;
    };
      }
    

//2.Client(POST) Created 
export interface CreatedClientsRequest{
    organizationName:string|undefined;
    clientCode:string|undefined;
    // image: string
}
export interface ErrorResponse {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
  statusCode: number;
}
 
export interface CreatedClientsResponse{
  createdAt: number;
  updatedAt: number;
  id: string;
  createdBy: string | null;
  updatedBy: string | null;
  isArchive: boolean;
  isDeleted: boolean;
  deletedAt: number | null;
  isActive: boolean;
  organizationName: string;
  clientCode: string;
  image: string | null;
  message: string;
  statusCode: number;
  errorRes:string
}
export  type  allClientsData={
  pageSize?: number;
  pageNumber?: number;
  searchBy: string;
  filterBy:string;
  sortBy: string;
  createdAt: number;
  sortOrder:string |'ASC' | 'DESC' | undefined;
  isArchive?:boolean;
  organizationName: string;
  message:string;
  clientCode:string;
  
}
///for delete Api
 export interface DeleteClientResponse {
  statusCode: number;
  data: {
    deletedClientss: {
      id: string;
      organizationName: string;
      clientCode: string;
      image: null | string;
      isDeleted: boolean;
      deletedAt: number;
      updatedAt: number;
    };
  };
  message: string;
}

// update
export interface  UpdateClientRequest{
  id:string
}



// Get Client by id
export interface GetClientByIdRequest{
  id:string
}

export interface GetClientByIdResponse{
  statusCode: number;
  data: {
    clients: {
      id: string;
      organizationName: string;
      clientCode: string;
      image: string | null;
      createdAt: number;
      isActive: boolean;
      isArchive: boolean;
    };
  };
  message: string;
}

 export interface  UpdateClientResponse{
   statusCode:number
   data:{
    updatedClient:{
      id: string
      organizationName:string
      clientCode:number
      image:string
      isActive: boolean
      isArchive:boolean
      updatedAt:number
    }
   }
   message:string
 }


 export interface FormValuesprops{
  organizationName:string | undefined;
  clientCode: string | undefined;
  // image:string;
  // isActive: boolean;
  // isArchive:boolean;
 }


 //////
 export type GetAllParams = {
  searchBy?: string;
  sortBy?: string | undefined;
  sortOrder?: 'ASC' | 'DESC' | undefined | string;
  pageNumber?: number;
  pageSize?: number;
  filterBy?: string;
  filterValue?: string;
};
export interface Department {
  id: string;
  name: string;
}

export interface DepartmentsIdResponse {
  statusCode: number;
  data: {
    departments: Department[];
    totalCount: number;
    totalPages: number;
    itemCount: number;
    pageNumber: number;
    activeCount: number;
    archiveCount: number;
    itemsPerPage: number;
  };
  message: string;
}