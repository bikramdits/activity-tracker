import React, { useEffect } from 'react';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { CSSProperties } from 'react';
import {
  ExpandLess,
  ExpandMore,
  ContactMailOutlinedIcon,
  Diversity3Icon,
  AccountBalanceIcon,
  DescriptionIcon,
  AodIcon,
} from '../../../assets/icons';
import { Link } from 'react-router-dom';

const Organization = ({
  isOpen,
  handleMenuClick,
}: {
  isOpen: boolean;
  handleMenuClick: () => void;
}) => {
  const iconStyle: CSSProperties = {
    display: 'inline-block',
    font: 'normal normal normal 14px / 1 FontAwesome',
    fontSize: 'inherit',
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
        <ListItemText
          primary="Organization"
          className="text-customGrey text-base"
        />
        {isOpen ? <ExpandLess className="icon-grey" /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit className="w-full">
        <List component="div" disablePadding>
          <ListItemButton
            disableRipple
            className="w-full px-4 group-item"
            component={Link}
            to={'organization/people'}
          >
            <div className="hover:bg-[#cae2ff] flex items-center w-full px-2 rounded py-1.5">
              <ListItemIcon>
                <ContactMailOutlinedIcon style={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="People" />
            </div>
          </ListItemButton>
          <ListItemButton
            disableRipple
            className="w-full px-4 py-4 group-item"
            component={Link}
            to={'organization/client'}
          >
            <div className="hover:bg-[#cae2ff] flex items-center w-full px-2 rounded py-1.5">
              <ListItemIcon>
                <Diversity3Icon style={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="Clients" />
            </div>
          </ListItemButton>
          <ListItemButton
            className="w-full px-4 py-4 group-item"
            component={Link}
            to={'organization/departments'}
          >
            <div className="hover:bg-[#cae2ff] flex items-center w-full px-2 rounded py-1.5">
              <ListItemIcon>
                <AccountBalanceIcon style={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="Departments" />
            </div>
          </ListItemButton>
          <ListItemButton className="w-full px-4 py-4 group-item">
            <div className="hover:bg-[#cae2ff] flex items-center w-full px-2 rounded py-1.5">
              <ListItemIcon>
                <AodIcon style={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="Playbook" />
            </div>
          </ListItemButton>
          <ListItemButton
            className="w-full px-4 py-4 group-item"
            component={Link}
            to={'organization/projects'}
          >
            <div className="hover:bg-[#cae2ff] flex items-center w-full px-2 rounded py-1.5">
              <ListItemIcon>
                <DescriptionIcon style={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="Projects" />
            </div>
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};
export default Organization;
