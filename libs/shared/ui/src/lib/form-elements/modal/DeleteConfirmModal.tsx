import React from 'react';
import Button from '../Button';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import UnarchiveIcon from '@mui/icons-material/Unarchive';

interface ConfirmationModalContentProps {
  close: () => void;
  deleteIcon: string;
  onConfirm: (e: boolean) => void;
  message: string;
  deleteButtonText: string;
}

export const DeleteConfirmModal: React.FC<ConfirmationModalContentProps> = ({
  close,
  onConfirm,
  deleteIcon,
  message,
  deleteButtonText,
}) => {
  const buttonStyle =
    deleteButtonText === 'Delete'
      ? '!bg-[#F66860]' // Red background for "Delete"
      : deleteButtonText === 'Archive' || deleteButtonText === 'Unarchive'
      ? '!bg-blue-500' // Blue background for "Archive" and "Unarchive"
      : '';

  const handleConfirm = () => {
    onConfirm(true);
    close();
  };

  return (
    <div className="w-[383px] h-[300px] rounded-[14px]">
      <div className="flex justify-center">
        {deleteButtonText === 'Delete' ? (
          <img
            src={deleteIcon}
            className="h-[75px] w-[94px]"
            alt="delete_img"
          />
        ) : deleteButtonText === 'Archive' ? (
          <Inventory2Icon className="!text-[70px] text-blue-500" />
        ) : (
          <UnarchiveIcon className="!text-[70px] text-blue-500" />
        )}
      </div>
      <p className="text-center text-xl font-bold">Are you sure</p>
      <div className="flex w-full justify-center">
        <div className="text-sm font-medium w-[322px] text-center">
          {message}
        </div>
      </div>
      <div className="flex justify-center pb-2 deleteButton">
        <Button
          tailwindClasses={`!w-[315px] !h-[40px] !rounded-[5px] !mt-[30px] ${buttonStyle} !text-[#FFFFFF]`}
          onClick={handleConfirm}
        >
          {deleteButtonText}
        </Button>
      </div>
      <div className="flex justify-center cancelButton">
        <Button
          color="primary"
          tailwindClasses="!w-[315px] h-[40px] !rounded-[5px] !mt-[10px] !bg-[#DDDDDD] !text-[#5A5A5A]"
          onClick={close}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
