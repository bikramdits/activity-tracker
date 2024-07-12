import React, { SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  AddIcon,
  ArrowDropDownIcon,
  ArrowDropUpIcon,
  DeleteIcon,
  deleteImg,
  UnArchiveIcon,
  user,
} from '@appname/assets';
import { archieveEnum, departmentEnum } from '../../enums/DepartmentEnums';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  useDeleteDepartment,
  useDepartment,
  useDepartmentArchive,
  useGetAllClients,
  useGetAllProject,
} from '../../../hooks/useDepartment';
import { DepartmentData } from '../../../types/departmentTypes';
import ClearIcon from '@mui/icons-material/Clear';
import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@mui/material';
import { ActionButtons } from '@appname/components';

const tableHead = [
  { title: 'Department' },
  { title: 'Owner' },
  { title: 'People' },
  { title: 'Action' },
];

const Archieve = () => {
  const [selectProject, setSelectProject] = useState<string[]>([]);
  const [selectedClient, setSelectedClient] = useState<string[]>([]);
  const [isArchive, setIsArchive] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [deleteRoleId, setDeleteRoleId] = React.useState<string | undefined>();

  const [selectedOption, setSelectedOption] = useState('Archive');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof DepartmentData;
    direction: departmentEnum.ASC | departmentEnum.DESC;
  }>({ key: departmentEnum.CREATED_AT, direction: departmentEnum.DESC });

  const [unArchiveModalOpen, setUnArchiveModalOpen] = useState<boolean>(false);
  const [updateUserId, setUpdateUserId] = useState<string>('');
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const { mutateAsync } = useDepartmentArchive();

  const navigate = useNavigate();
  interface optionsData {
    value: string;
    label: string;
  }
  const { data: ClientData } = useGetAllClients({});
  const ClientOptions = ClientData?.data?.clients?.map((ele: any) => ({
    label: ele.organizationName,
    value: ele.id,
  }));
  const { data: projectData } = useGetAllProject({});
  const projectOptions = projectData?.data?.projects?.map((ele: any) => ({
    label: ele.name,
    value: ele.id,
  }));

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

  const {
    data: departments,
    refetch,
  } = useDepartment({
    pageNumber: !isArchive ? currentPage : currentPage,
    pageSize: !isArchive ? itemsPerPage : itemsPerPage,
    searchBy: searchValue,
    sortBy: sortConfig.key,
    sortOrder: sortConfig.direction,
    filterBy: id,
    filterValue: type === 'project' ? selectProject : selectedClient,
    isArchive: true,
  });

  // useEffect(() => {
  //   refetch();
  // }, [searchValue, currentPage]);

  useEffect(() => {
    if (selectProject.length) {
      refetch();
    }
  }, [id, selectProject, searchValue,currentPage ]);

  const options: optionsData[] = [
    {
      value: 'Active', label:
        departments?.data?.activeCount != null
          ? `Active(${departments?.data.activeCount})`
          : 'Active',
    },
    {
      value: 'Archive', label:
        departments?.data?.archiveCount != null
          ? `Archive(${departments?.data.archiveCount})`
          : 'Archive'
    },
  ];

  const handleOptionChange = (newOption: SetStateAction<string>) => {
    setSelectedOption(newOption);
    if (newOption === 'Active') {
      navigate('../');
    } else if (newOption === 'Archive') {
      navigate('../');
    }
  };
  type ButtonStyleProps = React.CSSProperties & {
    '&:hover'?: React.CSSProperties;
  };

  const closeModal = () => {
    setUnArchiveModalOpen(false);
    setModalOpen(false);
  };
  
  const { mutateAsync: mutateAsyncArcDept } = useDeleteDepartment();

  const deleteByDepartment = async () => {
    if (deleteRoleId) {
      setModalOpen(false);
      const response = await mutateAsyncArcDept(deleteRoleId);
      showToast(`${response.message}`, 'success');
      refetch();
    }
  };

  const updateByUser = async () => {
    setUnArchiveModalOpen(true);
    const updatedValue = {
      isArchive: false,
    };
    const response = await mutateAsync({
      id: updateUserId,
      formValues: updatedValue,
    });
    if (response) {
      showToast('Department un-archived successfully.', 'success');
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

  const handleUnArchive = (id: string) => {
    setUnArchiveModalOpen(true);
    setUpdateUserId(id);
  };
  const handleDeleteClick = (id: string) => {
    setDeleteRoleId(id);
    setModalOpen(true);
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    setItemsPerPage(event.target.value as number);
    setCurrentPage(1);
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
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    setCurrentPage(pageNumber);
  };

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const total = departments?.data?.totalCount || 0;
  const perPage = departments?.data?.itemsPerPage || 1;
  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="maindiv bg-gray-50  w-full pb-2">
      <div className="flex justify-between p-3 mt-2 -mb-2 bg-red">
        <div className="w-1/2">
          <Typography
            variant="h5"
            component="h5"
            className="text-[26px] md:font-bold"
          >
            <h2 className="mt-2 text-2xl/[26px] font-semibold">
              {archieveEnum.DEPARTMENTS}
            </h2>
          </Typography>
        </div>
        <div className="flex w-1/2 justify-end  space-x-4 ">
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
            onClick={() => navigate('../addDepartment')}
            sx={
              {
                color: '#3c59d4',
                border: '1px solid #0070fa',
                fontWeight: '550',
                backgroundColor: 'white',
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
            {archieveEnum.NEW_DEPARTMENT}
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

      <div className="m-3 border border-slate-300 rounded-lg">
        <div className="flex flex-1  justify-between bg-white rounded-tl-xl rounded-tr-xl ">
          <div className="flex gap-5 snap-x py-4 pt-sm-0 px-3">
            <div className="selectDropdown">
              <MultipleSelect
                options={ClientOptions}
                label={archieveEnum.CLIENT}
                placeholder={archieveEnum.PLACE_HOLDER_CLIENT}
                className="pl-3"
                isMultiple
                value={selectedClient}
                onChange={(value) => changeOptions('Clients', value)}
              />
            </div>
            <div className="selectDropdown">
              <MultipleSelect
                options={projectOptions}
                label={archieveEnum.PROJECT}
                placeholder={archieveEnum.PLACE_HOLDER_PROJECT}
                isMultiple
                value={selectProject}
                onChange={(value) => changeOptions('project', value)}
              />
            </div>
          </div>
          <SearchField
            value={searchValue}
            placeholder="Search"
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
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHead className="sticky top-[-1px] mb-3 border border-t-2 border-b-2 border-l-0 border-r-0">
              <TableRow className="bg-gray-50 h-12 text-black-500 font-medium">
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
                              className={`mt-[-24px] ml-[80px] absolute cursor-pointer ${sortConfig.key === item.title.toLowerCase() &&
                                  sortConfig.direction === departmentEnum.ASC
                                  ? 'text-[#3c59d4]'
                                  : ''
                                }`}
                              onClick={() => handleSort(departmentEnum.Name)}
                            />
                            <ArrowDropDownIcon
                              className={`absolute mt-[-18px] !ml-[80px] cursor-pointer ${sortConfig.key === item.title.toLowerCase() &&
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

            <TableBody className="overflow-y-auto">
              {departments?.data?.departments.length === 0 ? (
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
                departments &&
                departments?.data?.archiveCount > 0 &&
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
                            alt={archieveEnum.ICON}
                          />
                        ) : (
                          <img src={user} className="h-10 w-10" alt={archieveEnum.AVATAR} />
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
                                <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                                  <img
                                    src={data?.image}
                                    className="h-10 w-10 rounded-full"
                                    alt={`Avatar of ${data.firstName}`}
                                  />
                                </div>
                              ) : (
                                <img
                                  src={user}
                                  className="h-10 w-10"
                                  alt={archieveEnum.AVATAR}
                                />
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
                        handleUnArchive={handleUnArchive}
                        handleDeleteClick={handleDeleteClick}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
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
            message={archieveEnum.UN_ARCHIVE_MESSAGE}
            deleteButtonText='Unarchive'
          />
        </DeleteModal>
      )}

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
            message={archieveEnum.DELETE_MESSAGE}
            deleteButtonText="Delete"
          />
        </DeleteModal>
      )}

      <div className="flex w-full mt-2">
        {departments?.data.totalCount === 0 ? (
          <div className="w-1/2 justify-center"></div>
        ) : (
          <>
            <div className="w-1/2 justify-center">
              {totalPages > 0 && (
                <div className="w-full text-slate-400 pl-3 mt-2">
                  {departments?.data?.totalCount === totalPages
                    ? `Showing ${departments.data.itemCount} of ${departments.data.totalCount} entries`
                    : `Showing ${(currentPage - 1) * itemsPerPage + 1
                    } to  ${Math.min(
                      currentPage * itemsPerPage,
                      total
                    )} of ${total} entries`}
                </div>
              )}
            </div>
          </>
        )}
        {departments?.data.totalCount === 0 ? null : (
          <>
            <div className="w-1/2 ">
              <div className="flex mt-2 justify-end">
                <FormControl variant="outlined" size="small">
                  <InputLabel id="items-per-page-label"></InputLabel>
                  <Select
                    labelId="items-per-page-label"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    label="Entries"
                    className="w-20"
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                  </Select>
                </FormControl>

                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`bg-inherit text-customDeeperSkyBlue cursor-pointer border-none py-1 px-3 ${currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-[#3c59d4]'
                    }`}
                >
                  {archieveEnum.PREVIOUS}
                </button>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handleChangePage}
                  variant="outlined"
                  color="primary"
                  className={`bg-inherit text-customDeeperSkyBlue cursor-pointer border-none py-1 px-3 ${totalPages === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-[#3c59d4]'
                    } focus:outline-none`}
                />
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`bg-inherit cursor-pointer border-none py-1 px-3 ${currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-[#3c59d4]'
                    }`}
                >
                  {archieveEnum.NEXT}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Archieve;
