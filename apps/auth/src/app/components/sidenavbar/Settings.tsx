import { ExpandLess, ExpandMore } from '@mui/icons-material';

import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  AssignmentIndOutlinedIcon,
  CampaignIcon,
  DescriptionIcon,
  LockIcon,
  PieChartIcon,
  RoomIcon,
  SettingsSuggestIcon,
} from '../../../assets/icons';
import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

const Settings = ({
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
        <ListItemText primary="Setting" className="text-customGrey" />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit className="w-full">
        <List>
          <ListItemButton
            disableRipple
            className="w-full px-4 group-item"
            component={Link}
            to={'settings/system-default'}
          >
            <div className="hover:bg-[#cae2ff] flex items-center w-full px-2 rounded py-1.5">
              <ListItemIcon>
                <SettingsSuggestIcon style={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="System Default" />
            </div>
          </ListItemButton>
          <ListItemButton
            disableRipple
            className="w-full px-4 group-item"
            component={Link}
            to={'settings/kpi-label'}
          >
            <div className="hover:bg-[#cae2ff] flex items-center w-full px-2 rounded py-1.5">
              <ListItemIcon>
                <PieChartIcon style={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="KPI Label" />
            </div>
          </ListItemButton>
          <ListItemButton
            disableRipple
            className="w-full px-4 group-item"
            component={Link}
            to={'settings/locations'}
          >
            <div className="hover:bg-[#cae2ff] flex items-center w-full px-2 rounded py-1.5">
              <ListItemIcon>
                <RoomIcon style={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="Locations" />
            </div>
          </ListItemButton>
          <ListItemButton
            disableRipple
            className="w-full px-4 group-item"
            component={Link}
            to={'settings/roles'}
          >
            <div className="hover:bg-[#cae2ff] flex items-center w-full px-2 rounded py-1.5">
              <ListItemIcon>
                <LockIcon style={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="Roles" />
            </div>
          </ListItemButton>
          <ListItemButton
            disableRipple
            className="w-full px-4 group-item"
            component={Link}
            to={'settings/shifts'}
          >
            <div className="hover:bg-[#cae2ff] flex items-center w-full px-2 rounded py-1.5">
              <ListItemIcon>
                <AssignmentIndOutlinedIcon style={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="Shifts" />
            </div>
          </ListItemButton>
          <ListItemButton
            disableRipple
            className="w-full px-4 group-item"
            component={Link}
            to={'settings/annocement'}
          >
            <div className="hover:bg-[#cae2ff] flex items-center w-full px-2 rounded py-1.5">
              <ListItemIcon>
                <CampaignIcon style={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="Annocement" />
            </div>
          </ListItemButton>
          <ListItemButton
            disableRipple
            className="w-full px-4 group-item"
            component={Link}
            to={'settings/audit-log'}
          >
            <div className="hover:bg-[#cae2ff] flex items-center w-full px-2 rounded py-1.5">
              <ListItemIcon>
                <DescriptionIcon style={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="Audit Log" />
            </div>
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};
export default Settings;
