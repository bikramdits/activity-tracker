import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Button, SearchField } from '@appname/ui';
import AddIcon from '@mui/icons-material/Add';
import RolesTable from './RoleTable';
import { pageSizeOptions } from './SelectOption';
import { Link } from 'react-router-dom';
import { RoleType } from '../types/GetRoleType';
import { useGetAllRoles } from '../../../hooks/useRole';
import {
  AddRoleNameEnum,
  ButtonTitleEnum,
  RolesEnum,
  RolesPlaceholderEnum,
} from '../enum/RolesEnum';
import { Pagination, PageSizeSelect } from '@appname/components';

const Roles = () => {
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof RoleType;
    direction: string;
  }>({ key: AddRoleNameEnum.CREATED_AT, direction: 'DESC' });
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(20);

  const itemsPerPage = pageSize;

  /********************** handle page change ****************************/
  
  const changePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  /**************************** handle search input change ************************/

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  /**************************** handle previous page ************************************/

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  /***************************** handle next page ********************************************/

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage + 1, 1));
  };
  const { data, isLoading, refetch } = useGetAllRoles({
    searchBy: searchValue,
    sortOrder: sortConfig.direction,
    sortBy: sortConfig.key,
    pageNumber: currentPage,
    pageSize: itemsPerPage,
  });

  /*************************** fetch roles data ******************************/

  useEffect(() => {
    if (data) {
      setRoles(data?.data?.roles);
      setTotalPages(data?.data?.totalPages);
      setTotalItems(data?.data?.itemCount);
    }
  }, [data, searchValue, sortConfig, totalItems]);
  if (isLoading) {
    <p>loading...</p>;
  }
  const handlePageSizeChange = (event: any) => {
    setPageSize(event.target.value as number);
    setCurrentPage(1); // Reset to first page whenever page size changes
  };
  return (
    <div className="w-full pt-[65px] bg-[#f9f9f9] h-full">
      <div className="flex justify-between p-3 pb-0 sticky top-[60px] z-20 bg-inherit">
        <Typography
          variant="h5"
          component="h5"
          className="text-[26px] !font-bold"
        >
          <h2 className="mt-2 text-2xl/[26px] font-semibold">
            {RolesEnum.ROLES_AND_PERMISSIONS}
          </h2>
        </Typography>
        <Link to="../add-role">
          <Button tailwindClasses="!font-bold !border-[#0070fa] hover:!bg-[#cae2ff] !border-solid !border !text-[#3c59d4] !bg-[#FFFFFF] !text-[15px] !capitalize !shadow-none !cursor-pointer !leading-6.4 !py-[8px] !px-[11px] !gap-1">
            <AddIcon />
            {ButtonTitleEnum.NEW_ROLE}
          </Button>
        </Link>
      </div>
      <div className="m-3 border border-t-0 border-slate-300 rounded-lg overflow-auto">
        <div className="bg-white rounded-[7px]">
          <div className="flex items-center justify-end	flex-wrap w-full sticky top-0 overflow-auto z-20 bg-white p-3.5 border-y">
            <SearchField
              value={searchValue}
              placeholder={RolesPlaceholderEnum.SEARCH}
              onChange={search}
              tailwindClasses="w-[200px]"
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
          <RolesTable
            roles={roles}
            setSortConfig={setSortConfig}
            sortConfig={sortConfig}
            refetch={refetch}
            totalItems={totalItems}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        {totalItems > 0 && (
          <div className="text-slate-400 pl-3">
            {RolesEnum.SHOWING} {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{' '}
            {RolesEnum.ENTRIES}
          </div>
        )}
        {totalItems > 0 && (
          <div className="flex items-center">
            <div className="pageSize pb-2">
              <PageSizeSelect
                options={pageSizeOptions}
                defaultValue={pageSize}
                onChange={handlePageSizeChange}
              />
            </div>
            <div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
                changePage={changePage}
                rolesLength={totalItems}
                buttonTitles={ButtonTitleEnum}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Roles;
