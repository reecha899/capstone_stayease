import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Breadcrumbs, Link, Button, Pagination, Stack, Divider } from '@mui/material';
import Footer from '../components/Footer';
import coverImage from '../assets/home-page-cover-image.png';
import roomService from '../services/roomService';
import PersonIcon from '@mui/icons-material/Person';
import BedIcon from '@mui/icons-material/Bed';

const RoomsAndSuites = () => {
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = useState(1);
  const roomsPerPage = 5;

  useEffect(() => {
    roomService.getRooms()
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the rooms!', error);
      });
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedRooms = rooms.slice((page - 1) * roomsPerPage, page * roomsPerPage);

  return (
    <Box sx={{ bgcolor: '#f8f9fa' }}>
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
        }}
      >
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(0,0,0,0.5)' }} />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" sx={{ fontWeight: 700, textShadow: '2px 2px 8px rgba(0,0,0,0.7)', fontSize: { xs: '2.5rem', md: '3.8rem' } }}>
            Room List
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'white', mt: 1, '& .MuiBreadcrumbs-separator': { color: 'rgba(255, 255, 255, 0.7)' } }}>
            <Link underline="hover" color="inherit" href="/home">
              Home
            </Link>
            <Typography color="white">Room List</Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      <Box sx={{ py: { xs: 4, md: 8 } }}>
        {/* Desktop Layout */}
        <Box sx={{ display: { xs: 'none', md: 'block' }, maxWidth: 900, mx: 'auto' }}>
          <Stack spacing={4}>
            {paginatedRooms.map((room) => (
              <Card key={room._id} sx={{ display: 'flex', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } }}>
                <Box
                  component="img"
                  sx={{ width: 320, objectFit: 'cover', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}
                  src={room.images && room.images.length > 0 ? room.images[0] : 'https://via.placeholder.com/320x340'}
                  alt={room.type}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <CardContent sx={{ flex: '1 0 auto', p: 3 }}>
                    <Typography component="div" variant="h5" sx={{ fontWeight: 'bold', textTransform: 'capitalize', mb: 1 }}>
                      {room.type} Rooms
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ mb: 2, color: 'text.secondary' }}>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <PersonIcon fontSize="small" />
                        <Typography variant="body2">{room.capacity} Person</Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <BedIcon fontSize="small" />
                        <Typography variant="body2">1 Bed</Typography>
                      </Stack>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                      {room.description}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        ${room.price}
                        <Box component="span" sx={{ fontWeight: 'normal', fontSize: '0.9rem', color: 'text.secondary' }}> / Per night</Box>
                      </Typography>
                      <Button variant="contained" sx={{ bgcolor: '#208c6c', color: 'white', textTransform: 'none', px: 3, borderRadius: '20px', '&:hover': { bgcolor: '#1a7558' } }}>
                        View More
                      </Button>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            ))}
          </Stack>
          <Stack spacing={2} sx={{ mt: 6, alignItems: 'center' }}>
            <Pagination 
              count={Math.ceil(rooms.length / roomsPerPage)} 
              page={page} 
              onChange={handlePageChange} 
              variant="outlined" 
              shape="rounded" 
            />
          </Stack>
        </Box>

        {/* Mobile Layout */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, px: 2 }}>
          <Stack spacing={3}>
            {paginatedRooms.map((room) => (
              <Card key={room._id} sx={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                <Box
                  component="img"
                  sx={{ 
                    width: '100%', 
                    height: 200, 
                    objectFit: 'cover' 
                  }}
                  src={room.images && room.images.length > 0 ? room.images[0] : 'https://via.placeholder.com/400x200'}
                  alt={room.type}
                />
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'capitalize', mb: 1 }}>
                    {room.type} Rooms
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ mb: 2, color: 'text.secondary' }}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <PersonIcon fontSize="small" />
                      <Typography variant="body2">{room.capacity} Person</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <BedIcon fontSize="small" />
                      <Typography variant="body2">1 Bed</Typography>
                    </Stack>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6, fontSize: '0.875rem' }}>
                    {room.description.length > 150 ? `${room.description.substring(0, 150)}...` : room.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      ${room.price}
                      <Box component="span" sx={{ fontWeight: 'normal', fontSize: '0.8rem', color: 'text.secondary' }}> / Per night</Box>
                    </Typography>
                    <Button variant="contained" sx={{ bgcolor: '#208c6c', color: 'white', textTransform: 'none', px: 2, borderRadius: '20px', fontSize: '0.875rem', '&:hover': { bgcolor: '#1a7558' } }}>
                      View More
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
          <Stack spacing={2} sx={{ mt: 4, alignItems: 'center' }}>
            <Pagination 
              count={Math.ceil(rooms.length / roomsPerPage)} 
              page={page} 
              onChange={handlePageChange} 
              variant="outlined" 
              shape="rounded" 
              size="small" 
            />
          </Stack>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default RoomsAndSuites; 