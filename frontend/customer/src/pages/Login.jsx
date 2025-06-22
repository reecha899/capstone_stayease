import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import hotelImage from '../assets/hotel-login-page-image.jpeg';
import { Box, Paper, TextField, Button, Typography, InputAdornment, IconButton, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) {
      setError('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authService.login(formData);
      navigate('/home');
    } catch (err) {
      console.error('Login failed', err);
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 64px)',
      bgcolor: '#f5f5f5',
      p: 2,
    }}>
      <Paper elevation={3} sx={{
        maxWidth: { xs: 400, md: 800 },
        width: '100%',
        borderRadius: '12px',
        padding: "10px",
        overflow: 'hidden',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }
      }}>
        <Box sx={{
          width: { xs: '100%', md: '50%' },
          height: { xs: 200, md: 'auto' },
          flexShrink: 0
        }}>
          <Box
            component="img"
            src={hotelImage}
            alt="Hotel"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              paddingRight: 2
            }}
          />
        </Box>
        <Box sx={{ p: { xs: 2, md: 4 }, width: { xs: '100%', md: '50%' }, }}>
          <Typography component="h1" variant="h5" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
            Login Account
          </Typography>
          <Box component="form" paddingRight={3} noValidate onSubmit={handleLogin}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              placeholder="6+ characters"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && (
              <Typography color="error" align="center" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#208c6c', '&:hover': { bgcolor: '#1a7558' }, py: 1.5 }}
            >
              Login
            </Button>
            <Typography variant="body2" align="center">
              {"Don't have an account? "}
              <Link to="/signup" style={{ color: '#208c6c', textDecoration: 'underline' }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login; 