import {
  TableCell,
  Tooltip,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ActionButtons, PageSizeSelect, Pagination } from '@appname/components';
import {
  DeleteIcon,
  AddIcon,
  UnArchiveIcon,
  deleteImg,
} from '@appname/assets';
import React, { SetStateAction, useEffect, useState } from 'react';
import {
  MultipleSelect,
  SearchField,
  ToggleButton,
  ButtonWithIcon,
  DeleteConfirmModal,
  showToast,
  DeleteModal,
} from '@appname/ui';
import {
  useClients,
  useDeleteClient,
  useGetAllDepartments,
  useGetAllProject,
  useClientArchive,
} from '../../hooks/useClients';
import { Client, allClientsData } from '../../types/clientsTypes';
import ClearIcon from '@mui/icons-material/Clear';
import { ClientsEnum } from '../enums/Clientsenum';


type ButtonStyleProps = React.CSSProperties & {
  '&:hover'?: React.CSSProperties;
};
const ArchivePage = () => {
  //toglebtn state
  const [selectedOption, setSelectedOption] = useState('Archive');
  const [clientsData, setClientsData] = useState<Client[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [selectedDepart, setSelectedDepart] = useState<string[]>([]);
  const [type, setType] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<string[]>([]);
  const [unArchiveModalOpen, setUnArchiveModalOpen] = useState<boolean>(false);
  const [updateClientId, setUpdateClientId] = useState<string>('');
  const [isArchive, setIsArchive] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const { mutateAsync: mutateAsyncTwo } = useDeleteClient();
  const navigate = useNavigate();
  const { mutateAsync } = useClientArchive();

  const [sortConfig, setSortConfig] = useState<{
    key: keyof allClientsData;
    direction: 'ASC' | 'DESC';
  }>({ key: 'createdAt', direction: 'DESC' });

  // api data
  const { data, refetch } = useClients({
    searchBy: searchValue,
    sortBy: sortConfig.key,
    sortOrder: sortConfig.direction,
    filterBy: id,
    filterValue: type === 'project' ? selectedProject : selectedDepart,
    pageNumber: !isArchive ? currentPage : currentPage,
    pageSize: !isArchive ? itemsPerPage : itemsPerPage,
    isArchive: true,
  });

  useEffect(() => {
    if (data) {
      setClientsData(data?.data?.clients || []);
      setTotalPages(data?.data.totalPages);
      setTotalItems(data?.data.totalCount);
    }
    if (selectedDepart.length) {
      refetch();
    }
    if (selectedProject.length) {
      refetch();
    }
  }, [data, searchValue, setItemsPerPage, id, selectedProject, selectedDepart]);

  //togglebuuton
  const options = [
    {
      value: 'Active',
      label:
        data?.data.activeCount != null
          ? `Active(${data?.data?.activeCount})`
          : 'Active',
    },
    {
      value: 'Archive',
      label:
        data?.data.archiveCount != null
          ? `Archive(${data?.data?.archiveCount})`
          : 'Archive',
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

  const handleClickNewClient = () => {
    navigate('../add-client');
  };
  const pageSizeOptions = [
    { label: '5', value: '5' },
    { label: '10', value: '10' },
    { label: '15', value: '15' },
    { label: '20', value: '20' },
  ];

  //searching
  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  // pagination
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage + 1, 1));
  };

  // pagination or entries
  const handleItemsPerPageChange = (event: any) => {
    setItemsPerPage(event.target.value as number);
    setCurrentPage(1);
  };

  // sorting
  const handleSort = (key: keyof allClientsData) => {
    setSortConfig((prevSortConfig) => {
      let direction: 'DESC' | 'ASC' = 'DESC';
      if (prevSortConfig.key === key && prevSortConfig.direction === 'DESC') {
        direction = 'ASC';
      }
      return { key, direction };
    });
  };

  const [deleteClientId, setDeleteClientId] = React.useState<
    string | undefined
  >();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { mutateAsync: mutateAsyncDelete } = useDeleteClient();

  const deleteByClient = async () => {
    try {
      if (deleteClientId) {
        setModalOpen(false);
        const response = await mutateAsyncDelete(deleteClientId);
        showToast(`${response.message}`, 'success');
        refetch();
      }
    } catch (error: any) {
      showToast(`${error.message}`, 'error');
    }
  };
  const handleDeleteClick = (id: string) => {
    setDeleteClientId(id);
    setModalOpen(true);
  };
  const closeModal = () => {
    setUnArchiveModalOpen(false);
    setModalOpen(false);
  };

  const handleUnArchiveClick = (id: string) => {
    setUnArchiveModalOpen(true);
    setUpdateClientId(id);
  };

  // project and department dropdowns data
  const { data: DepartmentData } = useGetAllDepartments({});
  const DepartmentOptions = DepartmentData?.data?.departments?.map(
    (ele: any) => ({
      label: ele.name,
      value: ele.id,
    })
  );
  const { data: projectData } = useGetAllProject({});
  const projectOptions = projectData?.data?.projects?.map((ele: any) => ({
    label: ele.name,
    value: ele.id,
  }));

  const changeOptions = (type: 'project' | 'Departments', value: string[]) => {
    setType(type);
    if (type === 'project') {
      setSelectedProject(value);
      setId('project');
    } else if (type === 'Departments') {
      setId('department');
      setSelectedDepart(value);
    }
  };

  const updateByClient = async () => {
    setUnArchiveModalOpen(true);
    const updatedValue = {
      isArchive: false,
    };
    try {
      const response = await mutateAsync({
        id: updateClientId,
        formValues: updatedValue,
      });
      if (response) {
        showToast('Client un-archived successfully.', 'success');
      }
      refetch();
    } catch (error) {
      showToast('Error', 'error');
    }
  };

  return (
    <div className="bg-gray-50 w-full pb-2 mt-16 overflow-hidden">
      {/***  topheader ***/}
      <div className="headerdiv flex justify-between p-3 mt-2 -mb-2">
        <div>
          <Typography
            variant="h5"
            component="h5"
            className="text-[26px] md:font-bold"
          >
            <h2 className="mt-2 text-2xl/[26px] font-semibold">
              {ClientsEnum.CLIENTS}
            </h2>
          </Typography>
        </div>
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
            onClick={handleClickNewClient}
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
            {ClientsEnum.NEW_CLIENT}
          </ButtonWithIcon>
          <ToggleButton
            options={options}
            value={selectedOption}
            onChange={handleOptionChange}
            buttonStyles={{
              height: '44px',
              width: '130px',
              backgroundColor: '#e5e7eb',
              borderRadius: '0px',
              fontSize: '16px',
              padding: '8px 25px',
            }}
          />
        </div>
      </div>
      <div className="m-3 border border-slate-300  rounded-lg">
        <div className="flex justify-between items-center border-b-[1px] rounded-t-[7px] flex-wrap overflow-auto  bg-white">
          {/* leftdiv dropdwon */}
          <div className="flex gap-4 snap-x py-2.5  px-3">
            <div className="selectDropdown">
              <MultipleSelect
                className="p-2.5 px-8"
                options={DepartmentOptions}
                label={ClientsEnum.DEPARTMENT}
                placeholder={ClientsEnum.DEPARTMENT_PLACEHOLDER}
                value={selectedDepart}
                onChange={(value) => changeOptions('Departments', value)}
                isMultiple={true}
              />
            </div>
            <div className="selectDropdown">
              <MultipleSelect
                className="p-2.5 px-8"
                options={projectOptions}
                label={ClientsEnum.PROJECT}
                placeholder={ClientsEnum.PROJECT_PLACEHOLDER}
                value={selectedProject}
                onChange={(value) => changeOptions('project', value)}
                isMultiple={true}
              />
            </div>
          </div>
          {/* {/ rightdiv dropdown /} */}
          <div className="search-div">
            <SearchField
              value={searchValue}
              placeholder={ClientsEnum.SEARCH_PLACEHOLDER}
              onChange={search}
              tailwindClasses="w-[200px] !px-3 !py-4 hover:border-blue-500"
              sx={{
                backgroundColor: 'white',
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
        </div>
        {/* tablediv */}
        <div className="overflow-auto max-h-[640px]">
          <table className="w-full text-left bg-white ">
            <thead className=" bg-gray-50 sticky z-10 top-0 ">
              <tr className="text-black-500  text-left font-medium col-span-2">
                <th className="p-4 !text-sm !font-semibold w-1/4 ">
                  {ClientsEnum.ORGANIZATION_Name}
                  <ArrowDropUpIcon
                    className="top-[10px] absolute cursor-pointer"
                    onClick={() => handleSort('organizationName')}
                  />
                  <ArrowDropDownIcon
                    className="absolute top-[16px] cursor-pointer"
                    onClick={() => handleSort('organizationName')}
                  />
                </th>
                <th className="p-4 !text-sm !font-semibold w-1/4 ">
                  {ClientsEnum.CLIENT_CODE}
                  <ArrowDropUpIcon
                    className="top-[10px] absolute cursor-pointer"
                    onClick={() => handleSort('clientCode')}
                  />
                  <ArrowDropDownIcon
                    className="absolute top-[16px] cursor-pointer"
                    onClick={() => handleSort('clientCode')}
                  />
                </th>
                <th className="p-4 !text-sm !font-semibold w-1/4">
                  {ClientsEnum.DEPARTMENT}
                  <ArrowDropUpIcon
                    className="top-[10px] absolute cursor-pointer"
                    onClick={() => handleSort('organizationName')}
                  />
                  <ArrowDropDownIcon
                    className="absolute top-[16px] cursor-pointer"
                    onClick={() => handleSort('organizationName')}
                  />
                </th>
                <th className="p-4 !text-sm !font-semibold w-1/4  ">Actions</th>
              </tr>
            </thead>
            <tbody className="border-t-2 overflow-hidden whitespace-nowrap text-ellipsis">
              {totalItems === 0 ? (
                <TableCell
                  colSpan={4}
                  className=" text-black !w-full"
                  sx={{
                    textAlign: 'center',
                    fontSize: '22px',
                    fontWeight: '700',
                  }}
                >
                  {ClientsEnum.NO_RECORDS}
                </TableCell>
              ) : (
                data &&
                data?.data?.archiveCount > 0 &&
                data?.data?.clients?.map((item, index) => (
                  <tr key={index} className="text-left relative col-span-2">
                    <td className="p-4 text-sm col-span-2">
                      {item.organizationName}
                    </td>
                    <td className="p-4 text-sm">{item.clientCode}</td>
                    <tr>
                      <td className="text-sm flex overflow-hidden text-ellipsis max-w-36 hover:overflow-visible">
                        {item?.departments ? (
                          item.departments.map((data, index) => (
                            <span
                              key={index}
                              className="p-4 overflow-hidden text-ellipsis hover:overflow-visible" 
                            >
                              {data.name}
                            </span>
                          ))
                        ) : (
                          <div key={index} className="mb-1"></div>
                        )}
                      </td>
                    </tr>
                    <td className="p-4 cursor-pointer text-sm space-x-2">
                    <ActionButtons
                        itemId={item.id} 
                        handleUnArchive={handleUnArchiveClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>  
      {/* pagination div */}
      <div className="pagination flex w-full text-slate-400 justify-between">
        {/* ************************* */}
        <div className="leftdiv flex justify-between px-2 py-1 w-1/2">
          <div className="pt-3">
            {totalItems > 0 && (
              <div>
                Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, totalItems)} of{' '}
                {totalItems} Entries
              </div>
            )}
          </div>
        </div>      
           {clientsData.length > 0 && (
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
                 buttonTitles={{PREVIOUS:ClientsEnum.PREVIOUS, NEXT:ClientsEnum.NEXT}} >
               </Pagination>
             </div>
           </div>
           </>       
            )}
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
            onConfirm={deleteByClient}
            deleteIcon={deleteImg}
            message="Do you really want to delete this client?"
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
            onConfirm={updateByClient}
            deleteIcon={deleteImg}
            message="Do you really want to  un-archive this client?"
            deleteButtonText="Unarchive"
          />
        </DeleteModal>
      )}
    </div>
  );
};
export default ArchivePage;
