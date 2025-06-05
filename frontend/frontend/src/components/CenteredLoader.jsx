import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function CenteredLoader({ message = "Loading..." }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0, left: 0, width: '100vw', height: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        bgcolor: 'rgba(255,255,255,0.7)', zIndex: 2000
      }}
    >
      <CircularProgress size={60} thickness={5} />
      <Typography sx={{ mt: 3, fontWeight: 600, color: '#333' }}>{message}</Typography>
    </Box>
  );
} 