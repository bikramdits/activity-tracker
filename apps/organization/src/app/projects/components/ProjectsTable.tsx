import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from '@mui/material';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { deleteImg } from '@appname/assets';
import { Project } from '../../types/projectsTypes';
import { useState } from 'react';
import { useDeleteProjects, useUpdateArchive } from '../../hooks/useProjects';
import DeleteModal from '../components/modal/DeleteConfirmation';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import { AddProjectEnum, ProjectEnum } from '../enums/ProjectEnum';
import { DeleteConfirmModal, Loader, showToast } from '@appname/ui';
import { ActionButtons } from '@appname/components';

type SortConfig = {
  key: keyof Project;
  direction: string;
};

type Props = {
  projectData: Project[];
  setProjectData: React.Dispatch<React.SetStateAction<Project[]>>;
  sortConfig: SortConfig;
  totalItems: number;
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>;
  setDeleteProject: React.Dispatch<React.SetStateAction<boolean>>;
  refetch?: any;
  isLoading: boolean;
};

const ProjectsTable = ({
  projectData,
  setSortConfig,
  sortConfig,
  refetch,
  isLoading,
}: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [deleteProjectId, setDeleteProjectId] = useState<string | undefined>();
  const [archiveProjectId, setArchiveProjectId] = useState<
    string | undefined
  >();
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState<boolean>(false);
  const { mutateAsync } = useDeleteProjects();
  const navigate = useNavigate();
  const { mutateAsync: mutateAsync1 } = useUpdateArchive();
  const deleteProject = (id: string) => {
    setDeleteProjectId(id);
    setModalOpen(true);
  };
  const archiveProject = (id: string) => {
    setArchiveProjectId(id);
    setModalOpen(true);
    setIsArchiveModalOpen(true);
  };
  /************************** Function to close the deletion confirmation modal ***********************************/

  const closeModal = () => {
    setModalOpen(false);
    setIsArchiveModalOpen(false);
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
      } else {
        showToast(response.errorRes, 'error');
      }
      refetch();
    }
  };

  const convertToDate = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleDateString();
  };
  /**************************************** Function to navigate to the edit project page *************************/

  const editProject = (id: string) => {
    navigate(`edit-project/${id}`);
  };

  const archiveProjectById = async () => {
    const updatedValue = {
      isArchive: true,
    };

    const response = await mutateAsync1({
      id: archiveProjectId,
      formValues: updatedValue,
    });
    if (response) {
      showToast('Project archived successfully.', 'success');
      refetch();
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: '630px', overflowY: 'auto' }}
      >
        <Table className="w-full text-left bg-white" aria-label="simple table">
          <TableHead className=" bg-gray-50 sticky z-10 top-0 ">
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
              <TableCell className="relative !text-sm !font-semibold w-1/5 ">
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
              <TableCell className="relative !text-sm !font-semibold w-1/5">
                Created At
              </TableCell>
              <TableCell className="!text-sm !font-semibold">
                {ProjectEnum.ACTION}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  sx={{
                    textAlign: 'center',
                    fontSize: '22px',
                    fontWeight: '700',
                  }}
                >
                  <div className="flex justify-center items-center">
                    <Loader />
                  </div>
                </TableCell>
              </TableRow>
            ) : projectData && projectData.length > 0 ? (
              projectData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ border: 'none', display: 'flex' }}>
                    {item.name}
                  </TableCell>
                  <TableCell sx={{ border: 'none' }}>{item.code}</TableCell>
                  <TableCell sx={{ border: 'none' }}>
                    {item?.client?.organizationName}
                  </TableCell>
                  <TableCell sx={{ border: 'none' }}>
                    {convertToDate(item.startDate)}
                  </TableCell>
                  <TableCell className="flex space-x-2" sx={{ border: 'none' }}>
                    <ActionButtons
                      itemId={item.id}
                      handleEditClick={editProject}
                      handleArchive={archiveProject}
                      handleDeleteClick={deleteProject}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
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

      {isArchiveModalOpen && (
        <DeleteModal>
          <div
            className="text-right text-gray-500 pr-3 cursor-pointer mt-[10px]"
            onClick={closeModal}
          >
            <ClearIcon className="text-[30px]" />
          </div>
          <DeleteConfirmModal
            close={closeModal}
            onConfirm={archiveProjectById}
            deleteIcon={deleteImg}
            message="Do you really want to archive this project?"
            deleteButtonText="Archive"
          />
        </DeleteModal>
      )}
    </>
  );
};

export default ProjectsTable;
