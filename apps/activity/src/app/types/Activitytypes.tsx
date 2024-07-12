// All SCreenshot Request and Response
export interface ScreenshotAllRequest {
pageSize:number;
pageNumber:number;
startDate:number;
endDate:number
}

export interface Screenshot {

  url: string | undefined;
  date: string;
  createdAt: number;
  updatedAt: number;
  id: string;
  createdBy: null | string;
  updatedBy: null | string;
  isArchive: number;
  isDeleted: number;
  deletedAt: null | number;
  deletedBy: null | string;
  isActive: number;
  userId: string;
  projectId: string;
  image: null | string;
  keyboard: string;
  mouse: string;
}

export interface Screenshotdata {
  [timestamp: string]: {
      screenshots: Screenshot[];
      count: number;
  };
}






//Deleted Api Request & Response 
export interface DeletedScreenshotResponse {
  statusCode: number;
   id:string;
  message: string;
}

export interface DeletedScreenshotRequest {
  id: string;
}


  //Post Api Request and Response
  export interface ScreenshotRequest {
   
      userId: string;
      projectId: string;
      keyboard: number;
      image: string; 
      mouse:number;
  
  }
  export interface ScreenshotApiResponse {
    length: number;
    statusCode: number;
    data: {
        groupedData: Screenshotdata;
        totalCount: number;
        message: string;
    };
  }


//Get Id from User 

export type Users ={
  id: string;
  firstName: string;
  lastName: string;
}
export interface ScrrenshotUserIdResponse {
  data:{
    users:Users[];
  }
}


//Get Id from Project 
export interface Project {
  id: string;
  name: string;
}

export interface ScreenshotProjectIdResponse {
  statusCode: number;
  data: {
    project: Project[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemCount: number;
    activeCount: number;
    archiveCount: number;
    itemsPerPage: number;
  };
  message: string;
}


//get ID from Departments
export interface Department{
  id : string;
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


//get ID from Clients
export interface Client{
  id : string;
  name: string;
}

export  interface GetAllClientsResponse{
  statusCode: number;
  data: {
    clients: Client[];
    totalCount: number;
    activeClient: number;
    archiveUser: number;
    totalPages:number;
    message: string;
    pageNumber:number;
    sortBy: string;
    sortOrder:string;
  };
    }
