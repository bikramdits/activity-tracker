export interface DeptAllUsersRequest {
  pageSize: number;
  pageNumber: number;
  searchBy: string;
  filterBy: string;
  sortBy: string;
  isArchieve: boolean | false | true;
  filterValue: string | string[] | undefined;
  sortOrder: 'ASC' | 'DESC' | string | null;
}

export interface DeptAllUsersResponse {
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

export interface Department {
  id: string;
  name: string;
  description: string;
  clientId: string | null;
  usersId: string[] | null;
  createdAt: number;
  isArchive: boolean;
  client: Client | null;
  projectDepartment: ProjectDepartment[];
  users: User[];
  
}
interface ProjectDepartment {
  projectId: string;
  projects: Project;
}

export interface Project {
  id: string;
  name: string;
  code: number;
  description: string;
  budgetedHours: number;
}
export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  companyEmail?: string;
  image?: string | null;
}

export interface Client {
  id: string;
  organizationName: string;
  clientCode: string;
  image: string | null;
  createdAt: number;
}

export interface DeptCreateResponse {
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
  // errors: Error[];
}

export type DepartmentData = {
  id: string;
  name: string;
  description: string;
  clientId: string;
  usersId?: number;
  createdAt: number;
  updatedAt: number;
  clients?: {
    id: string;
    organizationName: string;
    clientCode?: number;
    image?: string;
    createdAt: number;
  };
};

export interface DeptAllUsers {
  statusCode: number;
  message: string;
  data: {
    departments: DepartmentData[];
  };
  totalCount: number;
  itemCount: number;
  pageNumber: number;
  activeCount: number;
  archiveCount: number;
  itemsPerPage: number;
  totalPages: number;
}

export type UseDepartmentParams = {
  pageSize: number;
  pageNumber: number;
  sortOrder: string;
  searchBy: string;
  filterBy: string;
  sortBy: string;
  isArchive: boolean;
  filterValue:any;
};

export interface DeletedDepartmentResponse {
  statusCode: number;
  data: {
    deletedDepartment: {
      createdAt: number;
      updatedAt: number;
      id: string;
      createdBy: string | null;
      updatedBy: string | null;
      isArchive: boolean;
      isDeleted: boolean;
      deletedAt: number;
      deletedBy: string | null;
      isActive: boolean;
      name: string;
      description: string;
      clientId: string;
      usersId: string;
      users: string | [];
    };
  };
  message: string;
}

export interface FormValuesprops {
  // id: string | null;
  name: string | null;
  description: string | undefined;
  isArchive: boolean;
  clientId: string | null;
  usersId?: string[] | null | string;
  client:Client | undefined;
}
export interface ErrorResponse {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
  statusCode: number;
}

export interface UpdateDepartmentRequest {
  id: string;
  name: string;
  description: string;
  clientId: string;
  isArchive: boolean;
  usersId: boolean;
  client:Client[] | undefined;
  
}


export interface GetDepartmentResponseById {
  statusCode: number;
  data: {
    department: department | undefined;
  };
  message: string;
}
export type department = {
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
  name: string;
  description: string;
  clientId: string | null;
  usersId: string[] | null | string;
  users: User[] | null;
  client: Client| undefined;
};



export interface UpdateDepartmentResponse {
  statusCode: number;
  data: {
    department: {
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
      name: string;
      description: string;
      clientId: string | null;
      usersId: string | null;
      users: string | [];
    };
  };
  message: string;
}

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
