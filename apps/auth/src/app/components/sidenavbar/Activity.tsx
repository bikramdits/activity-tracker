import React from 'react';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  PhotoSizeSelectActualRoundedIcon,
  ExpandLess,
  ExpandMore,
  DesktopMacRoundedIcon,
  PhoneAndroidRoundedIcon,
} from '../../../assets/icons';
import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

const Activity = ({
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
        <ListItemText primary="Activity" className="text-customGrey" />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit className="w-full">
        <List component="div" disablePadding>
          <ListItemButton
            disableRipple
            className="w-full px-4 group-item"
            component={Link}
            to={'activity/screenshot'}
          >
            <div className="hover:bg-[#cae2ff] flex items-center w-full px-2 rounded py-1.5">
              <ListItemIcon>
                <PhotoSizeSelectActualRoundedIcon style={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="Screenshots" />
            </div>
          </ListItemButton>
          <ListItemButton
            disableRipple
            className="w-full px-4 group-item"
            component={Link}
            to={'activity/urls'}
          >
            <div className="hover:bg-[#cae2ff] flex items-center w-full px-2 rounded py-1.5">
              <ListItemIcon>
                <DesktopMacRoundedIcon style={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="Urls" />
            </div>
          </ListItemButton>
          <ListItemButton
            disableRipple
            className="w-full px-4 group-item"
            component={Link}
            to={'activity/apps-module'}
          >
            <div className="hover:bg-[#cae2ff] flex items-center w-full px-2 rounded py-1.5">
              <ListItemIcon>
                <PhoneAndroidRoundedIcon style={iconStyle} />
              </ListItemIcon>
              <ListItemText primary="Apps" />
            </div>
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};
export default Activity;
