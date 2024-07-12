import { Outlet } from "react-router-dom";

const Layout=()=>{
    return(
        <div className="rolesWrapper"  style={{transition: '0.5s' , height: '100%'}}>
            <Outlet />
        </div>
    )
}
export default Layout;