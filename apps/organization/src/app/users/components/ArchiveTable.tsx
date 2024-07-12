import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  Paper,
} from '@mui/material';
import {
  ArrowDropUp as ArrowDropUpIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from '@mui/icons-material';
import { deleteImg, user } from '@appname/assets';
import { UserAllUsersResponse, Users } from '../../types/usersTypes';
import { ActionButtons } from '@appname/components';

import { useDeleteUser, useUpdateArchive } from '../../hooks/useUsers';

import { useNavigate } from 'react-router-dom';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { showSuccessToast } from '../../projects/components/services/ToastServices';
import DeleteModal from '../../projects/components/modal/DeleteConfirmation';
import { DeleteConfirmModal, Loader, showToast } from '@appname/ui';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import React from 'react';
import { Tablehead, message } from '../enums/PeopleEnums';
type SortConfig = {
  key: keyof Users;
  direction: string;
};
type Props = {
  sortConfig: SortConfig;
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>;
  archiveData: Users[];
  isLoader: boolean;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<UserAllUsersResponse, Error>>;
};

const ArchiceTable = ({
  archiveData,
  refetch,
  sortConfig,
  setSortConfig,
  isLoader,
}: Props) => {
  const navigate = useNavigate();

  const { mutateAsync: mutateAsyncdelete } = useDeleteUser();

  const [deleteUserId, setDeleteUserId] = React.useState<string | undefined>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const deleteByUser = async () => {
    try {
      if (deleteUserId) {
        setIsModalOpen(false);
        const response = await mutateAsyncdelete(deleteUserId);
        if (response.statusCode === 201) {
          showToast(`${response.message}`, 'success');
        } else {
          showToast(response.errorRes, 'error');
        }
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [unArchiveModalOpen, setUnArchiveModalOpen] = useState<boolean>(false);
  const [updateUserId, setUpdateUserId] = useState<string>('');
  const { mutateAsync } = useUpdateArchive();

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
  const handleCellClick = (id: string) => {
    navigate(`user-Profile/${id}`);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setUnArchiveModalOpen(false);
  };
  const handleUnArchive = (id: string) => {
    setUnArchiveModalOpen(true);
    setUpdateUserId(id);
  };
  const updateByUser = async () => {
    setUnArchiveModalOpen(true);
    const updatedValue = {
      isArchive: false,
    };
    try {
      const response = await mutateAsync({
        id: updateUserId,
        formValues: updatedValue,
      });
      if (response.statusCode === 201) {
        showSuccessToast('User unarchive successfully.');
      }
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  const handelDeleteUser = (id: string) => {
    setDeleteUserId(id);
    setIsModalOpen(true);
  };
  const handleSort = (key: keyof Users) => {
    setSortConfig((prevSortConfig) => {
      let direction = 'ASC';
      if (
        prevSortConfig &&
        prevSortConfig.key === key &&
        prevSortConfig.direction === 'ASC'
      ) {
        direction = 'DESC';
      }
      return { key, direction };
    });
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: '630px', overflowY: 'auto' }}
      >
        <Table className="w-full text-left bg-white">
          <TableHead className="bg-gray-50 border-y-slate-300 sticky z-10 top-0">
            <TableRow className="w-full">
              <TableCell className="relative !text-sm !font-semibold !">
                {Tablehead.NAME}
                {sortConfig?.direction === 'ASC' &&
                sortConfig?.key === 'firstName' ? (
                  <ArrowDropUpIcon
                    className="top-[14px] absolute cursor-pointer"
                    onClick={() => handleSort('firstName')}
                  />
                ) : sortConfig?.direction === 'DESC' &&
                  sortConfig?.key === 'firstName' ? (
                  <ArrowDropDownIcon
                    className="absolute top-[20px] cursor-pointer"
                    onClick={() => handleSort('firstName')}
                  />
                ) : (
                  <>
                    <ArrowDropUpIcon
                      className="top-[14px] absolute cursor-pointer"
                      onClick={() => handleSort('firstName')}
                    />
                    <ArrowDropDownIcon
                      className="absolute top-[20px] cursor-pointer"
                      onClick={() => handleSort('firstName')}
                    />
                  </>
                )}
              </TableCell>
              <TableCell className="relative !text-sm !font-semibold !">
                {Tablehead.EMAIL}
              </TableCell>
              <TableCell className="relative !text-sm !font-semibold !">
                {Tablehead.JOBE_ROLE}
              </TableCell>
              <TableCell className="relative !text-sm !font-semibold !">
                {Tablehead.REPORTING_MANGER}
              </TableCell>
              <TableCell className="relative !text-sm !font-semibold !">
                {Tablehead.LAST_LOGIN}
              </TableCell>
              <TableCell className="relative !text-sm !font-semibold !">
                {Tablehead.LAST_UPDATE}
              </TableCell>
              <TableCell className="!text-sm !font-semibold">
                {Tablehead.ACTIONS}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoader ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  sx={{
                    textAlign: 'center',
                    fontSize: '22px',
                    fontWeight: '700',
                  }}
                >
                  <div className="flex justify-center items-center">
                    <Loader />
                  </div>
                </TableCell>
              </TableRow>
            ) : !archiveData.length ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-black !w-full"
                  sx={{
                    textAlign: 'center',
                    fontSize: '22px',
                    fontWeight: '700',
                  }}
                >
                  {Tablehead.NODATA}
                </TableCell>
              </TableRow>
            ) : (
              archiveData?.map((item, id) => (
                <TableRow key={id} className="overflow-hidden">
                  <TableCell
                    sx={{ border: 'none', display: 'flex', gap: '10px' }}
                    onClick={() => handleCellClick(item.id)}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt="user"
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <img
                        src={user}
                        alt="user"
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <span className="mt-3 cursor-pointer text-[#3c59d4]">
                      {item.firstName} {item.lastName}
                    </span>
                  </TableCell>
                  <TableCell sx={{ border: 'none' }}>
                    {item.companyEmail}
                  </TableCell>
                  <TableCell sx={{ border: 'none' }}>
                    {item.roles?.name}
                  </TableCell>
                  <TableCell
                    className="overflow-ellipsis p-1 overflow-hidden max-w-11"
                    sx={{ border: 'none' }}
                  >
                    {`${item.reportingManager?.firstName || ''} ${
                      item.reportingManager?.lastName || ''
                    }`}
                  </TableCell>
                  <TableCell sx={{ border: 'none' }}>
                    {formatDate(item.lastLogin)}
                  </TableCell>
                  <TableCell sx={{ border: 'none' }}>
                    {formatDate(item.lastUpdated)}
                  </TableCell>
                  <TableCell className="flex space-x-2" sx={{ border: 'none' }}>
                    <ActionButtons
                      itemId={item.id}
                      handleUnArchive={handleUnArchive}
                      handleDeleteClick={handelDeleteUser}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {isModalOpen && (
        <DeleteModal>
          <div
            className="text-right text-gray-500 pr-3 cursor-pointer mt-[10px]"
            onClick={closeModal}
          >
            <ClearIcon className="text-[30px]" />
          </div>
          <DeleteConfirmModal
            close={closeModal}
            onConfirm={deleteByUser}
            deleteIcon={deleteImg}
            message={message.DELETE}
            deleteButtonText="Delete"
          />
        </DeleteModal>
      )}
      {unArchiveModalOpen && (
        <DeleteModal>
          <div
            className="text-right text-gray-500 pr-3 cursor-pointer mt-[10px]"
            onClick={closeModal}
          >
            <ClearIcon className="text-[30px]" />
          </div>
          <DeleteConfirmModal
            close={closeModal}
            onConfirm={updateByUser}
            deleteIcon={deleteImg}
            message={message.UNARCHIVE}
            deleteButtonText="Unarchive"
          />
        </DeleteModal>
      )}
    </>
  );
};

export default ArchiceTable;
