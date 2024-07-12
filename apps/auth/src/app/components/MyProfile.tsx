import React, { useContext } from 'react';
import { Avatar, IconButton, Typography } from '@mui/material';
import { EditIcon } from '@appname/assets';
import { useMyProfile } from '../hooks/useAuth';
import { AuthContext } from '../context/AuthContext';

const MyProfile: React.FC = () => {
  const { id } = useContext(AuthContext);

  const { data } = useMyProfile(id);

  return (
    <>
      <div className="w-full h-72 bg-gradient-to-r from-orange-100 via-orange-100 to-sky-400"></div>
      <div className=" mx-auto  p-10 bg-white rounded-lg shadow ">
        <div className="relative flex justify-between mb-8 ">
          <div className="-mt-24">
            <Avatar
              src={data?.data.foundUser.image}
              alt={data?.data.foundUser.firstName}
              sx={{ width: '132px', height: '132px' }}
              className="border-2 border-white shadow-md bg-white"
            />
            <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize">
              {' '}
              {`${data?.data.foundUser.firstName} ${data?.data.foundUser.lastName}`}
            </h2>
          </div>
          <div>
            <IconButton
              className="absolute bottom-0 right-0 bg-white p-1 shadow-md"
              size="small"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
              Email address
            </Typography>
            <Typography variant="body2">
              {data?.data.foundUser.companyEmail}
            </Typography>
          </div>

          <div>
            <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
              Contract Type
            </Typography>
            <Typography variant="body2">
              {data?.data.foundUser.contractType}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
              Personal Phone Number
            </Typography>
            <Typography variant="body2">
              {data?.data.foundUser.personalPhone}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
              Work Type
            </Typography>
            <Typography variant="body2">
              {data?.data.foundUser.workType}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
              Work Phone
            </Typography>
            <Typography variant="body2">
              {data?.data.foundUser.workPhone}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
              Employee ID
            </Typography>
            <Typography variant="body2">
              {data?.data.foundUser.employeeId}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
              Department
            </Typography>
            {data?.data.foundUser.departments.map((dep) => (
              <Typography variant="body2">{dep.name}</Typography>
            ))}
          </div>
          <div>
            <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
              Member ID
            </Typography>
            <Typography variant="body2">
              {data?.data.foundUser.memberId}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
