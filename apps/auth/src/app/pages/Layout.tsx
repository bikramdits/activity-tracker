import SideNavBar from '../components/sidenavbar/SideNavbar';
// import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const Layout = ({ children }: any) => {
  return (
    <Box sx={{ display: 'flex' }} className="relative h-screen overflow-auto">
      <SideNavBar />
      <Box component={'main'} sx={{ flexGrow: 1 }}>
        {children}
        {/* <Outlet /> */}
      </Box>
    </Box>
  );
};
export default Layout;
