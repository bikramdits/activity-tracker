import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { AddPeople } from '../enums/PeopleEnums';
import { useGetRoleById } from '../../hooks/useUsers';
import { Permissions } from '../../types/usersTypes';

type Props = {
  roleId: string;
};
const UserPermessions = ({ roleId }: Props) => {
  const id = roleId;
  const { data, isLoading, error } = useGetRoleById(id);
  const role: Permissions[] =
    typeof data?.data?.role?.permission === 'string'
      ? JSON.parse(data?.data?.role?.permission)
      : data?.data?.role?.permission;
  if (isLoading) {
    return <div>{AddPeople.LOADING}</div>;
  }
  if (error) {
    return <div className="text-red-500">{AddPeople.ERROR_MSG}</div>;
  }

  return (
    <TableContainer component={Paper} className="min-h-[200px] h-auto w-full ">
      <Table sx={{ minWidth: 500 }} aria-label="custom table" className="p-4">
        <TableHead className="border border-slate-300 border-l-0 border-r-0 ">
          <TableRow className="bg-slate-50 border-t-0">
            <TableCell className="relative">
              <div className="md:font-bold">
                {AddPeople.SCREEN}
                <ArrowDropUpIcon className="top-[15px] absolute cursor-pointer" />
                <ArrowDropDownIcon className="absolute top-[21px] cursor-pointer" />
              </div>
            </TableCell>

            <TableCell>
              <div className="md:font-bold">{AddPeople.PERMESSIONS}</div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="border-t border border-none">
          {/* {role?.activityManagement?.name} */}
          {role &&
            role.length > 0 &&
            Object.entries(role[0]).map(([key, prmsn]) => {
              console.log({ key, prmsn });

              const isReadable = prmsn.read;
              const isWriteable = prmsn.write;

              const colorFlagRead = isReadable ? 'bg-green-600' : 'bg-red-600';
              const colorFlagWrite = isWriteable
                ? 'bg-green-600'
                : 'bg-red-600';
              return (
                <TableRow key={key}>
                  <TableCell sx={{ border: 'none' }}>{prmsn.name}</TableCell>
                  <TableCell sx={{ border: 'none', columnGap: 1 }}>
                    <button
                      className={`${colorFlagRead} text-slate-100 rounded-2xl py-0.5 px-2`}
                    >
                      <span className="flex items-center justify-center gap-2 text-xs font-semibold">
                        {isReadable ? (
                          <DoneRoundedIcon className="!w-5 !h-5" />
                        ) : (
                          <CloseRoundedIcon className="!w-5 !h-5" />
                        )}
                        {AddPeople.READ}
                      </span>
                    </button>
                    <button
                      className={`${colorFlagWrite} text-slate-100 rounded-2xl py-0.5 px-2`}
                    >
                      <span className="flex items-center justify-center gap-2 text-xs font-semibold">
                        {isWriteable ? (
                          <DoneRoundedIcon className="!w-5 !h-5" />
                        ) : (
                          <CloseRoundedIcon className="!w-5 !h-5" />
                        )}
                        {AddPeople.WRITE}
                      </span>
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserPermessions;
