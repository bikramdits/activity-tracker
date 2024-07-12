import { Outlet } from "react-router-dom";

const Layout=()=>{
    
    return(
        <div className="h-screen flex">
            <Outlet />
        </div>
    )
}
export default Layout;