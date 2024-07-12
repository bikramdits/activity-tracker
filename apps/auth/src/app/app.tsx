import * as React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Reset from './components/Reset';
import Forgotpassword from './components/ForgotPassword';
import Login from './components';
import EmailVerification from './components/EmailVerification';
import ChangePassword from './components/ChangePassword';
import Dashboard from './pages/dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyProfile from './components/MyProfile';
import PrivateRoutes from './components/PrivateRoutes';

const Organization = React.lazy(() => import('organization/Module'));
const Activity = React.lazy(() => import('activity/Module'));
const Settings = React.lazy(() => import('settings/Module'));
const Timesheet = React.lazy(() => import('timesheet/Module'));
const Approval = React.lazy(() => import('approval/Module'));
const Policies = React.lazy(() => import('policies/Module'));
const Reports = React.lazy(() => import('reports/Module'));

export function App() {
  const resEmail = localStorage.getItem('email') ?? ' ';
  return (
    <>
      <ToastContainer />
      <React.Suspense fallback={null}>
        <Router>
          <Routes>
            <Route path="/*" element={<PrivateRoutes />}>
              <Route path="dashboard/*" element={<Dashboard />} />
              <Route path="organization/*" element={<Organization />} />
              <Route path="activity/*" element={<Activity />} />
              <Route path="settings/*" element={<Settings />} />
              <Route path="timesheet/*" element={<Timesheet />} />
              <Route path="approval/*" element={<Approval />} />
              <Route path="policies/*" element={<Policies />} />
              <Route path="reports/*" element={<Reports />} />
              <Route path="myProfile/*" element={<MyProfile />} />

              <Route path="changePassword/*" element={<ChangePassword />} />
            </Route>
            <Route path="/" element={<Login />} />
            <Route path="/forgot" element={<Forgotpassword />} />
            <Route
              path="/emailVerify"
              element={<EmailVerification email={resEmail} />}
            />
            <Route path="/reset" element={<Reset email={resEmail} />} />
          </Routes>
        </Router>
      </React.Suspense>
    </>
  );
}

export default App;
