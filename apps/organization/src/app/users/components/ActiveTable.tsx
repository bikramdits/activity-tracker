import React, { useState } from 'react';
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
import { useDeleteUser } from '../../hooks/useUsers';
import { useNavigate } from 'react-router-dom';
import { Users } from '../../types/usersTypes';
import {
  showToast,
  DeleteConfirmModal,
  DeleteModal,
  Loader,
} from '@appname/ui';
import ClearIcon from '@mui/icons-material/Clear';
import { useUpdateArchive } from '../../hooks/useUsers';
import { Tablehead, message } from '../enums/PeopleEnums';
import { ActionButtons } from '@appname/components';
import { showSuccessToast } from '../../projects/components/services/ToastServices';
type SortConfig = {
  key: keyof Users;
  direction: string;
};
type Props = {
  AllUsers: Users[];
  setUsersData: React.Dispatch<React.SetStateAction<Users[]>>;
  sortConfig: SortConfig;
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>;
  refetch: any;
  total: number;
  isLoader: boolean;
};

const ActiveTable = ({
  AllUsers,
  setUsersData,
  sortConfig,
  setSortConfig,
  refetch,
  total,
  isLoader,
}: Props) => {
  const navigate = useNavigate();

  const { mutateAsync: mutateAsync1 } = useUpdateArchive();

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
  const { mutateAsync } = useDeleteUser();
  const [deleteUserId, setDeleteUserId] = React.useState<string | undefined>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState<boolean>(false);
  const [updateUserId, setUpdateUserId] = useState<string>('');

  const deleteByUser = async () => {
    try {
      if (deleteUserId) {
        setIsModalOpen(false);
        const response = await mutateAsync(deleteUserId);
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

  const handelDeleteUser = (id: string) => {
    setDeleteUserId(id);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setIsArchiveModalOpen(false);
  };
  const editUser = (id: string) => {
    navigate(`edit-User/${id}`);
  };
  const handleArchive = (id: string) => {
    setIsArchiveModalOpen(true);
    setUpdateUserId(id);
  };
  const updateByUser = async () => {
    const updatedValue = {
      isArchive: true,
    };
    try {
      const response = await mutateAsync1({
        id: updateUserId,
        formValues: updatedValue,
      });
      if (response.statusCode == 201) {
        showSuccessToast('User archive successfully.');
      }
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const capitalizeName = (firstName: string, lastName: string) => {
    return `${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(
      lastName
    )}`;
  };
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: '630px', overflowY: 'auto' }}
      >
        <Table className="w-full text-left bg-white " aria-label="simple table">
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
            ) : !total ? (
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
              AllUsers?.map((item, id) => (
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
                      {capitalizeName(item.firstName, item.lastName)}
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
                    {/* <Tooltip title="Edit">
                      <EditIcon
                        // onClick={() => alert('Edit action')}
                        onClick={() => editUser(item?.id)}
                        className="cursor-pointer text-blue-600"
                        sx={{ fontSize: '18px' }}
                      />
                    </Tooltip>
                    <Tooltip title="Archive">
                      <ArchiveIcon
                        // onClick={() => alert('Archive action')}
                        onClick={() => handleArchive(item?.id)}
                        className="cursor-pointer text-blue-600"
                        sx={{ fontSize: '18px' }}
                      />
                    </Tooltip>
                    <Tooltip title="Delete">
                      <DeleteIcon
                        onClick={() => handelDeleteUser(item?.id)}
                        className="cursor-pointer text-blue-600"
                        sx={{ fontSize: '18px' }}
                      />
                    </Tooltip> */}
                    <ActionButtons
                      itemId={item.id}
                      handleEditClick={editUser}
                      handleArchive={handleArchive}
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
      {isArchiveModalOpen && (
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
            message={message.ARCHIVE}
            deleteButtonText="Archive"
          />
        </DeleteModal>
      )}
    </>
  );
};

export default ActiveTable;
