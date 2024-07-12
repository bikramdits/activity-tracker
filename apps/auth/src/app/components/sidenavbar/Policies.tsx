import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  BuildOutlinedIcon,
  EventAvailableOutlinedIcon,
  FreeBreakfastIcon,
} from '../../../assets/icons';
import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

const Policies = ({
  isOpen,
  handleMenuClick,
}: {
  isOpen: boolean;
  handleMenuClick: () => void;
}) => {
  const iconStyle: CSSProperties = {
    display: 'inline-block',
    font: 'normal normal normal 14px / 1 FontAwesome',
    fontSize: '20px',
    textRendering: 'auto',
    WebkitFontSmoothing: 'antialiased',
    color: 'black',
  };

  return (
    <>
      <ListItemButton
        className="list-item w-full px-0"
        onClick={handleMenuClick}
      >
        <ListItemText primary="Policies" className="text-customGrey" />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit className="w-full">
        <List component="div" disablePadding>
          <ListItemButton
            className="w-full px-4 group-item"
            component={Link}
            to={'policies/leaves'}
          >
            <div className="hover:bg-[#cae2ff] flex items-center w-full px-2 rounded py-1.5">
              <ListItemIcon>
                <EventAvailableOutlinedIcon style={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="Leaves" />
            </div>
          </ListItemButton>
          <ListItemButton
            className="w-full px-4 group-item"
            component={Link}
            to={'policies/tracking-policy'}
          >
            <div className="hover:bg-[#cae2ff] flex items-center w-full px-2 rounded py-1.5">
              <ListItemIcon>
                <BuildOutlinedIcon style={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="Tracking Policy" />
            </div>
          </ListItemButton>
          <ListItemButton
            className="w-full px-4 group-item"
            component={Link}
            to={'policies/work-break'}
          >
            <div className="hover:bg-[#cae2ff] flex items-center w-full px-2 rounded py-1.5">
              <ListItemIcon>
                <FreeBreakfastIcon style={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="Work Break" />
            </div>
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};
export default Policies;
