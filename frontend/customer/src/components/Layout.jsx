import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import PagesIcon from '@mui/icons-material/Pages';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import BookIcon from '@mui/icons-material/Book';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LogoutIcon from '@mui/icons-material/Logout';
import authService from '../services/authService';
import logo from '../assets/customer-site-logo.jpg';

const drawerWidth = 280;

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/home' },
  { text: 'Pages', icon: <PagesIcon />, path: '/pages' },
  { text: 'Rooms & Suites', icon: <MeetingRoomIcon />, path: '/rooms' },
  { text: 'Services', icon: <MiscellaneousServicesIcon />, path: '/services' },
  { text: 'Blog', icon: <BookIcon />, path: '/blog' },
  { text: 'Contact', icon: <ContactMailIcon />, path: '/contact' },
];

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(authService.isAuthenticated());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    navigate('/login');
  };

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Box component="img" src={logo} alt="StayEase Logo" sx={{ height: 35 }} />
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => handleNavigation(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {isAuthenticated && (
          <ListItem button onClick={handleLogout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box>
      <AppBar component="nav" sx={{ bgcolor: '#f0f4ec', color: 'text.primary', boxShadow: 'none', borderBottom: '1px solid #ddd' }}>
        <Toolbar>
          {/* Mobile and Tablet Header */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon sx={{ fontSize: '2rem' }} />
            </IconButton>
            <Box component="img" src={logo} alt="StayEase Logo" sx={{ height: 40 }} />
             {isAuthenticated ? (
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            ) : (
              <Box sx={{ width: 48 }} />
            )}
          </Box>
          
          {/* Desktop Header */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
            <Box component="img" src={logo} alt="StayEase Logo" sx={{ height: 45 }} />
            <Box>
              {menuItems.map((item) => (
                <Button key={item.text} sx={{ color: 'text.primary', mx: 1.5, textTransform: 'none', fontSize: '1rem' }} onClick={() => handleNavigation(item.path)}>
                  {item.text}
                </Button>
              ))}
            </Box>
            <Box>
              <Button variant="contained" onClick={handleLogout} sx={{ bgcolor: 'black', color: 'white', '&:hover': { bgcolor: '#333' }, borderRadius: 2, px: 3, py: 1 }}>
                Logout
              </Button>
            </Box>
          </Box>

        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Box component="main" sx={{ bgcolor: '#f8f9fa', minHeight: '100vh' }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 