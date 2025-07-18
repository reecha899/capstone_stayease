import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, TextField, Button, Link, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';
import hotelImg from '../assets/login_hotel_image.png'; // Use the correct image
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

function Login({ onLogin, isAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [openAlreadyLoggedInDialog, setOpenAlreadyLoggedInDialog] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setOpenAlreadyLoggedInDialog(true);
    } else {
      setOpenAlreadyLoggedInDialog(false);
    }
  }, [isAuthenticated]);

  const handleCloseAlreadyLoggedInDialog = () => {
    setOpenAlreadyLoggedInDialog(false);
    navigate('/'); // Navigate to dashboard when closing dialog
  };

  const handleGoToDashboard = () => {
    navigate('/'); // Navigate to dashboard directly
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
              const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // if backend uses cookies
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Save token (if using JWT)
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        onLogin();
        navigate('/');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Server error');
    } finally {
      setLoading(false);
    }
  };

  // If authenticated, just render the dialog. Otherwise render the login form.
  if (isAuthenticated) {
    return (
      <Dialog
        open={openAlreadyLoggedInDialog}
        onClose={handleCloseAlreadyLoggedInDialog}
        aria-labelledby="already-logged-in-dialog-title"
        aria-describedby="already-logged-in-dialog-description"
      >
        <DialogTitle id="already-logged-in-dialog-title">{"Already Logged In"}</DialogTitle>
        <DialogContent>
          <Typography id="already-logged-in-dialog-description">
            You are already logged in. Would you like to go to the dashboard?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGoToDashboard} color="primary" autoFocus>
            Go to Dashboard
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-100">
      <Paper elevation={6} className="flex w-full max-w-3xl mx-4 rounded-lg shadow-lg overflow-hidden">
        <Box className="w-1/2 hidden md:block">
          <img src={hotelImg} alt="hotel" className="object-cover h-full w-full rounded-l-lg" />
        </Box>
        <Box className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <Typography variant="h5" className="mb-6 font-semibold text-center">Login Account</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                minLength: 6,
                placeholder: "6+ characters",
              }}
            />
            {error && <Typography color="error" className="mt-2">{error}</Typography>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4 mb-2"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login; 