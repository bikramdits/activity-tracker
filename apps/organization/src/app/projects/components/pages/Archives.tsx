import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  Paper,
} from '@mui/material';
import { AllProjectResponse, Project } from '../../../types/projectsTypes';
import { AddProjectEnum, ProjectEnum } from '../../enums/ProjectEnum';
import {
  ArrowDropDownIcon,
  ArrowDropUpIcon,
  deleteImg,
} from '@appname/assets';
import ClearIcon from '@mui/icons-material/Clear';

import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import {
  useDeleteProjects,
  useUpdateArchive,
} from '../../../hooks/useProjects';
import { DeleteConfirmModal, DeleteModal, showToast } from '@appname/ui';
import { useState } from 'react';
import { ActionButtons } from '@appname/components';
type Props = {
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<AllProjectResponse, Error>>;
  archiveData: Project[];
  setProjectData: React.Dispatch<React.SetStateAction<Project[]>>;
  sortConfig: SortConfig;
  totalItems: number;
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>;
  setDeleteProject: React.Dispatch<React.SetStateAction<boolean>>;
};

type SortConfig = {
  key: keyof Project;
  direction: string;
};

const Archives = ({
  setSortConfig,
  sortConfig,
  archiveData,
  refetch,
}: Props) => {
  const { mutateAsync: updateArchive } = useUpdateArchive();

  // const { data,  } = useGetAllProjects({
  //   sortOrder: sortConfig.direction,
  //   sortBy: sortConfig.key,
  //   isArchive: true,
  // });

  const [unArchiveModalOpen, setUnArchivedModalOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [updateProjectId, setUpdateProjectId] = useState<string>('');
  const [deleteProjectId, setDeleteProjectId] = useState<string | undefined>();
  const { mutateAsync } = useDeleteProjects();
  const deleteProject = (id: string) => {
    setDeleteProjectId(id);
    setModalOpen(true);
  };
  /************************** Function to close the deletion confirmation modal ***********************************/

  const closeModal = () => {
    setModalOpen(false);
    setUnArchivedModalOpen(false);
  };
  /*********************************** Function to handle sorting of projects ***************************/

  const handleSort = (key: keyof Project) => {
    setSortConfig((prevSortConfig) => {
      let direction: ProjectEnum.ASC | ProjectEnum.DESC = ProjectEnum.ASC;
      if (
        prevSortConfig &&
        prevSortConfig.key === key &&
        prevSortConfig.direction === ProjectEnum.ASC
      ) {
        direction = ProjectEnum.DESC;
      }
      return { key, direction };
    });
  };

  /****************************Function to delete project ***************************/

  const deleteProjectById = async () => {
    if (deleteProjectId) {
      setModalOpen(false);
      const response = await mutateAsync(deleteProjectId);
      if (response.statusCode === 200) {
        showToast(response?.message, 'success');
        refetch();
      } else {
        showToast(response.errorRes, 'error');
      }
    }
  };

  const convertToDate = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleDateString();
  };

  const handleUnArchive = (id: string) => {
    setUnArchivedModalOpen(true);
    setUpdateProjectId(id);
  };

  const updateByProject = async () => {
    setUnArchivedModalOpen(true);
    const updatedValue = {
      isArchive: false,
    };

    const response = await updateArchive({
      id: updateProjectId,
      formValues: updatedValue,
    });
    if (response) {
      showToast('Project un-archived successfully.', 'success');
    }
    refetch();
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: '630px', overflowY: 'auto' }}
      >
        <Table className="w-full text-left bg-white" aria-label="simple table">
          <TableHead className="bg-gray-50 sticky z-10 top-0  ">
            <TableRow className="w-full">
              <TableCell className="relative !text-sm !font-semibold w-1/5  ">
                {ProjectEnum.PROJECT_NAME}
                {sortConfig?.direction === ProjectEnum.ASC &&
                sortConfig?.key === ProjectEnum.NAME ? (
                  <ArrowDropUpIcon
                    className="top-[14px] absolute cursor-pointer"
                    onClick={() => handleSort(ProjectEnum.NAME)}
                  />
                ) : sortConfig?.direction === ProjectEnum.DESC &&
                  sortConfig?.key === ProjectEnum.NAME ? (
                  <ArrowDropDownIcon
                    className="absolute top-[20px] cursor-pointer"
                    onClick={() => handleSort(ProjectEnum.NAME)}
                  />
                ) : (
                  <>
                    <ArrowDropUpIcon
                      className="top-[14px] absolute cursor-pointer"
                      onClick={() => handleSort(ProjectEnum.NAME)}
                    />
                    <ArrowDropDownIcon
                      className="absolute top-[20px] cursor-pointer"
                      onClick={() => handleSort(ProjectEnum.NAME)}
                    />
                  </>
                )}
              </TableCell>
              <TableCell className="text-sm !font-semibold  w-1/5">
                {AddProjectEnum.PROJECT_CODE}
              </TableCell>
              <TableCell className="relative !text-sm !font-semibold w-1/5">
                {ProjectEnum.CLIENT}
                {sortConfig?.direction === ProjectEnum.ASC &&
                sortConfig?.key === AddProjectEnum.CLIENT_ID ? (
                  <ArrowDropUpIcon
                    className="top-[14px] absolute cursor-pointer"
                    onClick={() => handleSort(AddProjectEnum.CLIENT_ID)}
                  />
                ) : sortConfig?.direction === ProjectEnum.DESC &&
                  sortConfig?.key === AddProjectEnum.CLIENT_ID ? (
                  <ArrowDropDownIcon
                    className="absolute top-[20px] cursor-pointer"
                    onClick={() => handleSort(AddProjectEnum.CLIENT_ID)}
                  />
                ) : (
                  <>
                    <ArrowDropUpIcon
                      className="top-[14px] absolute cursor-pointer"
                      onClick={() => handleSort(AddProjectEnum.CLIENT_ID)}
                    />
                    <ArrowDropDownIcon
                      className="absolute top-[20px] cursor-pointer"
                      onClick={() => handleSort(AddProjectEnum.CLIENT_ID)}
                    />
                  </>
                )}
              </TableCell>
              <TableCell className="text-sm !font-semibold  w-1/5">
                Created At
              </TableCell>
              <TableCell className="text-sm !font-semibold  w-1/5">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {archiveData?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  sx={{
                    textAlign: 'center',
                    fontSize: '22px',
                    fontWeight: '700',
                  }}
                >
                  {ProjectEnum.NO_RECORDS}
                </TableCell>
              </TableRow>
            ) : (
              archiveData?.map((item, id) => (
                <TableRow key={id}>
                  <TableCell sx={{ border: 'none', display: 'flex' }}>
                    {item.name}
                  </TableCell>
                  <TableCell sx={{ border: 'none' }}>{item?.code}</TableCell>
                  <TableCell sx={{ border: 'none' }}>
                    {item?.client?.organizationName}
                  </TableCell>
                  <TableCell sx={{ border: 'none' }}>
                    {convertToDate(item.startDate)}
                  </TableCell>
                  <TableCell className="flex space-x-2" sx={{ border: 'none' }}>
                    <ActionButtons
                      itemId={item.id}
                      handleUnArchive={handleUnArchive}
                      handleDeleteClick={deleteProject}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
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
            onConfirm={deleteProjectById}
            deleteIcon={deleteImg}
            message="Do you really want to delete this project?"
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
            onConfirm={updateByProject}
            deleteIcon={deleteImg}
            message="Do you really want to un-archive this project?"
            deleteButtonText="Unarchive"
          />
        </DeleteModal>
      )}
    </>
  );
};
export default Archives;
