export interface FindRoleType{
    data:{
        role:getRoleTypeById | undefined;
        message:string;
    }
}

export type getRoleTypeById={
    
        description:string;
        id:string;
        isActive:boolean;
        isArchive:boolean;
        isDeleted:boolean;
        permission:any;
        name:string;
        slug:string;

}