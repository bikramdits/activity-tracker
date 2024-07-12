import { CSSProperties } from 'react';
import * as React from 'react';
import { CSSObject, Theme, styled } from '@mui/material/styles';
import { NeolyticsLogo } from '@appname/assets';
import Settings from './Settings';
import Policies from './Policies';
import Report from './Reports';
import Approval from './Approval';
import TimeSheet from './Timesheet';
import Activity from './Activity';
import Organization from './Organization';
import { GroupWorkIcon } from '../../../assets/icons';
import Box from '@mui/material/Box';
import { Drawer as MUIDrawer } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HeaderAuth from '../../pages/Hedaer';
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 0,
  [theme.breakpoints.up('sm')]: {
    width: 0,
  },
});

const Drawer = styled(MUIDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function ClippedDrawer() {
  const iconStyle: CSSProperties = {
    display: 'inline-block',
    font: 'normal normal normal 14px / 1 FontAwesome',
    fontSize: '20px',
    textRendering: 'auto',
    WebkitFontSmoothing: 'antialiased',
  };
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen((p) => !p);
  };
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  const handleMenuClick = (menu: string) => {
    setActiveMenu((prevMenu) => (prevMenu === menu ? null : menu));
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'white',
          color: 'black',
        }}
      >
        <Toolbar>
          <div className="flex items-center justify-items-center">
            <div className="w-[200px] mr-2.5 box-border me-1  flex items-center justify-items-center gap-2.5">
              <img src={NeolyticsLogo} alt="Neolytics Logo" />
            </div>
          </div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <HeaderAuth />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem>
              <ListItemButton
                className="bg-transparent color-text-base "
                sx={{
                  '&:hover': {
                    backgroundColor: '#cae2ff',
                    '& .MuiListItemIcon-root': {
                      color: '#3c59d4',
                    },
                    '& .MuiListItemText-primary': {
                      color: '#3c59d4',
                      fontWeight: 'bold',
                    },
                    borderRadius: '10px',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'black' }}>
                  <GroupWorkIcon style={iconStyle} />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  sx={{ marginLeft: '-27px' }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem className="flex flex-col sidebar-list-item color-[rgba(0, 0, 0, 0.5)] text-gray-500">
              <Organization
                isOpen={activeMenu === 'organization'}
                handleMenuClick={() => handleMenuClick('organization')}
              />
            </ListItem>
            <ListItem className="flex flex-col sidebar-list-item text-gray-500">
              <Activity
                isOpen={activeMenu === 'activity'}
                handleMenuClick={() => handleMenuClick('activity')}
              />
            </ListItem>
            <ListItem className="flex flex-col sidebar-list-item text-gray-500">
              <TimeSheet
                isOpen={activeMenu === 'timesheet'}
                handleMenuClick={() => handleMenuClick('timesheet')}
              />
            </ListItem>
            <ListItem className="flex flex-col sidebar-list-item text-gray-500">
              <Approval
                isOpen={activeMenu === 'approval'}
                handleMenuClick={() => handleMenuClick('approval')}
              />
            </ListItem>
            <ListItem className="flex flex-col sidebar-list-item text-gray-500">
              <Report
                isOpen={activeMenu === 'report'}
                handleMenuClick={() => handleMenuClick('report')}
              />
            </ListItem>
            <ListItem className="flex flex-col sidebar-list-item text-gray-500">
              <Policies
                isOpen={activeMenu === 'policies'}
                handleMenuClick={() => handleMenuClick('policies')}
              />
            </ListItem>
            <ListItem className="flex flex-col sidebar-list-item text-gray-500">
              <Settings
                isOpen={activeMenu === 'settings'}
                handleMenuClick={() => handleMenuClick('settings')}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
