import React from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  tableCellClasses,
} from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface TableProps {
  data: Array<{ [key: string]: any }>;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Table: React.FC<TableProps> = ({ data }) => {
  const headers = Object.keys(data[0]);
  return (
    <TableContainer component={Paper} className="min-h-[200px]  h-auto">
      <MuiTable
        sx={{ minWidth: 500 }}
        aria-label="custom table"
        className="p-4"
      >
        <TableHead>
          <TableRow className="bg-slate-50 border-t-0">
            {headers.map((header) => (
              <StyledTableCell key={header} className="relative">
                <div>
                  {header.toUpperCase()}
                  <ArrowDropUpIcon className="top-[15px] absolute cursor-pointer" />
                  <ArrowDropDownIcon className="absolute top-[21px] cursor-pointer" />
                </div>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="border-t">
              {headers.map((header, index) => (
                <TableCell
                  key={`${rowIndex}-${index}`}
                  sx={{ borderBottom: 'none' }}
                  className="p-6"
                >
                  {row[header]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
