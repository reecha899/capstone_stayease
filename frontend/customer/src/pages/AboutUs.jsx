import React from 'react';
import { Box, Typography, Container, Breadcrumbs, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import coverImage from '../assets/home-page-cover-image.png';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Cover Image Section */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: 180, sm: 240, md: 340 },
          backgroundImage: `url(${coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: { xs: 'flex-end', md: 'center' },
          justifyContent: { xs: 'center', md: 'flex-start' },
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0,0,0,0.45)',
            zIndex: 1,
          }}
        />
        {/* Text Content */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            color: 'white',
            width: '100%',
            px: { xs: 2, sm: 4, md: 10 },
            pb: { xs: 3, md: 0 },
            pt: { xs: 0, md: 8 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              mb: { xs: 1, md: 2 },
            }}
          >
            About Us
          </Typography>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              color: 'white',
              justifyContent: { xs: 'center', md: 'flex-start' },
              display: 'flex',
              fontSize: { xs: '0.95rem', md: '1.1rem' },
            }}
          >
            <Link underline="hover" color="inherit" onClick={() => navigate('/home')} sx={{ cursor: 'pointer' }}>
              Home
            </Link>
            <Typography color="white">About Us</Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              color: '#333',
              fontWeight: 'bold',
              mb: 4,
              fontSize: { xs: '2rem', md: '2.8rem' },
            }}
          >
            About Us
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: '#666',
              lineHeight: 1.8,
              maxWidth: '800px',
              mx: 'auto',
              fontSize: { xs: '1.1rem', md: '1.35rem' },
            }}
          >
            Welcome to StayEase, your premier destination for luxury accommodations and exceptional hospitality. 
            We are committed to providing our guests with unforgettable experiences through our world-class 
            service, elegant rooms, and prime locations. Our dedicated team ensures every stay is memorable 
            and comfortable, making your journey with us truly special.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs; 