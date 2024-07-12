import { PermissionProps } from "../pages/RoleForm";
export interface FormValuesProps{
    name: string | undefined;
    description: string | undefined;
    // slug: string | undefined;
    isActive: boolean;
    permission:PermissionProps[];
    
  }