import { Typography, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ButtonWithIcon, ToggleButton } from '@appname/ui';
import { Outlet, useNavigate } from 'react-router-dom';
import { AddIcon } from '@appname/assets';
import ActiveTable from './ActiveTable';
import ArchiceTable from './ArchiveTable';
import { SearchField, MultipleSelect } from '@appname/ui';
import { Users } from '../../types/usersTypes';
import {
  useAllUsers,
  useGetAllDepartments,
  useGetAllProject,
} from '../../hooks/useUsers';
import { PeopleEnum } from '../enums/PeopleEnums';
import { Pagination, PageSizeSelect } from '@appname/components';

type ButtonStyleProps = React.CSSProperties & {
  '&:hover'?: React.CSSProperties;
};
interface UserData {
  Name: {
    name: string;
    Image: string;
  };
  Email: string;
  JobRole: string;
  ReportingManager: string;
  Last_Login: string;
  Last_Updated: string;
}

interface OptionsData {
  value: string;
  label: string;
}

export const People = () => {
  const [searchPeople, setSearchPeople] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [archiveCurrentPage, setArchiveCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [archiveTotalPages, setArchiveTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [archiveTotalItems, setArchiveTotalItems] = useState<number>(0);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Users;
    direction: string;
  }>({ key: 'createdAt', direction: 'DESC' });

  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [archiveItemsPerPage, setArchiveItemsPerPage] = useState<number>(20);

  const [isArchived, setIsArchived] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Active');
  const [activeCount, setActiveCount] = useState<number>();
  const [archiveCount, setArchiveCount] = useState<number>();
  const [isArchive, setIsArchive] = useState(false);
  const [UsersData, setUsersData] = useState<Users[]>([]);
  const [selectedDepart, setSelectedDepart] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<string[]>([]);
  const [archiveData, setArchiveData] = useState<Users[]>([]);

  const [type, setType] = useState<string>('');
  const [id, setId] = useState<string>('');
  const navigate = useNavigate();

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPeople(e.target.value);
    setCurrentPage(1);
  };

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
  const handleChangePage1 = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setArchiveCurrentPage(page);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handlePreviousPage1 = () => {
    setArchiveCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage + 1, 1));
  };
  const handleNextPage1 = () => {
    setArchiveCurrentPage((prevPage) => Math.max(prevPage + 1, 1));
  };

  const {
    data,
    refetch,
    isLoading: tableLoader,
  } = useAllUsers({
    searchBy: searchPeople,
    pageNumber: !isArchive ? currentPage : archiveCurrentPage,
    pageSize: !isArchive ? itemsPerPage : archiveItemsPerPage,
    sortOrder: sortConfig.direction,
    sortBy: sortConfig.key,
    filterBy: id,
    filterValue: type === 'project' ? selectedProject : selectedDepart,
    isArchive: isArchive,
  });
  useEffect(() => {
    if (data) {
      setActiveCount(data?.data?.activeCount);
      setArchiveCount(data?.data?.archiveCount);
      if (!isArchive) {
        setUsersData(data?.data?.users);
        setTotalPages(data?.data?.totalPages);
        setTotalItems(data?.data?.totalCount);
      }
      if (isArchive) {
        setArchiveData(data?.data?.users);
        setArchiveTotalPages(data?.data?.totalPages);
        setArchiveTotalItems(data?.data?.totalCount);
      }
    }
    if (selectedDepart.length) {
      refetch();
    }
    if (selectedProject.length) {
      refetch();
    }
  }, [
    data,
    searchPeople,
    sortConfig,
    itemsPerPage,
    selectedDepart,
    selectedProject,
    id,
    activeCount,
    archiveCount,
    isArchive,
    archiveItemsPerPage,
  ]);

  const pageSizeOptions = [
    { label: '5', value: '5' },
    { label: '10', value: '10' },
    { label: '15', value: '15' },
    { label: '20', value: '20' },
  ];
  const options: OptionsData[] = [
    {
      value: 'Active',
      label:
        data?.data.activeCount != null
          ? `Active(${data.data.activeCount})`
          : 'Active',
    },
    {
      value: 'Archieve',
      label:
        data?.data?.archiveCount != null
          ? `Archive(${data.data.archiveCount})`
          : 'Archive',
    },
  ];

  const handleOptionChange = (newOption: string) => {
    setIsArchive(true);
    if (newOption === 'Archieve') {
      setIsArchive(true);
    }
    if (newOption === 'Active') {
      setIsArchive(false);
    }
    setSelectedOption(newOption);
    setIsArchived(newOption === 'Archieve');
  };

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
  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    setItemsPerPage(event.target.value as number);
    setCurrentPage(1); // Reset to first page when items per page changes
  };
  const handleItemsArchive = (event: SelectChangeEvent<number>) => {
    setArchiveItemsPerPage(event.target.value as number);
    setArchiveCurrentPage(1); // Reset to first page when items per page changes
  };

  const { data: DepartmentData } = useGetAllDepartments({});
  const DepartmentOptions = DepartmentData?.data?.departments?.map(
    (ele: any) => ({
      label: ele.name,
      value: ele.id,
    })
  );

  const { data: projectData, error, isLoading } = useGetAllProject({});
  const projectOptions = projectData?.data?.projects?.map((ele: any) => ({
    label: ele.name,
    value: ele.id,
  }));
  if (isLoading) {
    return <div>{PeopleEnum.LOADING}</div>;
  }
  if (error) {
    return (
      <div className="text-red-500">
        {PeopleEnum.ERROR_MSG}: {error.message}
      </div>
    );
  }

  return (
    <div className="maindiv bg-gray-50  w-full pb-2 mt-16 overflow-hidden">
      <div className="flex justify-between p-3 mt-2 -mb-2">
        <Typography
          variant="h5"
          component="h5"
          className="text-[26px] md:font-bold"
        >
          <h2 className="mt-2 text-2xl/[26px] font-semibold">
            {' '}
            {PeopleEnum.PEOPLE}
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
            onClick={() => navigate('add-User')}
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
            {PeopleEnum.NEWPEOPLE}
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
      <div className="m-3 border border-slate-300  rounded-lg ">
        <div className="bg-customWhite flex justify-between items-center rounded-[7px] flex-wrap overflow-auto  bg-white border-b-[1px]">
          <div className="flex gap-5 snap-x py-4 pt-sm-0 px-3">
            <div className="selectDropdown">
              <MultipleSelect
                options={DepartmentOptions}
                label={PeopleEnum.DEPARTMENT}
                placeholder="-- Department --"
                isMultiple
                value={selectedDepart}
                onChange={(value) => changeOptions('Departments', value)}
              />
            </div>

            <div className="selectDropdown">
              <MultipleSelect
                options={projectOptions}
                label={PeopleEnum.PROJECT}
                placeholder="-- Project --"
                isMultiple
                value={selectedProject}
                onChange={(value) => changeOptions('project', value)}
              />
            </div>
          </div>
          <SearchField
            value={searchPeople}
            placeholder="Search"
            onChange={search}
            tailwindClasses="w-[200px] !px-3 !py-4"
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
        {isArchive ? (
          <ArchiceTable
            archiveData={archiveData}
            refetch={refetch}
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
            isLoader={tableLoader}
          />
        ) : (
          <ActiveTable
            setUsersData={setUsersData}
            AllUsers={UsersData}
            setSortConfig={setSortConfig}
            sortConfig={sortConfig}
            refetch={refetch}
            total={totalItems}
            isLoader={tableLoader}
          />
        )}
      </div>
      <div className="flex w-full text-slate-400 justify-between pl-3 p-2">
        {totalItems > 0 && !isArchive && (
          <div>
            {PeopleEnum.SHOWING} {(currentPage - 1) * itemsPerPage + 1}{' '}
            {PeopleEnum.TO} {Math.min(currentPage * itemsPerPage, totalItems)}{' '}
            {PeopleEnum.OF} {totalItems} {PeopleEnum.ENTRIES}
          </div>
        )}
        {archiveTotalItems > 0 && isArchive && (
          <div>
            {PeopleEnum.SHOWING}{' '}
            {(archiveCurrentPage - 1) * archiveItemsPerPage + 1} {PeopleEnum.TO}{' '}
            {Math.min(
              archiveCurrentPage * archiveItemsPerPage,
              archiveTotalItems
            )}{' '}
            {PeopleEnum.OF}
            {archiveTotalItems} {PeopleEnum.ENTRIES}
          </div>
        )}

        {UsersData?.length > 0 && !isArchive && (
          <div className="w-1/2 ">
            <div className="flex mt-2 justify-end">
              <div className="pageSize pb-2">
                <PageSizeSelect
                  options={pageSizeOptions}
                  defaultValue={!isArchive ? itemsPerPage : archiveItemsPerPage}
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
                  PREVIOUS: PeopleEnum.PREVIOUS,
                  NEXT: PeopleEnum.NEXT,
                }}
              ></Pagination>
            </div>
          </div>
        )}
        {archiveData.length > 0 && isArchive && (
          <div className="w-1/2 ">
            <div className="flex mt-2 justify-end">
              <div className="pageSize pb-2">
                <PageSizeSelect
                  options={pageSizeOptions}
                  defaultValue={!isArchive ? itemsPerPage : archiveItemsPerPage}
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
                  PREVIOUS: PeopleEnum.PREVIOUS,
                  NEXT: PeopleEnum.NEXT,
                }}
              ></Pagination>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default People;

export function PeopleLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
