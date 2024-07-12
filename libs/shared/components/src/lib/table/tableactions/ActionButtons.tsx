import React from 'react';
import { Tooltip } from '@mui/material';
import { ArchiveIcon, DeleteIcon, EditIcon, UnArchiveIcon } from '@appname/assets';

interface ActionButtonsCellProps {
  itemId: string;
  handleEditClick?: (itemId: string) => void;
  handleArchive?: (itemId: string) => void;
  handleUnArchive?: (itemId: string) => void;
  handleDeleteClick: (itemId: string) => void;
}
const ActionButtons: React.FC<ActionButtonsCellProps> = ({
  itemId,
  handleEditClick,
  handleArchive,
  handleUnArchive,
  handleDeleteClick,
}) => { 
  const handleClickEdit = () => {
    if (handleEditClick) {
      handleEditClick(itemId);
    }
  };
  const handleArchiveClick = () => {
    if (handleArchive) {
        handleArchive(itemId);
    }
  }; const handleUnArchiveClick = () => {
    if (handleUnArchive) {
      handleUnArchive(itemId);
    }
  };
  return (
    <>    
      {handleEditClick   && (

      <Tooltip title="Edit">
        <EditIcon
          sx={{
            color: '#3c59d4',
            marginLeft: '5px',
            fontSize: '18px',
            cursor: 'pointer',
          }}
          onClick={handleClickEdit}
        />
      </Tooltip>
      )}
      {handleArchive && (
      <Tooltip title="Archive">
        <ArchiveIcon
          sx={{
            color: '#3c59d4',
            marginLeft: '5px',
            fontSize: '18px',
            cursor: 'pointer',
          }}
          onClick={handleArchiveClick}
        />
      </Tooltip>
        )}
      {handleUnArchive && (
        <Tooltip title="UnArchive">
          <UnArchiveIcon
            sx={{
              color: '#3c59d4',
              marginLeft: '5px',
              fontSize: '18px',
              cursor: 'pointer',
            }}
            onClick={handleUnArchiveClick}
          />
        </Tooltip>
      )}
      <Tooltip title="Delete">
        <DeleteIcon
          sx={{
            color: '#3c59d4',
            marginLeft: '5px',
            fontSize: '18px',
            cursor: 'pointer',
          }}
          onClick={() => handleDeleteClick(itemId)}
        />
      </Tooltip>
    </>
  );
};

export default ActionButtons;
