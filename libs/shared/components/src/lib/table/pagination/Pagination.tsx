import React from 'react';
import Stack from '@mui/material/Stack';
import MuiPagination from '@mui/material/Pagination';

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  changePage: (event: React.ChangeEvent<unknown>, page: number) => void;
  rolesLength: number;
  buttonTitles: { PREVIOUS: string; NEXT: string };
}

const Pagination: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
  changePage,
  rolesLength,
  buttonTitles,
}) => {
  return (
    <Stack direction="row" justifyContent="center" mb={1}>
      <button
        className={`bg-inherit text-customDeeperSkyBlue cursor-pointer border-none py-1 px-3 ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-[#3c59d4]'
        }`}
        onClick={handlePreviousPage}
        disabled={rolesLength === 0 || currentPage === 1}
      >
        {buttonTitles.PREVIOUS}
      </button>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={changePage}
        variant="outlined"
        className="!border-0"
        sx={{
          '.Mui-selected': {
            backgroundColor: '#3c59d4',
            color: 'white',
          },
          '.MuiPaginationItem-root': {
            '&.Mui-selected': {
              backgroundColor: '#3c59d4',
            },
          },
        }}
      />
      <button
        className={`bg-inherit cursor-pointer border-none py-1 px-3 ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-[#3c59d4]'
        }`}
        disabled={currentPage === totalPages}
        onClick={handleNextPage}
      >
        {buttonTitles.NEXT}
      </button>
    </Stack>
  );
};

export default Pagination;
