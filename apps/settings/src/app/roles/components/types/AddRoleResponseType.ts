export interface AddRoleResponseType{
    data:{
        createRole:{
            createdAt:number;
            createdBy:null;
            deletedAt:null;
            description:string;
            id:string;
            isActive:boolean;
            isArchive:boolean;
            isDeleted:boolean;
            permission:any;
            roleName:string;
            slug:string;
            updatedAt:number;
            updatedBy:null;

        };
    }
    message:string;
    statusCode:number;
}