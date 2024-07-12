import { useContext, useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Layout from '../pages/Layout';

const PrivateRoutes: React.FC = () => {
  const { logout, token } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      logout();
      navigate('/');
    }
  }, [token, logout]);

  return token ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoutes;
