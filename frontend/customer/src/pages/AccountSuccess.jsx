import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import coverImage from '../assets/login-successfull-cover-image.png';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, Typography, Paper } from '@mui/material';

const AccountSuccess = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f8f9fa',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 900,
          height: 550,
          backgroundImage: `url(${coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          p: 2,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '12px',
          },
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 450,
            textAlign: 'center',
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            position: 'relative',
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 60, color: '#208c6c', mb: 2 }} />
          <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 'bold', color: '#208c6c' }}>
            Account Created Successfully
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Please Check Your Email
          </Typography>
          <Button
            component={RouterLink}
            to="/home"
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              bgcolor: '#208c6c',
              '&:hover': { bgcolor: '#1a7559' },
              fontSize: '1rem',
            }}
          >
            View Home Page
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default AccountSuccess; 