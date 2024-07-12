import React, { useState } from 'react';
import { Screenshot } from '../../types/Activitytypes';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import KeyboardAltOutlinedIcon from '@mui/icons-material/KeyboardAltOutlined';
import MouseOutlinedIcon from '@mui/icons-material/MouseOutlined';
import ProgressBar from './ProgressBar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DeleteScreenshots } from '../../hooks/UseActivity';
import { DeleteConfirmModal, DeleteModal } from '@appname/ui';
import ClearIcon from '@mui/icons-material/Clear';
import {  deleteImg } from '@appname/assets';

interface TimeContainerProps {
  screenshots: Screenshot[];
  timeRange: string;
  refetch: any;
}

const TimeContainer: React.FC<TimeContainerProps> = ({ screenshots: initialScreenshots, timeRange, refetch }) => {
  const deleteScreenshotMutation = DeleteScreenshots();
  const [screenshots, setScreenshots] = useState<Screenshot[]>(initialScreenshots);
  const [open, setOpen] = useState(false);
  const [selectedScreenshotId, setSelectedScreenshotId] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleClickOpen = (id: string) => {
    setSelectedScreenshotId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedScreenshotId(null);
  };

  const handleDelete = async () => {
    if (selectedScreenshotId) {
      try {
        await deleteScreenshotMutation.mutateAsync(selectedScreenshotId);
        setScreenshots(screenshots.filter(screenshot => screenshot.id !== selectedScreenshotId));
        handleClose();
        refetch();
      } catch (error) {
        console.log('error');
      }
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? screenshots.length - 1 : prev - 0 ));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="p-4 bg-white sticky top-2">
        <div className="relative flex items-center" >
          <button onClick={prevSlide} className="absolute -ml-5 left-0 z-10 bg-white p-2 rounded-full shadow-md">
            {'<'}
          </button>
          <div className="flex overflow-hidden w-full -ml-9">
            {screenshots.slice(currentSlide, currentSlide + 4).map((screenshot, index) => (
              <Card key={index} className="w-72  bg-white m-2 rounded hover:shadow-2xl relative left-8 ">
                <DeleteOutlineIcon
                  sx={{ color: 'red' }}
                  className="absolute top-6 mr-4 right-2 z-10  cursor-pointer bg-white rounded"
                  onClick={() => handleClickOpen(screenshot.id)}
                />
                <div className="text-end p-2">  
                  <img
                    src={`${screenshot.image}`}
                    className="scale-100"
                    alt=""
                    style={{ width: '250px', height: '200px' }}
                  />
                </div>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '20px',
                      color: 'black',
                    }}
                  >
                    {timeRange}
                  </Typography>
                  <div className="flex">
                    <Tooltip title="Keyboard" placement="right">
                      <KeyboardAltOutlinedIcon sx={{ fontSize: '20px', color: 'gray' }} />
                    </Tooltip>
                    <div className="-mt-5 ml-2">
                      <ProgressBar height={13} value={85} width={70} background={'#198754'} />
                    </div>
                  </div>
                  <div className="flex ml-28 -mt-6">
                    <Tooltip title="Mouse" placement="right">
                      <MouseOutlinedIcon sx={{ fontSize: '20px', color: 'gray' }} className="mt-1" />
                    </Tooltip>
                    <div className="-mt-4 ml-2">
                      <ProgressBar height={13} value={70} width={70} background={'#198754'} />
                    </div>
                  </div>
                  <Typography
                    className="relative top-5 w-96 h-20"
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{
                      fontWeight: 'bold',
                      color: 'black',
                      fontSize: '17px',
                    }}
                  >
                    Total Activity
                  </Typography>
                  <div className="-mt-12">
                    <ProgressBar height={17} value={90} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <button onClick={nextSlide} className="absolute right-0 z-10 ml-14 bg-white p-2 rounded-full shadow-md">
            {'>'}
          </button>
        </div>
      </div>

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
          onConfirm={handleDelete}
          deleteIcon={deleteImg}
          message="Do you really want to delete this?"
          
          deleteButtonText='Delete'
        />
      </DeleteModal>
    )}
    </>
  );
};

export default TimeContainer;
