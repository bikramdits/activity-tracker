import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';

import {
  EditIcon,
  UnArchiveIcon,
  DeleteIcon,
  ArchiveIcon,
} from '@appname/assets';

interface PlaybookName {
  name: string | null;
  Image: string;
}

interface UserData {
  Playbook_Name: PlaybookName;
  Department: string;
  Client: string;
  Primary_Assignee: string;
  Secondary_Assignee: string;
}

interface TabletwoProps {
  data: UserData[];
  isArchive?: boolean;
  permessions?: boolean;
  targetColumnIndex?: number;
  onCellClick?: (rowIndex: number, cellValue: string) => void;
}

const UserProfileTable: React.FC<TabletwoProps> = ({
  data,
  isArchive,
  permessions,
  targetColumnIndex,
  onCellClick,
}) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  if (data.length === 0) return null;

  const headers = Object.keys(data[0]);

  return (
    <TableContainer component={Paper} className="min-h-[200px] h-auto w-full ">
      <Table sx={{ minWidth: 500 }} aria-label="custom table" className="p-4">
        <TableHead className="border border-slate-300 border-l-0 border-r-0 ">
          <TableRow className="bg-slate-50 border-t-0">
            {headers.map((header) => (
              <TableCell key={header} className="relative">
                <div className="md:font-bold">
                  {header}
                  <ArrowDropUpIcon className="top-[15px] absolute cursor-pointer" />
                  <ArrowDropDownIcon className="absolute top-[21px] cursor-pointer" />
                </div>
              </TableCell>
            ))}
            <TableCell>
              {permessions ? (
                <div className="md:font-bold">Permessions</div>
              ) : (
                <div className="md:font-bold">Action</div>
              )}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="border-t border border-none">
          {data
            .slice((page - 1) * rowsPerPage, page * rowsPerPage)
            .map((row: UserData, rowIndex: number) => (
              <TableRow key={rowIndex}>
                {headers.map((header, columnIndex) => {
                  const cellValue = row[header as keyof UserData];
                  return (
                    <TableCell
                      key={`${rowIndex}-${header}`}
                      sx={{ borderBottom: 'none' }}
                      className={`p-6 ${
                        columnIndex === targetColumnIndex
                          ? 'cursor-pointer'
                          : ''
                      }`}
                      onClick={() =>
                        columnIndex === targetColumnIndex && onCellClick
                          ? onCellClick(rowIndex, cellValue as string)
                          : null
                      }
                    >
                      {header === 'Playbook_Name' &&
                      typeof cellValue === 'object' ? (
                        <div className="flex gap-1">
                          <img
                            src={(cellValue as PlaybookName).Image}
                            alt="Profile"
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                            }}
                          />
                          <p className="mt-3 text-[#3c59d4]">
                            {(cellValue as PlaybookName).name}
                          </p>
                        </div>
                      ) : (
                        (cellValue as string)
                      )}
                    </TableCell>
                  );
                })}
                <TableCell sx={{ border: 'none' }}>
                  <>
                    <EditIcon
                      className="p-2"
                      onClick={() => alert('Edit action')}
                      sx={{ color: '#3c59d4', fontSize: '40px' }}
                    />
                    {isArchive ? (
                      <UnArchiveIcon
                        className="p-2"
                        onClick={() => alert('Unarchive action')}
                        style={{ color: '#3c59d4', fontSize: '40px' }}
                      />
                    ) : (
                      <ArchiveIcon
                        className="p-2"
                        onClick={() => alert('Archive action')}
                        style={{ color: '#3c59d4', fontSize: '40px' }}
                      />
                    )}
                    <DeleteIcon
                      className="p-2"
                      onClick={() => alert('Delete action')}
                      style={{ color: '#3c59d4', fontSize: '40px' }}
                    />
                  </>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserProfileTable;
