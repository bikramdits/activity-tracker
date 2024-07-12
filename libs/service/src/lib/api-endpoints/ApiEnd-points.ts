export const ENDPOINTS = {
  login: '/auth/login',
  logout: '/auth/logout',
  forgotPassword: '/auth/forgetPassword',
  verify: '/auth/verifyEmail',
  reset: '/auth/resetPassword',
  changePassword: '/auth/changePassword',

  //people api endpoints
  getAllUsers: 'users/all',
  createuser: 'users',
  getUserbyId: (id: string) => `/users/${id}`,
  deleteUser: (id: string) => `users/${id}`,
  updateUser: (id: string | undefined) => `users/${id}`,

  // client api endpoints
  getAllClients: 'clients/all',
  createClients: 'clients',
  getClientbyId: (id: string) => `clients/${id}`,
  updateClient: (id: string) => `clients/${id}`,
  deleteClients: (id: string) => `clients/${id}`,

  //department api endpoits
  getAlldepartments: 'departments/all',
  createDepartment: 'departments',
  getDepartmentbyId: (id: string) => `departments/${id}`,
  updateDepartmentbyId: (id: string) => `departments/${id}`,
  deleteDepartmentbyId: (id: string) => `departments/${id}`,

  //projects api endpoints
  getAllProjects: 'projects/all',
  createProjects: 'projects',
  getProjectsbyId: (id: string) => `/projects/${id}`,
  updateProjects: (id: string) => `/projects/${id}`,
  deleteProjects: (id: string) => `projects/${id}`,

  //roles api endpoints
  getAllRoles: '/roles/all',
  createRole: '/roles',
  getRolebyId: (id: string | undefined) => `/roles/${id}`,
  updateRole: (id: string | undefined) => `roles/${id}`,
  deleteRole: (id: string | undefined) => `roles/${id}`,

  //activity api endpoint
  getAllScreenshot: 'screenshot/all',
  createScreenshot: 'screenshot',
  getScrrenshotbyID: (id: string) => `scrrenshot${id}`,
  deleteScreenshot: (id: string) => `screenshot/${id}`,

//forms api endoints
  getClientForm:'/base/forms/b50db959-807f-43c2-a091-e47b32822338',
  getDepartmentForm:'/base/forms/71dc4704-a845-4d6b-893e-f67b710a56c2',
  getUserForm:'/base/forms/856211c6-23a9-422a-a9fe-0f0170a2e22a',
  getProjectForm:'/base/forms/a6bc1b72-6f51-4579-8ccd-18388580cea5',

  //listing lable api endpoints
  getUserList:'base/listings/72018599-34fc-4863-9871-55a95dc753bf',
  getClientList:'base/listings/16e1f269-77e9-418e-b6d8-45d809be5602',
  getDepartmentList:'base/listings/f1f862e1-0eea-4ae4-adfc-bffada962a21',
  getProjectList:'base/listings/96282b3a-83ff-469a-b57d-c4d248673142',

};

export const queryKeys = {
  login: 'login',
  logout: 'logout',
  forgotPassword: 'forgotPassword',
  verify: 'verify',
  reset: 'reset',
  changePassword: 'changePassword',
  myProfile: 'myProfile',

  //users
  allUsers: 'allUsers',
  newUser: 'newUser',
  userbyId: 'userbyId',
  updateUser: 'updateUser',
  deleteUser: 'deleteUser',

  //client
  allClients: 'allClients',
  newClient: 'newClient',
  clientbyId: 'clientbyId',
  updateClient: 'updateClient',
  deleteClient: 'deleteClient',

  //department
  allDepartment: 'allDepartment',
  newDepartment: 'newDepartment',
  departmentbyId: 'departmentbyId',
  updateDepartment: 'updateDepartment',
  deleteDepartment: 'deleteDepartment',

  //project
  allProject: 'allProject',
  newProject: 'newProject',
  projectbyId: 'projectbyId',
  updateProject: 'updateProject',
  deleteProject: 'deleteProject',

  //roles
  allRoles: 'allRoles',
  newRole: 'newRole',
  rolebyId: 'rolebyId',
  updateRole: 'updateRole',
  deleteRole: 'deleteRole',

  //activity
  allScreenshot: 'allScrrenshot',
  newScreenshot: 'newScreenshot',
  screenshotbyId: 'screenshotbyId',
  delteScreenshot: 'delteScreenshot',

  //forms
  getUserForm:'getUserForm',
  getClientForm:'getClinetForm',
  getDepartmentForm :'getDepartmentForm',
  getProjectForm :'getProjectForm',

  //list 
  getUserList:'getUserList',
  getClientList:'getClientList',
  getDepartmentList:'getDepartmentList',
  getProjectList:'getProjectList'
};

export const isArchive = 'isArchive';
export const pageNumber = 'pageNumber';
export const sortOrder = 'sortOrder';
export const searchBy = 'searchBy';
export const filterBy = 'filterBy';
export const pageSize = 'pageSize';
