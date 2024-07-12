import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="h-screen flex w-screen">
      <Outlet />
    </div>
  );
};
export default Layout;
