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
    <Box sx={{ display: 'flex', background: '#F4F5F6', minHeight: '100vh' }}>
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
            background: '#fff',
            color: '#23262F',
            boxSizing: 'border-box',
            borderRight: '1px solid #E6E8EC',
            pt: 0,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, pb: 1, pt: 3 }}>
          <img src={logo} alt="Logo" style={{ width: 36, height: 36, borderRadius: 8, marginRight: 10 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#2563EB', letterSpacing: 1, fontSize: 22 }}>StayEase</Typography>
        </Box>
        <List sx={{ mt: 1 }}>
          {menuItems.map((item) => {
            const selected = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5, background: 'transparent' }}>
                <ListItemButton selected={selected} onClick={() => navigate(item.path)} sx={{ mx: 2, px: 4, py: 1.5, color: selected ? '#2563EB' : '#6B7280', fontWeight: selected ? 700 : 500, borderRadius: 2, minHeight: 48, background: selected ? '#E6F0FF' : 'transparent', '&:hover': { background: '#E6F0FF' } }}>
                  <ListItemIcon sx={{ color: selected ? '#2563EB' : '#6B7280', minWidth: 36 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: selected ? 700 : 500, fontSize: 16 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider sx={{ my: 3, mx: 2, borderColor: '#2563EB', borderBottomWidth: 1 }} />
        <List>
          <ListItem disablePadding sx={{ mb: 0.5, background: 'transparent' }}>
            <ListItemButton onClick={onLogout} sx={{ mx: 2, px: 4, py: 1.5, color: '#6B7280', fontWeight: 500, borderRadius: 2, minHeight: 48, background: 'transparent', '&:hover': { background: '#E6F0FF' } }}>
              <ListItemIcon sx={{ color: '#6B7280', minWidth: 36 }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 500, fontSize: 16 }} />
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