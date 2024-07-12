// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Roles from './roles/components/pages/Role';
import { AddRole } from './roles/components/pages/RoleForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="roles" element={<Roles />} />
        <Route path="add-role" element={<AddRole />} />
        <Route path="edit-role/:id" element={<AddRole />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
