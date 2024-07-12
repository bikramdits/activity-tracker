import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  ButtonWithIcon,
  SearchField,
  MultipleSelect,
  ToggleButton,
  DeleteConfirmModal,
  DeleteModal,
  showToast,
} from '@appname/ui';
import {
  ArrowDropDownIcon,
  ArrowDropUpIcon,
  deleteImg,
  user,
} from '@appname/assets';
import { ArchiveIcon, DeleteIcon, EditIcon, AddIcon } from '@appname/assets';
import {
  useDeleteDepartment,
  useDepartment,
  useDepartmentArchive,
  useGetAllClients,
  useGetAllProject,
} from '../../hooks/useDepartment';
import { DepartmentData } from '../../types/departmentTypes';
import ClearIcon from '@mui/icons-material/Clear';
import { departmentEnum } from '../enums/DepartmentEnums';
import {
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import {ActionButtons, PageSizeSelect,Pagination} from '@appname/components'
const tableHead = [
  { title: 'Department' },
  { title: 'Owner' },
  { title: 'People' },
  { title: 'Action' },
];
interface OptionsData {
  value: string;
  label: string;
}

const Department = () => {
  const [selectProject, setSelectProject] = useState<string[]>([]);
  const [selectedClient, setSelectedClient] = useState<string[]>([]);
  const [type, setType] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState('Active');
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [deleteRoleId, setDeleteRoleId] = React.useState<string | undefined>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [updateUserId, setUpdateUserId] = useState<string>('');
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState<boolean>(false);
  const [isArchive, setIsArchive] = useState(false);

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    setItemsPerPage(event.target.value as number);
    setCurrentPage(1);
  };

  const [sortConfig, setSortConfig] = useState<{
    key: keyof DepartmentData;
    direction: departmentEnum.ASC | departmentEnum.DESC;
  }>({ key: departmentEnum.CREATED_AT, direction: departmentEnum.DESC });

  const navigate = useNavigate();

  const { mutateAsync: mutateAsyncOne } = useDepartmentArchive();
  const { mutateAsync } = useDeleteDepartment();

  const deleteByDepartment = async () => {
      if (deleteRoleId) {
        setModalOpen(false);
        const response = await mutateAsync(deleteRoleId);
        showToast(`${response.message}`, 'success');
        refetch();
      }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteRoleId(id);
    setModalOpen(true);
  };

  const handleEditClick = (id: string) => {
    navigate(`/organization/departments/edit-department/${id}`);
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsArchiveModalOpen(false);
  };

  const { data: departments, refetch } = useDepartment({
    pageNumber: !isArchive ? currentPage : currentPage,
    pageSize: !isArchive ? itemsPerPage : itemsPerPage,
    searchBy: searchValue,
    sortBy: sortConfig.key,
    sortOrder: sortConfig.direction,
    filterBy: selectProject?.length || selectedClient?.length ? id : '',
    filterValue: type === 'project' ? selectProject : selectedClient,
    isArchive: isArchive,
  });
  
  useEffect(() => {
    refetch();
  }, [currentPage, searchValue]);

  const { data: projectData } = useGetAllProject({});
  const projectOptions = projectData?.data?.projects?.map((ele: any) => ({
    label: ele.name,
    value: ele.id,
  }));
  const pageSizeOptions= [
    { label: '5', value: '5' },
    { label: '10', value: '10' },
    { label: '15', value: '15' },
    { label: '20', value: '20' },
  ];

  const { data: ClientData } = useGetAllClients({});
  const ClientOptions = ClientData?.data?.clients?.map((ele: any) => ({
    label: ele.organizationName,
    value: ele.id,
  }));

  const handleArchive = (id: string) => {
    setIsArchiveModalOpen(true);
    setUpdateUserId(id);
  };

  const options: OptionsData[] = [
    { value: 'Active',   label:
      departments?.data?.activeCount != null
        ? `Active(${departments?.data.activeCount})`
        : 'Active',},
    { value: 'Archive',  label:
      departments?.data?.archiveCount != null
        ? `Archive(${departments?.data.archiveCount})`
        : 'Archive'},
  ];

  const handleOptionChange = (newOption: string) => {
    setIsArchive(true);
    if (newOption === 'Archive') {
      setIsArchive(true);
      navigate('archieve');
    }
    if (newOption === 'Active') {
      setIsArchive(false);
    }
    setSelectedOption(newOption);
    setIsArchive(newOption === 'Archive');
  };

  const changeOptions = (type: 'project' | 'Clients', value: string[]) => {
    setType(type);
    if (type === 'project') {
      setSelectProject(value);
      setId('projects');
    } else if (type === 'Clients') {
      setSelectedClient(value);
      setId('client');
    }
  };

  useEffect(() => {
    if (selectProject.length) {
      refetch();
    }
    if (selectedClient.length) {
      refetch();
    }
  }, [id, selectProject, selectedClient]);
 

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSort = (key: keyof DepartmentData) => {
    setSortConfig((prevSortConfig) => {
      let direction: departmentEnum.ASC | departmentEnum.DESC =
        departmentEnum.ASC;
      if (
        prevSortConfig.key === key &&
        prevSortConfig.direction === departmentEnum.ASC
      ) {
        direction = departmentEnum.DESC;
      }
      return { key, direction };
    });
  };

  type ButtonStyleProps = React.CSSProperties & {
    '&:hover'?: React.CSSProperties;
  };

  const total = departments?.data?.totalCount || 0;
  const perPage = departments?.data?.itemsPerPage || 1;
  const totalPages = Math.ceil(total / perPage);

  const updateByDeptArchive = async () => {
    const updatedValue = {
      isArchive: true,
    };

      const response = await mutateAsyncOne({
        id: updateUserId,
        formValues: updatedValue,
      });
      if (response) {
        showToast('Department archived successfully.', 'success');
      }
      refetch();
  };
const handleImageClick =(id: any)=>{
  navigate(`../people/user-Profile/${id}`);
}
  // const userData = departments?.data?.departments;
  // const usersArrays = userData?.map((item) => item.users);

  return (
    <div className="maindiv bg-gray-50  w-full pb-2">
      <div className="flex justify-between p-3 mt-2 -mb-2">
        <Typography
          variant="h5"
          component="h5"
          className="text-[26px] md:font-bold"
        >
          <h2 className="mt-2 text-2xl/[26px] font-semibold">
            {departmentEnum.DEPARTMENTS}
          </h2>
        </Typography>
        <div className="flex gap-4">
          <ButtonWithIcon
            icon={
              <AddIcon
                sx={{
                  fontSize: 20,
                  stroke: '#3c59d4',
                  strokeWidth: 1.5,
                }}
              />
            }
            onClick={() => navigate('addDepartment')}
            sx={
              {
                color: '#3c59d4',
                border: '1px solid #0070fa',
                fontWeight: '550',
                textTransform: 'none',
                fontSize: '17px',
                padding: '6px 12px',
                height: '44px',
                '&:hover': {
                  backgroundColor: '#cae2ff',
                  borderColor: '#3c59d4',
                },
              } as ButtonStyleProps
            }
          >
            {departmentEnum.NEW_DEPARTMENT}
          </ButtonWithIcon>
          <ToggleButton
            options={options}
            value={selectedOption}
            onChange={handleOptionChange}
            buttonStyles={{
              height: '44px',
              width: '130px',
              fontSize: '16px',
              fontWeight: 'normal',
              borderRadius: '0px',
              backgroundColor: '#e5e7eb',
            }}
          />
        </div>
      </div>
      <div className="m-3 border border-slate-300  rounded-lg">
        <div className="flex flex-1  justify-between bg-white rounded-tl-xl rounded-tr-xl ">
          <div className="flex gap-5 snap-x py-4 pt-sm-0 px-3">
            <div className="selectDropdown">
              <MultipleSelect
                options={ClientOptions}
                label={departmentEnum.LABEL_CLIENT}
                placeholder={departmentEnum.PLACE_HOLDER_CLIENT}
                className="pl-3"
                isMultiple
                value={selectedClient}
                onChange={(value) => changeOptions('Clients', value)}
              />
            </div>
            <div className="selectDropdown">
              <MultipleSelect
                options={projectOptions}
                label={departmentEnum.LABEL_PROJECT}
                placeholder={departmentEnum.PLACE_HOLDER_PROJECT}
                isMultiple
                value={selectProject}
                onChange={(value) => changeOptions('project', value)}
              />
            </div>
          </div>
          <SearchField
            value={searchValue}
            placeholder={departmentEnum.PLACE_HOLDER_SEARCH}
            onChange={search}
            tailwindClasses="w-[200px] !px-3 !pt-4"
            sx={{
              borderRadius: '8px',
              '.MuiOutlinedInput-root': {
                paddingRight: '0',
                height: '44px',
              },
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: '#ced4da',
              },
              '.MuiSvgIcon-root': {
                color: '#6c757d',
              },
            }}
          />
        </div>

        <div style={{ overflow: 'auto', maxHeight: '640px', height: '100%' }}>
          <Table className="min-w-full divide-y divide-gray-200 border">
            <TableHead className="sticky border top-[-1px] z-10 border-l-0 border-r-0">
              <TableRow className="bg-gray-50 h-12 mt-1 text-black-500 font-medium">
                {tableHead.map((item, index) => (
                  <TableCell
                    key={index}
                    className="px-6 py-3 text-black-500 !font-semibold !text-md relative w-1/4"
                  >
                    {item.title ? item.title : ''}
                    {item.title !== 'Action' && (
                      <div className="flex">
                        {item.title !== 'Owner' && item.title !== 'People' && (
                          <div className="flex">
                            <ArrowDropUpIcon
                              className={`mt-[-24px] ml-[80px] absolute cursor-pointer ${
                                sortConfig.key === item.title.toLowerCase() &&
                                sortConfig.direction === departmentEnum.ASC
                                  ? 'text-[#3c59d4]'
                                  : ''
                              }`}
                              onClick={() => handleSort(departmentEnum.Name)}
                            />
                            <ArrowDropDownIcon
                              className={`absolute mt-[-18px] !ml-[80px] cursor-pointer ${
                                sortConfig.key === item.title.toLowerCase() &&
                                sortConfig.direction === departmentEnum.DESC
                                  ? 'text-[#3c59d4]'
                                  : ''
                              }`}
                              onClick={() => handleSort(departmentEnum.Name)}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody className="overflow-y-auto border-b-0 ">
              {total === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={tableHead.length}
                    className=" text-black !w-full"
                    sx={{
                      textAlign: 'center',
                      fontSize: '22px',
                      fontWeight: '700',
                    }}
                  >
                    {departmentEnum.NO_RECORDS}
                  </TableCell>
                </TableRow>
              ) : (
                departments?.data?.departments.map((item) => (
                  <TableRow
                    key={item.id}
                    className="bg-white group"
                    sx={{ border: 'none' }}
                  >
                    <TableCell
                      className="px-6 py-4 text-sm font-semibold"
                      sx={{ border: 'none' }}
                    >
                      {item.name}
                    </TableCell>
                    <TableCell
                      className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800 text-start border-none"
                      sx={{ border: 'none' }}
                    >
                      {item?.client ? (
                        item.client.image ? (
                          <img
                            src={item.client.image}
                            className="h-10 w-10"
                            alt="icon"
                          />
                        ) : (
                          <img src={user} className="h-10 w-10" alt="Avatar" />
                        )
                      ) : null}
                    </TableCell>
                    <TableCell
                      className="px-6 py-4 w-40 flex h-10 mt-4 group-hover:scale-x-110 transition ease duration-150 cursor-pointer"
                      sx={{ border: 'none' }}
                    >
                      <div className="flex justify-start">
                        {item?.users?.map((data, index) => (
                          <div key={index} className="flex items-center">
                            {item?.users ? (
                              data?.image ? (
                                <div  onClick={()=>handleImageClick(data?.id)} className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                                  <img
                                    src={data?.image}
                                    className="h-10 w-10 rounded-full"
                                    alt={`Avatar of ${data?.firstName}`}
                                   
                                  />  
                                </div>
                              ) : (
                                <div  onClick={()=>handleImageClick(data?.id)} className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <img
                                  src={user}
                                  className="h-10 w-10"
                                  alt={departmentEnum.AVATAR}
                                />
                                </div>
                              )
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-start"
                      sx={{ border: 'none' }}
                    >
                     <ActionButtons
                        itemId={item.id}
                        handleEditClick={handleEditClick}
                        handleArchive={handleArchive}
                        handleDeleteClick={handleDeleteClick}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {modalOpen && (
          <DeleteModal>
            <div
              className="text-right text-gray-500 pr-3 cursor-pointer mt-[10px]"
              onClick={closeModal}
            >
              <ClearIcon className="text-[30px]" />
            </div>
            <DeleteConfirmModal
              close={closeModal}
              onConfirm={deleteByDepartment}
              deleteIcon={deleteImg}
              message={departmentEnum.DELETE_MESSAGE}
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
              onConfirm={updateByDeptArchive}
              deleteIcon={deleteImg}
              message={departmentEnum.ARCHIVE_MESSAGE}
              deleteButtonText="Archive"
            />
          </DeleteModal>
        )}
      </div>

      <div className="flex w-full mt-2">
        <div className="w-1/2 justify-center">
          {totalPages > 0 && (
            <div className="w-full text-slate-400 pl-3 mt-2">
              {departments?.data?.totalCount === totalPages
                ? `Showing ${departments.data.itemCount} of ${departments.data.totalCount} entries`
                : `Showing ${
                    (currentPage - 1) * itemsPerPage + 1
                  } to  ${Math.min(
                    currentPage * itemsPerPage,
                    total
                  )} of ${total} entries`}
            </div>
          )}
        </div>
        
        {total === 0 ? null : (
          <>
            <div className="w-1/2 ">
              <div className="flex mt-2 justify-end">
                <div className="pageSize pb-2">
                  <PageSizeSelect
                    options={pageSizeOptions}
                    defaultValue={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                  />
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePreviousPage={handlePreviousPage}
                  handleNextPage={handleNextPage}
                  changePage={handleChangePage}
                  rolesLength={totalPages}
                  buttonTitles={{PREVIOUS: departmentEnum.PREVIOUS, NEXT:departmentEnum.NEXT}} 
                  >
                </Pagination>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Department;

export function DeptLayout() {
  return (
    <div className="w-full mt-16">
      <Outlet />
    </div>
  );
}
