import React, { CSSProperties } from 'react';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  HourglassBottomIcon,
  HourglassFullIcon,
  TextSnippetOutlinedIcon,
} from '../../../assets/icons';
import { Link } from 'react-router-dom';

const Report = ({
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
        <ListItemText primary="Reports" className="text-customGrey" />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit className="w-full">
        <List component="div" disablePadding>
          <ListItemButton
            disableRipple
            className="w-full px-4 group-item"
            component={Link}
            to={'reports/reports-module'}
          >
            <div className="hover:bg-[#cae2ff] flex items-center w-full px-2 rounded py-1.5">
              <ListItemIcon>
                <HourglassFullIcon style={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </div>
          </ListItemButton>
          <ListItemButton
            disableRipple
            className="w-full px-4 group-item"
            component={Link}
            to={'reports/time-activity'}
          >
            <div className="hover:bg-[#cae2ff] flex items-center w-full px-2 rounded py-1.5">
              <ListItemIcon>
                <HourglassBottomIcon style={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="Time & Activity" />
            </div>
          </ListItemButton>
          <ListItemButton
            disableRipple
            className="w-full px-4 group-item"
            component={Link}
            to={'reports/daily-weekl-lmt'}
          >
            <div className="hover:bg-[#cae2ff] flex items-center w-full px-2 rounded py-1.5">
              <ListItemIcon>
                <TextSnippetOutlinedIcon style={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="Day and Weekly Lmt" />
            </div>
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};
export default Report;
