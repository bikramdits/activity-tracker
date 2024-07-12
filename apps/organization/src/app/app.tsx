import People, { PeopleLayout } from './users/components/People';
import Department, { DeptLayout } from './departments/components/Department';
import Layout from './Layout';
import AddUser from './users/components/AddUser';
import UserProfile from './users/components/UserProfile';
import ArchivePage from './client/components/ArchivePage';
import { Routes, Route } from 'react-router-dom';
import Clients, { ClientLayout } from './client/components/Clients';
import Projects, { ProjectLayout } from './projects/components/Projects';
import AddNewProjects from './projects/components/pages/AddProject';
import AddDepartment from './departments/components/Pages/AddDepartment';
import Archieve from './departments/components/Pages/Archieve';
import AddClient from './client/components/AddClient';

export function App({ isLocal }: { isLocal?: boolean }) {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="people" element={<PeopleLayout />}>
          <Route path="" element={<People />} />
          <Route path="add-User" element={<AddUser />} />
          <Route path="edit-User/:id" element={<AddUser />} />

          <Route path="user-Profile/:id" element={<UserProfile />} />
        </Route>

        <Route path="departments" element={<DeptLayout />}>
          <Route path="" element={<Department />} />
          <Route path="edit-department/:id" element={<AddDepartment />} />
          <Route path="addDepartment" element={<AddDepartment />} />
          <Route path="archieve" element={<Archieve />} />
        </Route>

        <Route path="client" element={<ClientLayout />}>
          <Route path="" element={<Clients />} />
          <Route path="edit-client/:id" element={<AddClient />} />
          <Route path="add-client" element={<AddClient />} />
          <Route path="archive-page" element={<ArchivePage />} />
        </Route>

        <Route path="projects" element={<ProjectLayout />}>
          <Route path="" element={<Projects />} />
          <Route path="addProject" element={<AddNewProjects />} />
          <Route path="edit-project/:id" element={<AddNewProjects />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
