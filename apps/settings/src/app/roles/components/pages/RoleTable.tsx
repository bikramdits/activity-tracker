import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from '@mui/material/Tooltip';
import { GetRoleType, RoleType } from '../types/GetRoleType';
import { useNavigate } from 'react-router-dom';
import { showToast } from '@appname/ui';
import {
  useDeleteRole,
  useUpdateRolesAndPermissions,
} from '../../../hooks/useRole';
import {
  AddRoleLabelEnum,
  AddRoleNameEnum,
  RolesEnum,
} from '../enum/RolesEnum';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { DeleteConfirmModal, DeleteModal } from '@appname/ui';
import { deleteImg } from '@appname/assets';
import { Switch } from '@mui/material';

type SortConfig = {
  key: keyof RoleType;
  direction: string;
};

type Props = {
  roles: RoleType[];
  sortConfig: SortConfig;
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<GetRoleType, Error>>;
  totalItems: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function RolesTable({
  roles,
  setSortConfig,
  sortConfig,
  totalItems,
  currentPage,
  setCurrentPage,
  refetch,
}: Props) {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [deleteRoleId, setDeleteRoleId] = React.useState<string | undefined>();
  const { mutateAsync } = useDeleteRole();
  const { mutateAsync: updateRoleMutation } = useUpdateRolesAndPermissions();
  const navigate = useNavigate();
  const deleteRole = (id: string) => {
    setDeleteRoleId(id);
    setModalOpen(true);
  };
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  /************************* Function to close the deletion confirmation modal **********************************/

  const closeModal = () => {
    setModalOpen(false);
  };

  /********************************** Function to handle sorting of roles **************************/

  const handleSort = (key: keyof RoleType) => {
    setSortConfig((prevSortConfig) => {
      let direction = RolesEnum.ASC;
      if (
        prevSortConfig &&
        prevSortConfig.key === key &&
        prevSortConfig.direction === RolesEnum.ASC
      ) {
        direction = RolesEnum.DESC;
      }
      return { key, direction };
    });
  };

  /************************************** Function to initiate role deletion process ******************************/

  const deleteRoleById = async (e: unknown) => {
    try {
      if (e) {
        const response = await mutateAsync(deleteRoleId);
        showToast(response?.message, 'success');
        if (roles.length === 1 && currentPage > 1) {
          setCurrentPage((prevPage) => prevPage - 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*************************************** Function to navigate to the edit role page ************************/

  const editRole = (id: string) => {
    navigate(`/settings/edit-role/${id}`);
  };

  const handleUpdateRolesAndPermissions = async (id: string, e: any) => {
    const updatedValues = {
      isActive: e,
    };
    try {
      const response = await updateRoleMutation({
        id: id,
        formValues: updatedValues,
      });
      if (response) {
        if (e === true) {
          showToast('Roles active successful.', 'success');
        }
        if (e === false) {
          showToast('Roles inactive successful.', 'success');
        }
      }
      refetch();
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const truncateDescription = (description: string) => {
    return description.length > 50
      ? `${description.substring(0, 50)}...`
      : description;
  };
  const capitalize = (text: string) => {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <>
      <TableContainer
        className="relative overflow-auto h-full max-h-[calc(100vh-290px)]"
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-[#f9f9fd] sticky top-0 z-20 overflow-auto">
            <TableRow>
              <TableCell
                className="relative !text-sm !font-semibold !w-[40%]"
                sx={{
                  position: 'sticky',
                  top: 0,
                  backgroundColor: '#f9f9fd',
                  zIndex: 1,
                }}
              >
                {RolesEnum.ROLE}
                {sortConfig?.direction === RolesEnum.ASC &&
                sortConfig?.key === AddRoleNameEnum.ROLE_NAME ? (
                  <ArrowDropUpIcon
                    className="top-[14px] absolute cursor-pointer"
                    onClick={() => handleSort(AddRoleNameEnum.ROLE_NAME)}
                  />
                ) : sortConfig?.direction === RolesEnum.DESC &&
                  sortConfig?.key === AddRoleNameEnum.ROLE_NAME ? (
                  <ArrowDropDownIcon
                    className="absolute top-[20px] cursor-pointer"
                    onClick={() => handleSort(AddRoleNameEnum.ROLE_NAME)}
                  />
                ) : (
                  <>
                    <ArrowDropUpIcon
                      className="top-[14px] absolute cursor-pointer"
                      onClick={() => handleSort(AddRoleNameEnum.ROLE_NAME)}
                    />
                    <ArrowDropDownIcon
                      className="absolute top-[20px] cursor-pointer"
                      onClick={() => handleSort(AddRoleNameEnum.ROLE_NAME)}
                    />
                  </>
                )}
              </TableCell>
              <TableCell className="relative !text-sm !font-semibold !w-[40%]">
                {AddRoleLabelEnum.DESCRIPTION}
              </TableCell>
              <TableCell className="!text-sm !font-semibold">
                {RolesEnum.ACTION}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {totalItems === 0 ? (
              <TableRow>
                <TableCell></TableCell>
                <TableCell>{RolesEnum.NO_RECORDS}</TableCell>
              </TableRow>
            ) : (
              roles?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row" sx={{ border: 'none' }}>
                    {capitalize(row.name)}
                  </TableCell>
                  <TableCell sx={{ border: 'none' }}>
                    {capitalize(truncateDescription(row.description))}
                  </TableCell>
                  <TableCell sx={{ border: 'none' }}>
                    <Tooltip title="Edit" arrow>
                      <EditIcon
                        className="text-[#3c59d4] !text-lg cursor-pointer"
                        onClick={() => editRole(row?.id)}
                      />
                    </Tooltip>
                    <Tooltip title="Active/Inactive" arrow>
                      <Switch
                        {...label}
                        checked={row?.isActive}
                        onChange={() =>
                          handleUpdateRolesAndPermissions(
                            row?.id,
                            !row?.isActive
                          )
                        }
                      />
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <DeleteOutlineIcon
                        className="text-[#3c59d4] !text-lg cursor-pointer ml-2"
                        onClick={() => deleteRole(row?.id)}
                      />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {modalOpen ? (
        <DeleteModal>
          <div
            className="text-right text-gray-500 pr-3 cursor-pointer mt-[10px]"
            onClick={closeModal}
          >
            <ClearIcon className="text-[30px]" />
          </div>
          <DeleteConfirmModal
            close={closeModal}
            onConfirm={deleteRoleById}
            deleteIcon={deleteImg}
            message={RolesEnum.MESSAGE}
            deleteButtonText="Delete"
          />
        </DeleteModal>
      ) : null}
    </>
  );
}
