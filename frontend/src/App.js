import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/layout/Layout';
import Dashboard from './views/Dashboard';
import Rooms from './views/Rooms';
import Bookings from './views/Bookings';
import Users from './views/Users';
import Login from './views/Login';
import Deals from './views/Deals';
import Rates from './views/Rates';
import FrontDesk from './views/FrontDesk';
import Guests from './views/Guests';
import CenteredLoader from './components/CenteredLoader';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  // Debug environment configuration
  console.log('Environment Configuration:');
  console.log('REACT_APP_NODE_ENV:', process.env.REACT_APP_NODE_ENV);
  console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading, false = not auth, true = auth
  const [loading, setLoading] = useState(true);

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/me`, {
          credentials: 'include',
        });
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Handle login success
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = async () => {
            await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setIsAuthenticated(false);
  };

  // Global error handler for 401 (token expired)
  const fetchWithAuth = async (url, options = {}) => {
    const res = await fetch(url, { ...options, credentials: 'include' });
    if (res.status === 401) {
      setIsAuthenticated(false);
    }
    return res;
  };

  if (loading) return <CenteredLoader message="Loading..." />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <Routes>
            {isAuthenticated ? (
              <Route
                path="/login"
                element={<Navigate to="/" replace state={{ showMessage: true }} />}
              />
            ) : (
              <Route
                path="/login"
                element={<Login onLogin={handleLogin} />}
              />
            )}
            {isAuthenticated ? (
              <Route element={<Layout onLogout={handleLogout} fetchWithAuth={fetchWithAuth} />}>
                <Route path="/" element={<Dashboard fetchWithAuth={fetchWithAuth} />} />
                <Route path="/rooms" element={<Rooms fetchWithAuth={fetchWithAuth} />} />
                <Route path="/bookings" element={<Bookings fetchWithAuth={fetchWithAuth} />} />
                <Route path="/users" element={<Users fetchWithAuth={fetchWithAuth} />} />
                <Route path="/deals" element={<Deals fetchWithAuth={fetchWithAuth} />} />
                <Route path="/rates" element={<Rates fetchWithAuth={fetchWithAuth} />} />
                <Route path="/frontdesk" element={<FrontDesk fetchWithAuth={fetchWithAuth} />} />
                <Route path="/guests" element={<Guests fetchWithAuth={fetchWithAuth} />} />
              </Route>
            ) : (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App; 