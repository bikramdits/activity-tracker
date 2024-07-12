import { AddIcon } from '@appname/assets';
import {
  MultipleSelect,
  SearchField,
  ToggleButton,
  ButtonWithIcon,
} from '@appname/ui';
import { SelectChangeEvent, Typography } from '@mui/material';
import { useState, SetStateAction, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ProjectsTable from './ProjectsTable';
import {
  useGetAllClients,
  useGetAllDepartments,
  useGetAllProjects,
} from '../../hooks/useProjects';
import React from 'react';
import { Project } from '../../types/projectsTypes';
import { ProjectEnum } from '../enums/ProjectEnum';
import Archives from './pages/Archives';
import { Pagination } from '@appname/components';
import { PageSizeSelect } from '@appname/components';
type ButtonStyleProps = React.CSSProperties & {
  '&:hover'?: React.CSSProperties;
};

export default function Projects() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Project;
    direction: string;
  }>({ key: ProjectEnum.CREATED_AT, direction: ProjectEnum.DESC });

  const [selectedOption, setSelectedOption] = useState('Active');
  const [projectData, setProjectData] = useState<Project[]>([]);
  const [selectedDepart, setSelectedDepart] = useState<string[]>([]);
  const [selectedClient, setSelectedClient] = useState<string[]>([]);
  const [archiveData, setArchiveData] = useState<Project[]>([]);
  const [isArchive, setIsArchive] = useState(false);
  const [archiveCount, setArchiveCount] = useState<number>();
  const [activeCount, setActiveCount] = useState<number>();
  const [isArchived, setIsArchived] = useState(false);
  const [archiveItemsPerPage, setArchiveItemsPerPage] = useState<number>(20);
  const [archiveTotalItems, setArchiveTotalItems] = useState<number>(0);
  const [archiveTotalPages, setArchiveTotalPages] = useState<number>(1);
  const [archiveCurrentPage, setArchiveCurrentPage] = useState<number>(1);

  const [type, setType] = useState<string>('');
  const [id, setId] = useState<string>('');

  const navigate = useNavigate();

  const { data, refetch, isLoading } = useGetAllProjects({
    searchBy: searchValue,
    pageNumber: !isArchive ? currentPage : archiveCurrentPage,
    pageSize: !isArchive ? itemsPerPage : archiveItemsPerPage,
    sortOrder: sortConfig.direction,
    sortBy: sortConfig.key,
    filterBy: selectedDepart?.length || selectedClient?.length ? id : '',
    filterValue: type === 'Clients' ? selectedClient : selectedDepart,
    isArchive: isArchive,
  });

  /**************************** fetch project data *******************************/

  useEffect(() => {
    if (data) {
      setActiveCount(data?.data?.activeCount);
      setArchiveCount(data?.data?.archiveCount);
      if (!isArchive) {
        setProjectData(data?.data?.projects);
        setTotalPages(data?.data?.totalPages);
        setTotalItems(data?.data?.totalCount);
        setCurrentPage(data?.data?.pageNumber);
      }
      if (isArchive) {
        setArchiveData(data?.data?.projects);
        setArchiveTotalPages(data?.data?.totalPages);
        setArchiveTotalItems(data?.data?.totalCount);
        setArchiveCurrentPage(data?.data?.pageNumber);
      }
    }
    if (selectedDepart.length) {
      refetch();
    }
    if (selectedClient.length) {
      refetch();
    }
  }, [
    data,
    searchValue,
    sortConfig,
    totalItems,
    selectedDepart,
    selectedClient,
    itemsPerPage,
    id,
    activeCount,
    archiveCount,
    isArchive,
    archiveItemsPerPage,
  ]);

  const changeOptions = (type: 'Clients' | 'Departments', value: string[]) => {
    setType(type);
    if (type === 'Departments') {
      setId('departmentId');
      setSelectedDepart(value);
    } else if (type === 'Clients') {
      setId('clientId');
      setSelectedClient(value);
    }
  };
  const { data: DepartmentData } = useGetAllDepartments({});
  const DepartmentOptions = DepartmentData?.data?.departments?.map(
    (ele: any) => ({
      label: ele.name,
      value: ele.id,
    })
  );

  const { data: ClientData } = useGetAllClients({});
  const ClientOptions = ClientData?.data?.clients?.map((ele: any) => ({
    label: ele.organizationName,
    value: ele.id,
  }));

  /*********************** handle page change *****************************/

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    refetch();
    setCurrentPage(page);
  };
  const handleChangePage1 = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setArchiveCurrentPage(page);
  };
  /****************************** handle previous page *********************************************/

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handlePreviousPage1 = () => {
    setArchiveCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  /****************************** handle next page *********************************************/

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage + 1, 1));
  };
  const handleNextPage1 = () => {
    setArchiveCurrentPage((prevPage) => Math.max(prevPage + 1, 1));
  };

  /***************************** handle search input change *************************/

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const pageSizeOptions = [
    { label: '5', value: '5' },
    { label: '10', value: '10' },
    { label: '15', value: '15' },
    { label: '20', value: '20' },
  ];
  const options = [
    {
      value: 'Active',
      label:
        data?.data?.activeCount != null
          ? `Active(${data.data.activeCount})`
          : 'Active',
    },
    {
      value: 'Archive',
      label:
        data?.data?.archiveCount != null
          ? `Archive(${data.data.archiveCount})`
          : 'Archive',
    },
  ];
  // Function to handle changes in the selected option (Active/Archive)
  const handleOptionChange = (newOption: string) => {
    setIsArchive(true);
    if (newOption === 'Archive') {
      setIsArchive(true);
    }
    if (newOption === 'Active') {
      setIsArchive(false);
    }
    setSelectedOption(newOption);
    setIsArchived(newOption === 'Archive');
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    const newValue = event.target.value as number;
    setItemsPerPage(newValue);
    setCurrentPage(1);

    refetch();
  };
  const handleItemsArchive = (event: SelectChangeEvent<number>) => {
    setArchiveItemsPerPage(event.target.value as number);
    setArchiveCurrentPage(1);
  };

  return (
    <div className="maindiv  bg-gray-50  w-full pb-2 mt-16 overflow-hidden ">
      <div className="flex justify-between p-3 mt-2 -mb-2">
        <div>
          <Typography
            variant="h5"
            component="h5"
            className="text-[26px] font-bold"
          >
            <h2 className="mt-2 text-2xl/[26px] font-semibold">
              {ProjectEnum.PROJECTS}
            </h2>
          </Typography>
        </div>
        <div className="flex w-1/2 justify-end space-x-4">
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
            onClick={() => navigate('addProject')}
            sx={
              {
                color: '#3c59d4',
                border: '1px solid #0070fa',
                fontWeight: '550',
                fontSize: '17px',
                backgroundColor: 'white',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#cae2ff',
                  borderColor: '#3c59d4',
                },
              } as ButtonStyleProps
            }
          >
            {ProjectEnum.NEW_PROJECT}
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
        <div className=" flex justify-between items-center rounded-t-[7px] border-b-[1px]  flex-wrap overflow-auto  bg-white">
          <div className="flex gap-3 snap-x py-4 pt-sm-0 px-3">
            <div className="selectDropdown">
              <MultipleSelect
                options={DepartmentOptions}
                label={ProjectEnum.DEPARTMENT}
                placeholder="-- Department --"
                isMultiple
                value={selectedDepart}
                onChange={(value) => changeOptions('Departments', value)}
              />
            </div>
            <div className="selectDropdown">
              <MultipleSelect
                options={ClientOptions}
                label={ProjectEnum.CLIENT}
                placeholder="-- Client --"
                isMultiple
                value={selectedClient}
                onChange={(value) => changeOptions('Clients', value)}
              />
            </div>
          </div>
          <div className="flex-grow-0 w-full sm:w-auto mt-[-9px] lg:mt-0">
            <SearchField
              value={searchValue}
              onChange={search}
              placeholder="Search"
              tailwindClasses="w-[254px] !px-3 !py-4"
              sx={{
                backgroundColor: 'white',
                borderRadius: '8px',
                '.MuiOutlinedInput-root': {
                  paddingRight: '0',
                  height: '44px',
                },
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3c59d4',
                },
                '.MuiSvgIcon-root': {
                  color: '#3c59d4',
                },
              }}
            />
          </div>
        </div>

        {isArchive ? (
          <Archives
            refetch={refetch}
            archiveData={archiveData}
            setProjectData={setProjectData}
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
            totalItems={totalItems}
            setDeleteProject={() => {
              console.log('Delete');
            }}
          />
        ) : (
          <ProjectsTable
            isLoading={isLoading}
            projectData={projectData}
            setProjectData={setProjectData}
            setSortConfig={setSortConfig}
            sortConfig={sortConfig}
            totalItems={totalItems}
            refetch={refetch}
            setDeleteProject={() => {
              console.log('Delete');
            }}
          />
        )}
      </div>
      <div className="w-full flex justify-between  p-2">
        <div className="w-2/4 flex items-center">
          {totalItems > 0 && !isArchive && (
            <div className="w-full text-slate-400 pl-3">
              {ProjectEnum.SHOWING} {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{' '}
              {ProjectEnum.ENTRIES}
            </div>
          )}
          {archiveTotalItems > 0 && isArchive && (
            <div className="w-full text-slate-400 pl-3">
              {ProjectEnum.SHOWING}{' '}
              {(archiveCurrentPage - 1) * archiveItemsPerPage + 1} to{' '}
              {Math.min(
                archiveCurrentPage * archiveItemsPerPage,
                archiveTotalItems
              )}{' '}
              of {archiveTotalItems} {ProjectEnum.ENTRIES}
            </div>
          )}
        </div>

        {projectData?.length > 0 && !isArchive && (
          <>
            <div className="w-1/2 ">
              <div className="flex mt-2 justify-end">
                <div className="pageSize pb-2">
                  <PageSizeSelect
                    options={pageSizeOptions}
                    defaultValue={
                      !isArchive ? itemsPerPage : archiveItemsPerPage
                    }
                    onChange={
                      !isArchive ? handleItemsPerPageChange : handleItemsArchive
                    }
                  />
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePreviousPage={handlePreviousPage}
                  handleNextPage={handleNextPage}
                  changePage={handleChangePage}
                  rolesLength={totalPages}
                  buttonTitles={{
                    PREVIOUS: ProjectEnum.PREVIOUS,
                    NEXT: ProjectEnum.NEXT,
                  }}
                ></Pagination>
              </div>
            </div>
          </>
        )}
        {data && data?.data?.archiveCount > 0 && isArchive && (
          <>
            <div className="w-1/2 ">
              <div className="flex mt-2 justify-end">
                <div className="pageSize pb-2">
                  <PageSizeSelect
                    options={pageSizeOptions}
                    defaultValue={
                      !isArchive ? itemsPerPage : archiveItemsPerPage
                    }
                    onChange={
                      !isArchive ? handleItemsPerPageChange : handleItemsArchive
                    }
                  />
                </div>
                <Pagination
                  currentPage={archiveCurrentPage}
                  totalPages={archiveTotalPages}
                  handlePreviousPage={handlePreviousPage1}
                  handleNextPage={handleNextPage1}
                  changePage={handleChangePage1}
                  rolesLength={archiveTotalPages}
                  buttonTitles={{
                    PREVIOUS: ProjectEnum.PREVIOUS,
                    NEXT: ProjectEnum.NEXT,
                  }}
                ></Pagination>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function ProjectLayout() {
  return <Outlet />;
}
