export interface UpdateRoleResponse{
    data:{
       
        updatedRole:{
            description:string;
            permissions:any;
            role:string;

        }
    }
    statusCode:number;
    message:string;
}