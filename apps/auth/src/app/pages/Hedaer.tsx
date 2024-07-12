import React, { useContext, useState } from 'react';
import { Avatar, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import {
  LockOpenIcon,
  LogoutIcon,
  NotificationsIcon,
} from '../../assets/icons';
import { AccountCircleOutlined } from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';
import { useLogout, useMyProfile } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { showToast } from '@appname/ui';

interface Option {
  value: string;
  label: string;
  icon: JSX.Element;
  onClick?: () => void;
}

const HeaderAuth: React.FC = () => {
  const { logout, id } = useContext(AuthContext);
  const { mutateAsync } = useLogout();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValues] = useState<string>('');

  const { data } = useMyProfile(id);

  const handleLogoutClick = async () => {
    try {
      await mutateAsync();
      logout();
      showToast('User Logout Successfully', 'success');
      navigate('/');
    } catch (error) {
      showToast('Logout failed:', 'error');
    }
  };
  const options: Option[] = [
    {
      value: 'myProfile',
      label: 'My Profile',
      icon: <AccountCircleOutlined />,
      onClick: () => {
        navigate('/myProfile');
      },
    },
    {
      value: 'changePassword',
      label: 'Change Password',
      icon: <LockOpenIcon />,
      onClick: () => {
        navigate('/changePassword');
      },
    },
    {
      value: 'logout',
      label: 'Logout',
      icon: <LogoutIcon />,
      onClick: handleLogoutClick,
    },
  ];

  return (
    <div className="rounded shadow -[0 0 5px rgba(0, 0, 0, 0.1)] bg-white">
      <div className="flex items-center justify-items-center">
        <div className="absolute right-60 ">
          <NotificationsIcon style={{ color: 'blue' }} />
        </div>
        <div className="absolute right-0 ml-0">
          <div className="border-l border-gray-300 px-4 ">
            <div className="flex items-center justify-items-center">
              <Avatar
                sx={{ width: '30px', height: '30px', backgroundColor: 'blue' }}
                src={data?.data?.foundUser.image}
                alt={data?.data?.foundUser.firstName}
              />
              <div className="px-2 flex flex-col gap-0">
                <span
                  className="font-bold text-base capitalize overflow-hidden whitespace-nowrap text-ellipsis"
                  style={{ maxWidth: '120px' }}
                >
                  {' '}
                  {`${data?.data?.foundUser?.firstName} ${data?.data?.foundUser?.lastName}`}
                </span>
                <span className="text-sm capitalize">
                  {data?.data.foundUser.role}
                </span>
              </div>
              <Select
                className="navbar-dropdown"
                sx={{ '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectedValue}
              >
                {options.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    onClick={option.onClick}
                  >
                    <span className="mr-2">{option.icon}</span>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAuth;
