
// import { PaginationItem, Stack, Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import AddIcon from '@mui/icons-material/Add';
// // import RolesTable from './RolesTable';
// import Pagination from '@mui/material/Pagination';
// import { Button, SearchField, MultipleSelect } from '@appname/ui';

// import { useNavigate } from 'react-router-dom';

// interface TableRow {
//     name: string;
//     calories: string;
// }

// export const Roles = () => {
//     const [tableData, setTableData] = useState<TableRow[]>([]);
//     const [searchValue, setSearchValue] = useState<string>('');
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [sortedData, setSortedData] = useState<TableRow[]>([]);
//     const [sortConfig, setSortConfig] = useState<{
//         key: keyof TableRow;
//         direction: string;
//     } | null>(null);
//     const navigate = useNavigate();

//     function createData(name: string, calories: string): TableRow {
//         return { name, calories };
//     }

//     const rows: TableRow[] = [
//         createData('Admin123', 'Full System Access'),
//         createData('Admin', 'Full System Access'),
//         createData('Team Lead', 'Full System Access'),
//         createData('Team Member', 'Full System Access'),
//         createData('Manager', 'Full System Access'),
//         createData('Department Administrator', 'Full System Access3'),
//         createData('Super user', 'Full System Access1'),
//     ];


//     const DepartmentOptions = ['Accounting & Bookkeeping', 'HIPPA Compliance', 'Medical Billing'];
//     const ClientOptinos = ['Mediwise Services', 'APPNAME'];
//     const ProjectOptions = ['Supply Chain Audit', 'Embedded Care Management'];
//     const ManagerOptions = ['Kevin Peter', 'Hamisha Marshall', 'Travor Borris']
//     const itemsPerPage = 2;

//     const handleChangePage = (
//         _event: React.ChangeEvent<unknown>,
//         page: number
//     ) => {
//         setCurrentPage(page);
//     };

//     useEffect(() => {
//         const sortedRows = [...rows];

//         if (sortConfig !== null) {
//             sortedRows.sort((a, b) => {
//                 if (a[sortConfig.key] < b[sortConfig.key]) {
//                     return sortConfig.direction === 'ascending' ? -1 : 1;
//                 }
//                 if (a[sortConfig.key] > b[sortConfig.key]) {
//                     return sortConfig.direction === 'ascending' ? 1 : -1;
//                 }
//                 return 0;
//             });
//         }

//         setSortedData(sortedRows);
//     }, [sortConfig, rows]);

//     useEffect(() => {
//         const filteredData = sortedData.filter((row) =>
//             row.name.toLowerCase().includes(searchValue.toLowerCase())
//         );

//         const paginatedData = filteredData.slice(
//             (currentPage - 1) * itemsPerPage,
//             currentPage * itemsPerPage
//         );

//         setTableData(paginatedData);
//     }, [sortedData, searchValue, currentPage]);

//     const searchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchValue(e.target.value);
//         setCurrentPage(1);
//     };

//     const handlePreviousPage = () => {
//         setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
//     };

//     const handleNextPage = () => {
//         setCurrentPage((prevPage) => Math.max(prevPage + 1, 1));
//     };
//     return (
//         <div className="bg-customGrey pb-2">
//             <div className="flex justify-between p-3">
//                 <Typography variant="h5" component="h5" className="text-[26px]">
//                     People
//                 </Typography>
//                 <div className="newRole">
//                     <Button
//                         sx={{
//                             border: '1px solid #0070fa',
//                         }}
//                         tailwindClasses="!text-[#3c59d4] !bg-[#FFFFFF] !text-[15px] !capitalize !shadow-none !cursor-pointer !font-medium !leading-6.4 !py-[8px] !px-[11px] !gap-1"
//                         onClick={() => navigate('/add-role')}
//                     >
//                         <AddIcon />
//                         New People
//                     </Button>
//                 </div>
//             </div>
//             <div className="m-3 border border-slate-300 rounded-lg">
//                 <div className="bg-customWhite flex justify-between items-center rounded-[7px] flex-wrap overflow-auto">
//                     <div className="flex gap-5 snap-x py-4 pt-sm-0 px-3">
//                     </div>
//                     <SearchField
//                         value={searchValue}
//                         placeholder="Search"
//                         onChange={searchChange}
//                         tailwindClasses="w-[200px] !px-3 !py-4"
//                         sx={{
//                             backgroundColor: 'white',
//                             borderRadius: '8px',
//                             '.MuiOutlinedInput-root': {
//                                 paddingRight: '0',
//                                 height: '44px',
//                             },
//                             '.MuiOutlinedInput-notchedOutline': {
//                                 borderColor: '#ced4da',
//                             },
//                             '.MuiSvgIcon-root': {
//                                 color: '#6c757d',
//                             },
//                         }}
//                     />
//                     {/* <RolesTable
//             tableData={tableData}
//             setSortConfig={setSortConfig}
//             sortConfig={sortConfig}
//           /> */}
//                 </div>
//             </div>
//             {/* <div className="flex justify-center">
//         {tableData.length > 0 && (
//           <>
//             <Stack direction="row" justifyContent="center" mt={2} mb={1}>
//               <button
//                 className={`bg-inherit text-customDeeperSkyBlue cursor-pointer border-none py-1 px-3 ${
//                   currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-customBlue'
//                 }`}
//                 onClick={handlePreviousPage}
//                 disabled={tableData?.length === 0 || currentPage === 1}
//               >
//                 Previous
//               </button>
//               <Pagination
//                 count={Math.ceil(
//                   sortedData.filter((row) =>
//                     row.name.toLowerCase().includes(searchValue.toLowerCase())
//                   ).length / itemsPerPage
//                 )}
//                 page={currentPage}
//                 onChange={handleChangePage}
//                 variant="outlined"
//                 className="!border-0"
//               />
//               <button
//                 className={`bg-inherit cursor-pointer border-none py-1 px-3 ${
//                   currentPage >=
//                   Math.ceil(
//                     sortedData.filter((row) =>
//                       row.name.toLowerCase().includes(searchValue.toLowerCase())
//                     ).length / itemsPerPage
//                   )
//                     ? 'text-gray-400 cursor-not-allowed'
//                     : ' text-customBlue'
//                 }`}
//                 disabled={
//                   currentPage >= Math.ceil(sortedData.length / itemsPerPage)
//                 }
//                 onClick={handleNextPage}
//               >
//                 Next
//               </button>
//             </Stack>
//           </>
//         )}
//       </div> */}
//         </div>
//     );
// };
// export default Roles;



