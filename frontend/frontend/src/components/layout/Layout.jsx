import React, { useState, useEffect } from 'react';
import { Box, Drawer, AppBar, Toolbar, Typography, IconButton, List, ListItem, ListItemIcon, ListItemText, Avatar, InputBase, Button, ListItemButton, Menu, MenuItem, Snackbar, Divider } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Room as RoomIcon,
  People as PeopleIcon,
  LocalOffer as DealIcon,
  RateReview as RateIcon,
  Hotel as FrontDeskIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import logo from '../../assets/login_hotel_image.png';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Front desk', icon: <FrontDeskIcon />, path: '/frontdesk' },
  { text: 'Guest', icon: <PeopleIcon />, path: '/guests' },
  { text: 'Rooms', icon: <RoomIcon />, path: '/rooms' },
  { text: 'Deal', icon: <DealIcon />, path: '/deals' },
  { text: 'Rate', icon: <RateIcon />, path: '/rates' },
];

function Layout({ onLogout, fetchWithAuth }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    onLogout();
    handleMenuClose();
  };

  useEffect(() => {
    if (location.state?.showMessage) {
      setSnackbarOpen(true);
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location.state]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', background: '#181A20', minHeight: '100vh' }}>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: '#23262F',
            color: '#fff',
            boxSizing: 'border-box',
            borderRight: 0,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <img src={logo} alt="Logo" style={{ width: 40, height: 40, borderRadius: 8, marginRight: 12 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff', letterSpacing: 1 }}>StayEase</Typography>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 1, borderRadius: 2, background: location.pathname === item.path ? '#353945' : 'inherit', '&:hover': { background: '#353945' } }}>
              <ListItemButton selected={location.pathname === item.path} onClick={() => navigate(item.path)} sx={{ px: 2.5, color: '#fff' }}>
                <ListItemIcon sx={{ color: '#fff', minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider sx={{ my: 2, borderColor: '#454545' }} />
          <ListItem disablePadding sx={{ mb: 1, borderRadius: 2, background: location.pathname === '/logout' ? '#353945' : 'inherit', '&:hover': { background: '#353945' } }}>
            <ListItemButton onClick={onLogout} sx={{ px: 2.5, color: '#fff' }}>
              <ListItemIcon sx={{ color: '#fff', minWidth: 36 }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box sx={{ flexGrow: 1, background: '#F4F5F6', minHeight: '100vh' }}>
        <AppBar position="static" elevation={0} sx={{ background: '#fff', color: '#23262F', boxShadow: 'none', borderBottom: '1px solid #E6E8EC' }}>
          <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: 400 }}>
              <InputBase
                placeholder="Search for rooms and offers"
                startAdornment={<SearchIcon sx={{ mr: 1, color: '#B1B5C3' }} />}
                sx={{
                  background: '#F4F5F6',
                  borderRadius: 2,
                  px: 2,
                  py: 0.5,
                  width: '100%',
                  fontSize: 16,
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ color: '#777E90', fontWeight: 500 }}>{today}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button variant="contained" startIcon={<AddIcon />} sx={{ background: '#3772FF', color: '#fff', textTransform: 'none', borderRadius: 2, boxShadow: 'none', '&:hover': { background: '#2754C5' } }}>
                Create booking
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ p: 4 }}>
          <Outlet fetchWithAuth={fetchWithAuth} />
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="You are logged in."
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      />
    </Box>
  );
}

export default Layout; 