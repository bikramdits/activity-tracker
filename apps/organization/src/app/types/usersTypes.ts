export interface UserAllUsersRequest {
  pageSize: number;
  pageNumber: number;
  searchBy: string;
  filterBy: string;
  sortBy: string;
  sortOrder: string;
  isArchive: boolean;
}
interface UserRole {
  id: string;
  name: string;
}
interface Manager {
  id: string;
  firstName: string;
  lastName: string;
}
export type Users = {
  createdAt: number;
  updatedAt: number;
  id: string;
  createdBy: null | string;
  updatedBy: null | string;
  isArchive: boolean;
  isDeleted: boolean;
  deletedAt: null | string;
  deletedBy: null | string;
  isActive: boolean;
  firstName: string;
  lastName: string;
  memberId: string;
  dob: string;
  employeeId: string;
  companyEmail: string;
  workPhone: string;
  personalPhone: string;
  dateOfJoining: string;
  reportingManagerId: string;
  reportingManager: Manager;
  backupManagerId: string;
  locationId: null | string;
  shiftId: null | string;
  departmentId: string;
  contractType: string;
  workType: string;
  roles: UserRole;
  image: null | string;
  lastLogin: number;
  lastUpdated: number;
};
export interface UserAllUsersResponse {
  data: {
    users: Users[];
    pageNumber: number;
    totalCount: number;
    activeCount: number;
    archiveCount: number;
    itemsPerPage: number;
    totalPages: number;
    message: string;
  };
}
export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  memberId?: string;
  dob: number | string | null;
  employeeId?: string;
  companyEmail: string;
  workPhone?: string;
  personalPhone?: string;
  dateOfJoining?: number | string | null;
  reportingManagerId?: string;
  backupManagerId?: string;
  locationId?: string;
  shift?: string;
  departmentId: string[];
  contractType?: string;
  workType?: string;
  roleId?: string;
  image?: string | undefined | null;
  lastLogin?: number;
  lastUpdated?: number;
  password?: string;
}
export interface CreateUserResponse {
  statusCode: number;
  message: string;
  firstName: string;
  lastName: string;
  memberId: string;
  dob: number;
  employeeId: string;
  companyEmail: string;
  workPhone: string;
  personalPhone: string;
  dateOfJoining: number;
  reportingManagerId: string;
  backupManagerId: string;
  locationId: string;
  shift: string;
  departmentId: string;
  contractType: string;
  workType: string;
  roleId: string;
  image: string;
  lastLogin: number | null;
  lastUpdated: number | null;
  password: string;
}
export interface ErrorResponse {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
  statusCode: number;
}

// Delete users type
export interface DeleteUserResponse {
  statusCode: number;
  data: {
    deletedUser: {
      id: string;
      firstName: string;
      lastName: string;
      image: string | null;
      roleId: string;
      companyEmail: string;
      reportingManagerId: string;
      lastUpdated: number;
      lastLogin: number;
    };
  };
  message: string;
  errorRes: string;
}
// role types
export interface GetRoleType {
  data: {
    roles: RoleType[];
    currentPage: number;
    totalItems: number;
    totalPages: number;
    itemCount: number;
    activeCount: number;
    archiveCount: number;
    itemsPerPage: number;
  };
}

export type RoleType = {
  id: string;
  name: string;
  permission: RolePermissions;
  description: string;
  createdAt: number;
};
interface RolePermissions {
  taskManagement: Permission;
  userManagement: Permission;
  leaveManagement: Permission;
  shiftManagement: Permission;
  clientManagement: Permission;
  projectManagement: Permission;
  activityManagement: Permission;
  taskTemplateManagement: Permission;
}
interface Permission {
  read: boolean;
  write: boolean;
}
// **********************RolesByID*********************

export interface FindRoleType {
  statusCode: number;
  data: {
    role: getRoleTypeById;
  };
  message: string;
}

interface getRoleTypeById {
  id: string;
  name: string;
  description: string;
  permission: Permissions;
}

export interface Permissions {
  taskManagement: Permission;
  userManagement: Permission;
  leaveManagement: Permission;
  shiftManagement: Permission;
  clientManagement: Permission;
  projectManagement: Permission;
  activityManagement: Permission;
  taskTemplateManagement: Permission;
}
interface Permission {
  name: string;
  read: boolean;
  write: boolean;
}

// **********************UserByID**********************

export interface UserProfileRequest {
  id: string | undefined;
}
export interface UserRoleById {
  id: string;
  name: string;
}
export interface Departments {
  id: string;
  name: string;
}
export type UserResponseById = {
  id: string;
  firstName: string;
  lastName: string;
  companyEmail: string;
  workPhone: string;
  personalPhone: string;
  workType: string | null;
  contractType: string | null;
  lastLogin: number | null;
  lastUpdated: number | null;
  memberId: string;
  dob: number;
  employeeId: string;
  dateOfJoining: number | string | null;
  reportingManagerId: string | null;
  backupManagerId: string | null;
  locationId: string | null;
  roleId: string;
  image: string | null;
  isActive: boolean;
  createdAt: number;
  shiftId: string | null;
  roles: UserRoleById;
  departments: Departments[] | string;
};

export interface UserProfileResponse {
  data: {
    foundUser: UserResponseById;
  };
  message: string;
  statusCode: number;
}
// //******* updateuser*********/
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  image: string | null;
  roleId: string;
  companyEmail: string;
  reportingManagerId: string | null;
  lastUpdated: number | null;
  lastLogin: number | null;
  createdAt: number;
  isArchive: boolean;
  isActive: boolean;
}

export interface UpdateUserResponse {
  statusCode: number;
  data: {
    savedUser: User;
  };
  message: string;
}

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
