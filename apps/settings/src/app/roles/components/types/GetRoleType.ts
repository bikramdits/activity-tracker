export interface GetRoleType {
  data:{
    activeCount:number;
    inactiveCount:number;
    currentPage:number;
    // itemCount:number;
    itemsPerPage:number;
    itemCount:number;
    totalPages:number;
    roles:RoleType[]
  }
}

export type RoleType = {
  id: string;
  name: string;
  description: string;
  createdAt:string;
  permission:string;
  activeCount:number;
  inactiveCount:number;
  isActive:boolean;
};
