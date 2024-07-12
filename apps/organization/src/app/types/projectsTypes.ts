/***********************filter types***********************/

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

export interface GetAllClientsResponse {
  statusCode: number;
  data: {
    clients: Client[];
    totalCount: number;
    activeClient: number;
    archiveUser: number;
    totalPages: number;
    message: string;
    pageNumber: number;
    sortBy: string;
    sortOrder: string;
  };
}

/***********************project api's***********************/

export interface AllProjectRequest {
  PageNumber: number;
  pageSize: number;
  searchBy: string;
  sortOrder: string;
  sortByColumn: string;
  name: string;
  isArchive: boolean;
  createdAt: boolean;
}

export interface Client {
  id: string;
  organizationName: string;
  clientCode: string | null;
  image: string | null;
}

export interface Department {
  id: string;
  name: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  code: number;
  departments: string[];
  clientId: string;
  createdAt: number;
  startDate: number;
  client: Client;
  department: Department;
  isArchive: boolean;
  isActive: boolean;
}

export interface AllProjectResponse {
  statusCode: number;
  data: {
    projects: Project[];
    pageNumber: number;
    totalCount: number;
    itemCount: number;
    activeCount: number;
    archiveCount: number;
    itemsPerPage: number;
    totalPages: number;
    isArchive: boolean;
  };

  message: string;
}
export interface ErrorResponse {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
  statusCode: number;
}
export interface FormValuesRequest {
  name: string | undefined;
  code: string | number | undefined;
  departments: string | any[] | undefined;
  clientId: string | undefined;
  startDate: number | string | undefined;
  endDate: number | string | undefined;
  description: string | undefined;
  budgetedHours: number | undefined;
}
export interface AddProjectsResponse {
  data: {
    name: string;
    code: string;
    departments: string[];
    clientId: string;
    startDate: string | null;
    endDate: string | null;
    description: string;
    budgetedHours: number;
  };
  message: string;
  errorRes: string;
  statusCode: number;
}

export type FindProjectType = {
  data: {
    createdAt: string;
    updatedAt: string;
    id: string;
    createdBy: string;
    updatedBy: string;
    isArchive: boolean;
    isDeleted: boolean;
    deletedAt: number;
    deletedBy: string;
    isActive: boolean;
    name: string;
    code: number | string;
    departments: string | any[] | undefined;
    clientId: string;
    client: Client;
    startDate: string;
    endDate: string;
    description: string;
    budgetedHours: number;
  };
  message: string;
};
export interface UpdateProjectResponse {
  data: {
    updatedProject: {
      name: string;
      code: string;
      departments: string;
      clientId: string;

      startDate: string | null;
      endDate: string | null;
      description: string;
      budgetedHours: number;
    };
  };
  statusCode: number;
  message: string;
  errorRes: string;
}
export interface DeleteProjectResponse {
  data: {
    deleteProject: any;
  };
  message: string;
  statusCode: number;
  errorRes: string;
}
