import React from 'react';
// import deleteImage from '../../../../assets/images/delete.png'
import { Button } from '@appname/ui';
interface ConfirmationModalContentProps {
  close: () => void;
  deleteProjectById:(e:any)=>void
}

const DeleteConfirmationModal: React.FC<ConfirmationModalContentProps> = ({
  close,deleteProjectById
}) => {

  const deleteProject=()=>{
    deleteProjectById(true);
    close();
    
  }

  return (
    <div className="w-[383px] h-[300px] rounded-[14px]">
      <div className="flex justify-center">
        {/* <img src={deleteImage} className="h-[75px] w-[94px]" alt="delete_img" /> */}
      </div>
      <p className="text-center text-xl font-bold">Are you sure</p>
      <div className="flex w-full justify-center">
        <div className="text-sm font-medium w-[322px] text-center">
          you want to delete this project?
        </div>
      </div>
      <div className="flex justify-center pb-2 deleteButton">
        <Button tailwindClasses="!w-[315px] !h-[40px] !rounded-[5px] !mt-[30px] !bg-[#F66860] !text-[#FFFFFF]" onClick={deleteProject}>
          Delete
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

export default DeleteConfirmationModal;
