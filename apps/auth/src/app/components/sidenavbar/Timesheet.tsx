import React from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { CalendarMonthIcon, EventAvailableIcon } from '../../../assets/icons';
import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

const TimeSheet = ({
  isOpen,
  handleMenuClick,
}: {
  isOpen: boolean;
  handleMenuClick: () => void;
}) => {
  const iconStyle: CSSProperties = {
    display: 'inline-block',
    font: 'normal normal normal 14px / 1 FontAwesome',
    fontSize: '18px',
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
        <ListItemText primary="Timesheet" className="text-customGrey" />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit className="w-full">
        <List component="div" disablePadding>
          <ListItemButton
            disableRipple
            className="w-full px-4 group-item"
            component={Link}
            to={'timesheet/edit-view'}
          >
            <div className="hover:bg-[#cae2ff] flex items-center w-full px-2 rounded py-1.5">
              <ListItemIcon>
                <EventAvailableIcon style={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="Edit/View" />
            </div>
          </ListItemButton>
          <ListItemButton
            disableRipple
            className="w-full px-4 group-item"
            component={Link}
            to={'timesheet/schedules'}
          >
            <div className="hover:bg-[#cae2ff] flex items-center w-full px-2 rounded py-1.5">
              <ListItemIcon>
                <CalendarMonthIcon style={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="Schedules" />
            </div>
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};
export default TimeSheet;
