
import { Link, Outlet } from "react-router-dom";


// type Credentials = {
//     email: string;
//     password: string;
// };

// interface LoginResponse {
//     token: string;
//     user: {
//         id: string;
//         name: string;
//         email: string;
//     };
// }

const Layout = ({ isLocal }: { isLocal?: boolean }) => {
    // const loginApi = async ({ email, password }: Credentials): Promise<LoginResponse> => {
    //         const response = await post(ENDPOINTS.login, {
    //             email: email,
    //             password: password,
    //         });
    //         return response as LoginResponse
    // };

    // useEffect(() => {
    //     loginApi({ email: 'test12345@yopmail.com', password: 'Test@123' })
    // }, []);

    return (
        <div className="h-screen flex">
            {isLocal && (
                <nav>
                    <Link to={"/people"}>People</Link>
                </nav>
            )}
            <Outlet />
        </div>
    )
}
export default Layout;