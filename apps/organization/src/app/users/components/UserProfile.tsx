import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonWithIcon } from '@appname/ui';
import { BackIcon } from '@appname/assets';
import UserProfileTable from './UserProfileTable';
import { person1, person2 } from '@appname/assets';
import { PeopleDetails } from '../enums/PeopleEnums';
import { useMyProfile } from '../../hooks/useUsers';
import { Avatar } from '@mui/material';
interface UserData {
  Playbook_Name: {
    name: string;
    Image: string;
  };
  Department: string;
  Client: string;
  Primary_Assignee: string;
  Secondary_Assignee: string;
}
type ButtonStyleProps = React.CSSProperties & {
  '&:hover'?: React.CSSProperties;
};
const UserProfile = () => {
  const navigate = useNavigate();

  const params = useParams();
  const { id } = params;
  const { data: userProfileData, isLoading, error } = useMyProfile(id);
  if (isLoading) {
    return <div>{PeopleDetails.LOADING}</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">
        {PeopleDetails.ERROR_MSG} {error.message}
      </div>
    );
  }

  const data: UserData[] = [
    {
      Playbook_Name: { name: ' Supply Chain Audit Group', Image: person1 },
      Department: 'Medical Billing',
      Client: 'APPNAME',
      Primary_Assignee: '4',
      Secondary_Assignee: '2',
    },
    {
      Playbook_Name: { name: ' Supply Chain Audit Group', Image: person2 },
      Department: 'Medical Billing',
      Client: 'APPNAME',
      Primary_Assignee: '4',
      Secondary_Assignee: '2',
    },
  ];
  const UserDetails = () => {
    navigate('../');
  };
  // const convertToDate = (unixTimestamp: number) => {
  //   const date = new Date(unixTimestamp * 1000);
  //   return date.toLocaleDateString(); // or use toLocaleString() for date and time
  // };
  // const convertToDate = (unixTimestamp: number) => {
  //   // Ensure the timestamp is in milliseconds
  //   if (unixTimestamp < 1000000000000) {
  //     unixTimestamp *= 1000;
  //   }

  //   const date = new Date(unixTimestamp);
  //   return date.toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: '2-digit',
  //     day: '2-digit',
  //   });
  // };
  const convertToDate = (unixTimestamp: number) => {
    if (unixTimestamp < 1000000000000) {
      unixTimestamp *= 1000;
    }

    const date = new Date(unixTimestamp);
    const day = date.toLocaleDateString('en-US', { day: '2-digit' });
    const month = date.toLocaleDateString('en-US', { month: '2-digit' });
    const year = date.toLocaleDateString('en-US', { year: '2-digit' });
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const time = `${formattedHours}:${minutes
      .toString()
      .padStart(2, '0')} ${ampm}`;

    return `${month}/${day}/${year.slice(-2)} ${time}`;
  };

  const formatDate = (timestamp?: number | null) => {
    if (timestamp) {
      return convertToDate(timestamp);
    }
    return '';
  };
  const targetColumnIndex = 0;
  return (
    <div className="bg-gray-50  pt-4 w-full pr-4 pl-4 mt-16 ">
      <div className="flex pr-4 pl-4">
        <div className="text-start w-2/4">
          <h1 className="text-2xl w-96 font-extrabold">
            {`${userProfileData?.data?.foundUser?.firstName} ${userProfileData?.data?.foundUser?.lastName}`}
          </h1>
        </div>
        <div className="w-2/4 flex justify-end ">
          <ButtonWithIcon
            icon={
              <BackIcon
                sx={{
                  fontSize: 20,
                  stroke: '#3c59d4',
                  strokeWidth: 1.5,
                }}
              />
            }
            onClick={() => navigate('../')}
            sx={
              {
                color: '#3c59d4',
                backgroundColor: 'white',
                fontSize: '17px',
                border: '1px solid #0070fa',
                fontWeight: '550',
                padding: '6px 12px',
                textTransform: 'none',
                height: '44px',
                '&:hover': {
                  backgroundColor: '#cae2ff',
                  borderColor: '#3c59d4',
                },
              } as ButtonStyleProps
            }
          >
            {PeopleDetails.BACK}
          </ButtonWithIcon>
        </div>
      </div>
      <div className="m-3 border border-slate-300 rounded-lg">
        <div className="bg-white w-5/5 flex ">
          <div className="border p-4 bg-white shadow-sm flex flex-col sm:flex-row items-center w-full">
            <div className="flex-shrink-0 mr-0 sm:mr-4 mb-4 sm:mb-0">
              {userProfileData?.data?.foundUser?.image ? (
                <img
                  src={userProfileData?.data?.foundUser?.image}
                  alt={`${userProfileData?.data?.foundUser?.firstName} ${userProfileData?.data?.foundUser?.lastName}`}
                  className="w-20 h-20 rounded-lg"
                />
              ) : (
                <Avatar />
              )}
            </div>
            <div className="flex-col w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2 mb-2">
                <div>
                  <h3 className="text-gray-500 text-xs">
                    {PeopleDetails.FULL_NAME}
                  </h3>
                  <p className="font-medium text-md">
                    {`${userProfileData?.data?.foundUser?.firstName} ${userProfileData?.data?.foundUser?.lastName}`}
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-xs">
                    {PeopleDetails.EMAIL}
                  </h3>
                  <p className="font-medium text-md">
                    {userProfileData?.data?.foundUser?.companyEmail}
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-xs">
                    {PeopleDetails.CONTACT}
                  </h3>
                  <p className="font-medium text-md">
                    {userProfileData?.data?.foundUser?.workPhone}
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-xs">
                    {PeopleDetails.EMPLOYEE_TYPE}
                  </h3>
                  <p className="font-medium text-md">
                    {userProfileData?.data?.foundUser?.workType}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2">
                <div>
                  <h3 className="text-gray-500 text-xs">
                    {PeopleDetails.WORK_TYPE}
                  </h3>
                  <p className="font-medium text-md">
                    {userProfileData?.data?.foundUser?.workType}
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-xs">
                    {PeopleDetails.ROLE}
                  </h3>
                  <p className="font-medium text-md">
                    {userProfileData?.data?.foundUser?.roles?.name}
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-xs">
                    {PeopleDetails.LAST_LOGIN}
                  </h3>
                  <p className="font-medium text-md">
                    {formatDate(userProfileData?.data?.foundUser?.lastLogin)}
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-xs">
                    {PeopleDetails.LAST_UPDATED}
                  </h3>
                  <p className="font-medium text-md">
                    {formatDate(userProfileData?.data?.foundUser?.lastUpdated)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UserProfileTable
          data={data}
          targetColumnIndex={targetColumnIndex}
          onCellClick={UserDetails}
        />
      </div>
    </div>
  );
};

export default UserProfile;
