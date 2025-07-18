import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Breadcrumbs, Link, Card, CardContent, Grid, Stack, Divider, Button } from '@mui/material';
import Footer from '../components/Footer';
import PersonIcon from '@mui/icons-material/Person';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import coverImage from '../assets/home-page-cover-image.png';
import ReactPlayer from 'react-player/youtube';

const RoomDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    // Get room data from location state or use default data
    if (location.state?.room) {
      setRoom(location.state.room);
    } else {
      // Default room data if no room is passed
      setRoom({
        type: 'Luxury Bed',
        capacity: 4,
        beds: 2,
        baths: 2,
        price: 568,
        description: 'Our Luxury Bed Room offers thoughtful comfort in a cozy 250-square-foot retreat. Each room features a plush queen-size mattress dressed in premium linens, a spacious work desk with ergonomic chair, and floor-to-ceiling windows that fill the space with natural light. Modern amenities include high-speed Wi-Fi, a 42" flat-screen TV, in-room coffee and tea station, and a fully stocked mini-fridge. The en suite bathroom boasts a rainfall shower, soft Turkish towels, and eco-friendly bath products. Whether you\'re traveling for business or leisure, the Luxury Bed Room provides everything you need for a restful, productive stay.',
        images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80']
      });
    }
  }, [location.state]);

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ bgcolor: '#f8f9fa', width: '100%', overflowX: 'hidden' }}>
      {/* Cover Page */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 250, md: 400 },
          backgroundImage: `url(${coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          color: 'white',
          textAlign: 'left',
          pl: { xs: 2, md: 10 },
          width: '100%',
        }}
      >
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(0,0,0,0.5)' }} />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" sx={{ fontWeight: 700, textShadow: '2px 2px 8px rgba(0,0,0,0.7)', fontSize: { xs: '2.5rem', md: '3.8rem' } }}>
            Room Details
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'white', mt: 1, '& .MuiBreadcrumbs-separator': { color: 'rgba(255, 255, 255, 0.7)' } }}>
            <Link underline="hover" color="inherit" href="/home">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/rooms">
              Room List
            </Link>
            <Typography color="white">Room Details</Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      {/* Desktop Layout */}
      <Box sx={{ display: { xs: 'none', md: 'block' }, width: '100%' }}>
        {/* Room Details Section */}
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 4, py: 8 }}>
          {/* Room Image */}
          <Box
            sx={{
              width: '100%',
              height: 500,
              backgroundImage: `url(${room.images && room.images.length > 0 ? room.images[0] : 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: 3,
              mb: 4
            }}
          />

          {/* Room Title */}
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 4, color: '#333', textAlign: 'left' }}>
            {room.type}
          </Typography>

          {/* Info Cards */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={3}>
              <Card sx={{ 
                bgcolor: '#f0f8f0', 
                borderRadius: 3, 
                boxShadow: 'none',
                border: '1px solid #e0e0e0',
                height: 140,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CardContent sx={{ textAlign: 'center', py: 3, width: '100%' }}>
                  <PersonIcon sx={{ fontSize: 40, color: '#208c6c', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                    {room.capacity} Person
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card sx={{ 
                bgcolor: '#f0f8f0', 
                borderRadius: 3, 
                boxShadow: 'none',
                border: '1px solid #e0e0e0',
                height: 140,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CardContent sx={{ textAlign: 'center', py: 3, width: '100%' }}>
                  <BedIcon sx={{ fontSize: 40, color: '#208c6c', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                    1 Bed
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card sx={{ 
                bgcolor: '#f0f8f0', 
                borderRadius: 3, 
                boxShadow: 'none',
                border: '1px solid #e0e0e0',
                height: 140,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CardContent sx={{ textAlign: 'center', py: 3, width: '100%' }}>
                  <BathtubIcon sx={{ fontSize: 40, color: '#208c6c', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                    1 Bath
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card sx={{ 
                bgcolor: '#f0f8f0', 
                borderRadius: 3, 
                boxShadow: 'none',
                border: '1px solid #e0e0e0',
                height: 140,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CardContent sx={{ textAlign: 'center', py: 3, width: '100%' }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#208c6c', mb: 1 }}>
                    ${room.price}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    per night
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Room Description */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="body1" sx={{ 
              lineHeight: 1.8, 
              color: '#666',
              fontSize: '1.1rem',
              textAlign: 'justify'
            }}>
              {room.description}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Video Section */}
      <Box
        sx={{
          width: '100%',
          bgcolor: '#f2f8f6',
          py: { xs: 4, md: 8 },
          mb: 4,
          overflowX: 'hidden',
        }}
      >
        {/* Desktop Layout */}
        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            display: { xs: 'none', md: 'block' },
            textAlign: 'center',
            px: 4,
          }}
        >
          <Typography 
            variant="h3" 
            fontWeight="bold" 
            color="#222" 
            sx={{ 
              mb: 6,
              fontSize: '2.5rem',
              lineHeight: 1.2
            }}
          >
            Relax And Enjoy With Our<br />
            Hotel & Resort
          </Typography>
          
          {/* Desktop Video Player */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: 400,
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              bgcolor: 'black',
            }}
          >
            <ReactPlayer 
              url="https://youtu.be/s8vnc9l8sz4?si=QpGG9GempiPco2Mj"
              width="100%" 
              height="100%" 
              playing={false}
              controls
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                    controls: 1
                  }
                }
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Mobile Layout */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, width: '100%', overflowX: 'hidden' }}>
        {/* Room Details Section */}
        <Box sx={{ width: '100%', py: 4, px: 2, mx: 'auto', maxWidth: '100vw' }}>
          {/* Room Image */}
          <Box
            sx={{
              width: '100%',
              height: 300,
              backgroundImage: `url(${room.images && room.images.length > 0 ? room.images[0] : 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: 2,
              mb: 3
            }}
          />

          {/* Room Title */}
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#333', textAlign: 'left' }}>
            {room.type}
          </Typography>

          {/* Info Cards */}
          <Stack spacing={2} sx={{ mb: 4 }}>
            <Card sx={{ 
              bgcolor: '#f0f8f0', 
              borderRadius: 2, 
              boxShadow: 'none',
              border: '1px solid #e0e0e0',
              height: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CardContent sx={{ textAlign: 'center', py: 2, width: '100%' }}>
                <PersonIcon sx={{ fontSize: 30, color: '#208c6c', mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                  {room.capacity} Person
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              bgcolor: '#f0f8f0', 
              borderRadius: 2, 
              boxShadow: 'none',
              border: '1px solid #e0e0e0',
              height: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CardContent sx={{ textAlign: 'center', py: 2, width: '100%' }}>
                <BedIcon sx={{ fontSize: 30, color: '#208c6c', mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                  1 Bed
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              bgcolor: '#f0f8f0', 
              borderRadius: 2, 
              boxShadow: 'none',
              border: '1px solid #e0e0e0',
              height: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CardContent sx={{ textAlign: 'center', py: 2, width: '100%' }}>
                <BathtubIcon sx={{ fontSize: 30, color: '#208c6c', mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                  1 Bath
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              bgcolor: '#f0f8f0', 
              borderRadius: 2, 
              boxShadow: 'none',
              border: '1px solid #e0e0e0',
              height: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CardContent sx={{ textAlign: 'center', py: 2, width: '100%' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#208c6c', mb: 1 }}>
                  ${room.price}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  per night
                </Typography>
              </CardContent>
            </Card>
          </Stack>

          {/* Room Description */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="body2" sx={{ 
              lineHeight: 1.6, 
              color: '#666',
              textAlign: 'justify'
            }}>
              {room.description}
            </Typography>
          </Box>
        </Box>

        {/* Mobile Video Section */}
        <Box
          sx={{
            width: '100%',
            bgcolor: '#f2f8f6',
            py: 4,
            mb: 4,
            overflowX: 'hidden',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: { xs: 'block', md: 'none' },
              textAlign: 'center',
              px: 2,
              mx: 'auto',
              maxWidth: '100vw',
              overflowX: 'hidden',
            }}
          >
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              color="#222" 
              sx={{ 
                mb: 2,
                fontSize: '1.5rem',
                lineHeight: 1.3
              }}
            >
              Relax And Enjoy With Our<br />
              Hotel & Resort
            </Typography>
            
            {/* Mobile Video Player */}
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: 200,
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                bgcolor: 'black',
              }}
            >
              <ReactPlayer 
                url="https://youtu.be/s8vnc9l8sz4?si=QpGG9GempiPco2Mj"
                width="100%" 
                height="100%" 
                playing={false}
                controls
                config={{
                  youtube: {
                    playerVars: {
                      modestbranding: 1,
                      rel: 0,
                      showinfo: 0,
                      controls: 1
                    }
                  }
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
     

      {/* Facilities and Rules Section */}
      <Box
        sx={{
          width: '100%',
          bgcolor: 'white',
          py: { xs: 4, md: 8 },
          mb: 4,
          overflowX: 'hidden',
        }}
      >
        {/* Desktop Layout */}
        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            display: { xs: 'none', md: 'block' },
            px: 4,
          }}
        >
          {/* Room Facilities */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
              Room Facilities
            </Typography>
            <Box sx={{ width: 60, height: 2, bgcolor: '#208c6c', mb: 3, position: 'relative' }}>
              <Box sx={{ position: 'absolute', right: -4, top: -3, width: 8, height: 8, borderRadius: '50%', bgcolor: '#208c6c' }} />
            </Box>
            <Typography variant="body1" sx={{ color: '#666', mb: 3, textAlign: 'justify', lineHeight: 1.6 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: '#208c6c', mr: 2, fontSize: 20 }}>🌐</Box>
                  <Typography variant="body2" sx={{ color: '#333' }}>Internet Access</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: '#208c6c', mr: 2, fontSize: 20 }}>💨</Box>
                  <Typography variant="body2" sx={{ color: '#333' }}>Air Conditioner</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: '#208c6c', mr: 2, fontSize: 20 }}>🏥</Box>
                  <Typography variant="body2" sx={{ color: '#333' }}>Medical Kit</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: '#208c6c', mr: 2, fontSize: 20 }}>🔒</Box>
                  <Typography variant="body2" sx={{ color: '#333' }}>Security</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: '#208c6c', mr: 2, fontSize: 20 }}>🚿</Box>
                  <Typography variant="body2" sx={{ color: '#333' }}>Shower</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Hotel Facilities */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
              Hotel Facilities
            </Typography>
            <Box sx={{ width: 60, height: 2, bgcolor: '#208c6c', mb: 3, position: 'relative' }}>
              <Box sx={{ position: 'absolute', right: -4, top: -3, width: 8, height: 8, borderRadius: '50%', bgcolor: '#208c6c' }} />
            </Box>
            <Typography variant="body1" sx={{ color: '#666', mb: 3, textAlign: 'justify', lineHeight: 1.6 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: '#208c6c', mr: 2, fontSize: 20 }}>🍽️</Box>
                  <Typography variant="body2" sx={{ color: '#333' }}>Restaurant</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: '#208c6c', mr: 2, fontSize: 20 }}>🚗</Box>
                  <Typography variant="body2" sx={{ color: '#333' }}>Parking</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: '#208c6c', mr: 2, fontSize: 20 }}>🏋️</Box>
                  <Typography variant="body2" sx={{ color: '#333' }}>Gym</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Rules & Regulations */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
              Rules & Regulations
            </Typography>
            <Box sx={{ width: 60, height: 2, bgcolor: '#208c6c', mb: 3, position: 'relative' }}>
              <Box sx={{ position: 'absolute', right: -4, top: -3, width: 8, height: 8, borderRadius: '50%', bgcolor: '#208c6c' }} />
            </Box>
            <Typography variant="body1" sx={{ color: '#666', mb: 3, textAlign: 'justify', lineHeight: 1.6 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid #208c6c', mr: 2 }} />
                <Typography variant="body2" sx={{ color: '#333' }}>Smoking not allowed</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid #208c6c', mr: 2 }} />
                <Typography variant="body2" sx={{ color: '#333' }}>Alcohol not allowed</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid #208c6c', mr: 2 }} />
                <Typography variant="body2" sx={{ color: '#333' }}>Identification document is must for hotel registration</Typography>
              </Box>
            </Stack>
          </Box>

          {/* Cancellation */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
              Cancellation
            </Typography>
            <Box sx={{ width: 60, height: 2, bgcolor: '#208c6c', mb: 3, position: 'relative' }}>
              <Box sx={{ position: 'absolute', right: -4, top: -3, width: 8, height: 8, borderRadius: '50%', bgcolor: '#208c6c' }} />
            </Box>
            <Typography variant="body1" sx={{ color: '#666', textAlign: 'justify', lineHeight: 1.6 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </Box>
        </Box>

        {/* Mobile Layout */}
        <Box
          sx={{
            width: '100%',
            display: { xs: 'block', md: 'none' },
            px: 2,
            mx: 'auto',
            maxWidth: '100vw',
            overflowX: 'hidden',
          }}
        >
          {/* Room Facilities */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
              Room Facilities
            </Typography>
            <Box sx={{ width: 50, height: 2, bgcolor: '#208c6c', mb: 2, position: 'relative' }}>
              <Box sx={{ position: 'absolute', right: -3, top: -2, width: 6, height: 6, borderRadius: '50%', bgcolor: '#208c6c' }} />
            </Box>
            <Typography variant="body2" sx={{ color: '#666', mb: 2, textAlign: 'justify', lineHeight: 1.5 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ color: '#208c6c', mr: 2, fontSize: 18 }}>🌐</Box>
                <Typography variant="body2" sx={{ color: '#333' }}>Internet Access</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ color: '#208c6c', mr: 2, fontSize: 18 }}>💨</Box>
                <Typography variant="body2" sx={{ color: '#333' }}>Air Conditioner</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ color: '#208c6c', mr: 2, fontSize: 18 }}>🏥</Box>
                <Typography variant="body2" sx={{ color: '#333' }}>Medical Kit</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ color: '#208c6c', mr: 2, fontSize: 18 }}>🔒</Box>
                <Typography variant="body2" sx={{ color: '#333' }}>Security</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ color: '#208c6c', mr: 2, fontSize: 18 }}>🚿</Box>
                <Typography variant="body2" sx={{ color: '#333' }}>Shower</Typography>
              </Box>
            </Stack>
          </Box>

          {/* Hotel Facilities */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
              Hotel Facilities
            </Typography>
            <Box sx={{ width: 50, height: 2, bgcolor: '#208c6c', mb: 2, position: 'relative' }}>
              <Box sx={{ position: 'absolute', right: -3, top: -2, width: 6, height: 6, borderRadius: '50%', bgcolor: '#208c6c' }} />
            </Box>
            <Typography variant="body2" sx={{ color: '#666', mb: 2, textAlign: 'justify', lineHeight: 1.5 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ color: '#208c6c', mr: 2, fontSize: 18 }}>🍽️</Box>
                <Typography variant="body2" sx={{ color: '#333' }}>Restaurant</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ color: '#208c6c', mr: 2, fontSize: 18 }}>🚗</Box>
                <Typography variant="body2" sx={{ color: '#333' }}>Parking</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ color: '#208c6c', mr: 2, fontSize: 18 }}>🏋️</Box>
                <Typography variant="body2" sx={{ color: '#333' }}>Gym</Typography>
              </Box>
            </Stack>
          </Box>

          {/* Rules & Regulations */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
              Rules & Regulations
            </Typography>
            <Box sx={{ width: 50, height: 2, bgcolor: '#208c6c', mb: 2, position: 'relative' }}>
              <Box sx={{ position: 'absolute', right: -3, top: -2, width: 6, height: 6, borderRadius: '50%', bgcolor: '#208c6c' }} />
            </Box>
            <Typography variant="body2" sx={{ color: '#666', mb: 2, textAlign: 'justify', lineHeight: 1.5 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', border: '2px solid #208c6c', mr: 2 }} />
                <Typography variant="body2" sx={{ color: '#333' }}>Smoking not allowed</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', border: '2px solid #208c6c', mr: 2 }} />
                <Typography variant="body2" sx={{ color: '#333' }}>Alcohol not allowed</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', border: '2px solid #208c6c', mr: 2 }} />
                <Typography variant="body2" sx={{ color: '#333' }}>Identification document is must for hotel registration</Typography>
              </Box>
            </Stack>
          </Box>

          {/* Cancellation */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
              Cancellation
            </Typography>
            <Box sx={{ width: 50, height: 2, bgcolor: '#208c6c', mb: 2, position: 'relative' }}>
              <Box sx={{ position: 'absolute', right: -3, top: -2, width: 6, height: 6, borderRadius: '50%', bgcolor: '#208c6c' }} />
            </Box>
            <Typography variant="body2" sx={{ color: '#666', textAlign: 'justify', lineHeight: 1.5 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Book A Room Button Section */}
      <Box
        sx={{
          width: '100%',
          bgcolor: 'white',
          py: { xs: 4, md: 6 },
          mb: 4,
        }}
      >
        {/* Desktop Layout */}
        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            display: { xs: 'none', md: 'block' },
            textAlign: 'center',
            px: 4,
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: '#2E8B57',
              color: 'white',
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              px: 4,
              py: 2,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(46, 139, 87, 0.3)',
              '&:hover': {
                bgcolor: '#236B43',
                boxShadow: '0 6px 16px rgba(46, 139, 87, 0.4)',
              },
            }}
          >
            Book A Room
          </Button>
        </Box>

        {/* Mobile Layout */}
        <Box
          sx={{
            width: '100%',
            display: { xs: 'block', md: 'none' },
            textAlign: 'center',
            px: 2,
            mx: 'auto',
            maxWidth: '100vw',
            overflowX: 'hidden',
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: '#2E8B57',
              color: 'white',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
              px: 3,
              py: 1.5,
              borderRadius: 2,
              boxShadow: '0 3px 8px rgba(46, 139, 87, 0.3)',
              '&:hover': {
                bgcolor: '#236B43',
                boxShadow: '0 4px 12px rgba(46, 139, 87, 0.4)',
              },
            }}
          >
            Book A Room
          </Button>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default RoomDetails; 