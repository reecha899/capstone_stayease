import React, { useState } from 'react';
import { Box, Typography, Grid, TextField, Button,Stack, Paper, Divider, IconButton, Modal } from '@mui/material';
import CheckCircle from '@mui/icons-material/CheckCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ReactPlayer from 'react-player/youtube';
import coverImage from '../assets/home-page-cover-image.png';
import luxuryCityHotelImage from '../assets/luxury-city-hotel-image.png';
import hotel1 from '../assets/hotel-1.jpg';
import hotel2 from '../assets/hotel-2.jpg';
import hotel3 from '../assets/hotel-3.jpg';
import hotel4 from '../assets/hotel-4.jpg';
import hotel5 from '../assets/hotel-5.jpg';
import hotel6 from '../assets/hotel-6.jpg';
import hotelNearCity1 from '../assets/hotel-near-city-image-1.jpg';
import hotelNearCity2 from '../assets/hotel-near-city-image-2.jpeg';
import person1 from '../assets/person-1.png';
import person2 from '../assets/person-2.png';
import person3 from '../assets/person-3.png';
import { Rating, Avatar } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Footer from '../components/Footer';


const HomePage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const roomImages = [hotel1, hotel2, hotel3, hotel4, hotel5, hotel6];
  const amenities = ['Fitness Center', 'Jacuzzi', 'Swimming Pool', 'Spa Treatment', 'Transportation', 'Restaurants', 'Lounge Bar', 'Sport Activities', 'Garden'];
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeDesktopSlide, setActiveDesktopSlide] = useState(0);

  const testimonials = [
    {
      name: 'Hardik Sharma',
      image: person1,
      quote: '“Special treat to dine, It was wow experience food was really delicious! outstanding dinner made by Mater chef, food experience was unforgettable”',
    },
    {
      name: 'Reecha Patel',
      image: person2,
      quote: '“Special treat to dine, It was wow experience food was really delicious! outstanding dinner made by Mater chef, food experience was unforgettable”',
    },
    {
      name: 'Parth Banker',
      image: person3,
      quote: '“Special treat to dine, It was wow experience food was really delicious! outstanding dinner made by Mater chef, food experience was unforgettable”',
    },
  ];

  const newsUpdates = [
    {
      title: 'Grand Opening of Our New Poolside Bar',
      description: 'Join us for exotic cocktails and live music every evening.',
      image: hotel1,
    },
    {
      title: 'Michelin Star for Our Signature Restaurant',
      description: 'Experience the award-winning menu crafted by our expert chefs.',
      image: hotel2,
    },
    {
      title: 'Weekend Spa Retreat Package',
      description: 'Rejuvenate with our new spa packages, available for a limited time.',
      image: hotel3,
    },
  ];

  const testimonialsPerPage = 3;
  const desktopSlides = Math.ceil(testimonials.length / testimonialsPerPage);

  return (
    <Box>
      {/* --- Desktop View --- */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        {/* Desktop: Hero and Search */}
        <Box sx={{ position: 'relative', mb: 12 }}>
          <Box
            sx={{
              height: 550,
              width: '100%',
              backgroundImage: `url(${coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(0,0,0,0.4)' }} />
            <Box sx={{ position: 'relative', zIndex: 2, pl: 10, color: 'white' }}>
              <Typography variant="h2" sx={{ fontWeight: 700, fontSize: '3.8rem', textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                Book With Best
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, fontSize: '2.2rem', textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                Luxury Hotel
              </Typography>
            </Box>
          </Box>
          <Paper
            elevation={6}
            sx={{
              position: 'absolute',
              bottom: -60,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '85%',
              maxWidth: 1200,
              zIndex: 3,
              borderRadius: '16px',
              p: 2,
              bgcolor: '#208c6c',
            }}
          >
            <Grid container alignItems="flex-end" spacing={1} display={'flex'} flexDirection={'row'} width={'100%'} flexWrap={'nowrap'}>
              <Grid item md><Typography component="label" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', display: 'block', mb: 0.5 }}>Check In</Typography><TextField type="date" variant="standard" fullWidth InputProps={{ disableUnderline: true, sx: { bgcolor: 'white', borderRadius: '4px', height: '48px', px: 1.5 } }} /></Grid>
              <Grid item><Divider orientation="vertical" sx={{ height: '48px', bgcolor: 'rgba(255,255,255,0.3)' }} /></Grid>
              <Grid item md><Typography component="label" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', display: 'block', mb: 0.5 }}>Check Out</Typography><TextField type="date" variant="standard" fullWidth InputProps={{ disableUnderline: true, sx: { bgcolor: 'white', borderRadius: '4px', height: '48px', px: 1.5 } }} /></Grid>
              <Grid item><Divider orientation="vertical" sx={{ height: '48px', bgcolor: 'rgba(255,255,255,0.3)' }} /></Grid>
              <Grid item md><Typography component="label" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', display: 'block', mb: 0.5 }}>Rooms</Typography><TextField type="number" variant="standard" fullWidth InputProps={{ disableUnderline: true, sx: { bgcolor: 'white', borderRadius: '4px', height: '48px', px: 1.5 } }} /></Grid>
              <Grid item><Divider orientation="vertical" sx={{ height: '48px', bgcolor: 'rgba(255,255,255,0.3)' }} /></Grid>
              <Grid item md><Typography component="label" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', display: 'block', mb: 0.5 }}>Adults</Typography><TextField type="number" variant="standard" fullWidth InputProps={{ disableUnderline: true, sx: { bgcolor: 'white', borderRadius: '4px', height: '48px', px: 1.5 } }} /></Grid>
              <Grid item><Divider orientation="vertical" sx={{ height: '48px', bgcolor: 'rgba(255,255,255,0.3)' }} /></Grid>
              <Grid item md><Typography component="label" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', display: 'block', mb: 0.5 }}>Children</Typography><TextField type="number" variant="standard" fullWidth InputProps={{ disableUnderline: true, sx: { bgcolor: 'white', borderRadius: '4px', height: '48px', px: 1.5 } }} /></Grid>
              <Grid item md="auto"><Button variant="contained" sx={{ height: '48px', bgcolor: 'white', color: '#208c6c', fontWeight: 600, '&:hover': { bgcolor: '#f0f0f0' }, px: 4, whiteSpace: 'nowrap' }}>Check Now</Button></Grid>
            </Grid>
          </Paper>
        </Box>
        {/* Desktop: World Class Luxury Hotel Section */}
        <Box sx={{ py: 6, bgcolor: 'white' }}>
          <Box sx={{ maxWidth: 1100, mx: 'auto', p: 4, bgcolor: '#eff3f2', borderRadius: '16px' }}>
            <Grid container alignItems="center" sx={{ display: 'flex', flexDirection: 'row' }}>
              <Grid item md={5} sx={{ flex: '0 0 41.666667%' }}><Box component="img" src={luxuryCityHotelImage} alt="Luxury hotel by the city" sx={{ width: '100%', borderRadius: '16px', display: 'block' }} /></Grid>
              <Grid item md={7} sx={{ flex: '0 0 58.333333%', pl: 5 }}><Typography variant="h5" component="h2" fontWeight="bold">World Class Luxury Hotel</Typography><Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 3 }}>Near City</Typography><Box><Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}><CheckCircle sx={{ color: '#208c6c', mr: 1.5 }} /><Typography variant="body1">24 Hour Emergency Service</Typography></Box><Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}><CheckCircle sx={{ color: '#208c6c', mr: 1.5 }} /><Typography variant="body1">Comfortable Atmosphere</Typography></Box><Box sx={{ display: 'flex', alignItems: 'center' }}><CheckCircle sx={{ color: '#208c6c', mr: 1.5 }} /><Typography variant="body1">Something By Accident</Typography></Box></Box></Grid>
            </Grid>
          </Box>
        </Box>
        {/* Desktop: Amenities Section */}
        <Box sx={{ py: 6, bgcolor: 'white' }}>
      <Box sx={{ maxWidth: 1100, mx: 'auto', textAlign: 'center' }}>
      <Box textAlign="center" sx={{ mb: 5 }}>
  <Typography variant="h4" component="h2">
    Get The Best
  </Typography>
  <Typography variant="h4" component="h2">
    <Box component="span" fontWeight="bold">STAYEASE</Box> Amenities
  </Typography>
</Box>


        <Grid container justifyContent="center" alignItems="flex-start">
          {/* ─── Left-hand connector column ─── */}
          <Grid item>
            <Box
              sx={{
                position: 'relative',
                height: 260,      // total height = 3 rows (80px each) + 2 gaps (16px each) = 272px 
                width: 80,
              }}
            >
              {/* vertical spine */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 20,        // down one gap + half of first row height (optional tweak)
                  bottom: 20,     // same as top
                  left: '10%',
                  width: '2px',
                  bgcolor: 'grey.300',
                }}
              />

              {/* horizontal branch to first row */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 20,
                  left: '10%',
                  width: 60,
                  height: '2px',
                  bgcolor: 'grey.300',
                }}
              />

              {/* horizontal branch to last row */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 20,
                  left: '10%',
                  width: 60,
                  height: '2px',
                  bgcolor: 'grey.300',
                }}
              />
            </Box>
          </Grid>

          {/* ─── 3×3 grid of amenities ─── */}
          <Grid item>
            <Grid
              container
              spacing={2}
              sx={{
                width: 600,            // adjust to taste (three columns + gaps)
                gridTemplateColumns: 'repeat(3, 1fr)',
                display: 'grid',
              }}
            >
              {amenities.map((text) => (
                <Grid item key={text}>
                  <Paper
                    elevation={0}
                    sx={{
                      height: 80,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: '#e8f5e9',
                      borderRadius: 2,
                    }}
                  >
                    <Typography textAlign="center">{text}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>        {/* Desktop: Luxury Rooms Section */}
        <Box sx={{ py: 6, bgcolor: '#f0f4ec' }}><Box sx={{ maxWidth: 1100, mx: 'auto', textAlign: 'center', px: 2 }}><Typography variant="h4" component="h2" sx={{ mb: 5 }}>Take A Look At Our Luxury Rooms</Typography><Grid container spacing={4} justifyContent={'center'}>{[...roomImages, ...roomImages.slice(0,3)].map((src, idx) => (<Grid item xs={12} sm={6} md={4} key={idx}><Box component="img" src={src} alt={`Luxury room ${idx + 1}`} sx={{ width: '300px', height: 200, objectFit: 'cover', borderRadius: '16px' }}/></Grid>))}</Grid></Box></Box>
        {/* Desktop: Video Section */}
        <Box sx={{ py: 10, bgcolor: '#eff3f2', position: 'relative', backgroundImage: `url(${hotel3})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(0,0,0,0.5)' }} />
            <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
                <IconButton onClick={handleOpen} sx={{ color: 'white' }}>
                    <PlayCircleOutlineIcon sx={{ fontSize: 60 }} />
                </IconButton>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 500 }}>Watch The Experience</Typography>
                <Typography variant="h5" component="p">Before you Feel It</Typography>
            </Box>
        </Box>

        {/* Desktop: New Hotel/Food Section */}
        <Box sx={{ py: 4, bgcolor: '#f0f4ec' }}>
          <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
            {/* First Row */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Box sx={{ width: '50%', pr: 2.5 }}>
                <Box component="img" src={hotelNearCity1} alt="Luxury Hotel Exterior" sx={{ width: '500px', borderRadius: '16px', height: "600px" }} />
              </Box>
              <Box sx={{ width: '50%', pl: 2.5 }}>
                <Typography variant="h4" fontWeight="bold">World Class Luxury Hotel</Typography>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>Near City</Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography>24 Hour Emergency Service</Typography></Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography>Comfortable Atmosphere</Typography></Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography>Something By Accident</Typography></Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography>It Is A Long Established Fact</Typography></Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography>Flexible and Cost-Effective</Typography></Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography>Get Free-Consultation Anytime</Typography></Box>
                  </Grid>
                </Grid>
                <Button variant="contained" sx={{ mt: 2, bgcolor: '#208c6c', '&:hover': { bgcolor: '#1a7558' } }}>Book Your Stay</Button>
              </Box>
            </Box>
            {/* Second Row */}
            <Grid container spacing={5} alignItems="center">
              <Grid item md={6}>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>Get the best Food in the town</Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography>24 Hour Emergency Service</Typography></Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography>Comfortable Atmosphere</Typography></Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography>Something By Accident</Typography></Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography>It Is A Long Established Fact</Typography></Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography>Flexible and Cost-Effective</Typography></Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography>Get Free-Consultation Anytime</Typography></Box>
                  </Grid>
                </Grid>
                <Button variant="contained" sx={{ mt: 2, bgcolor: '#208c6c', '&:hover': { bgcolor: '#1a7558' } }}>Book Your Stay</Button>
              </Grid>
              <Grid item md={6} pl={10}>
                <Box component="img" src={hotelNearCity2} alt="Hotel Pool Area" sx={{ width: '500px', borderRadius: '16px', height: "600px" }} />
              </Grid>
            </Grid>
          </Box>
        </Box>

       

        {/* Desktop: Explore Online Services Section */}
        <Box sx={{ position: 'relative', mt: 12 }}>
          <Box sx={{ bgcolor: '#208c6c', py: 10 }}>
            <Paper
              elevation={6}
              sx={{
                position: 'absolute',
                top: -60,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '70%',
                maxWidth: 900,
                zIndex: 3,
                borderRadius: '16px',
                p: 2,
              }}
            >
              <Grid container justifyContent="space-around" alignItems="center">
                <Grid item sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight="bold">350+</Typography>
                  <Typography variant="body2" color="textSecondary">Luxury Rooms</Typography>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ height: 60, alignSelf: 'center' }} />
                <Grid item sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight="bold">650+</Typography>
                  <Typography variant="body2" color="textSecondary">Regular Guest</Typography>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ height: 60, alignSelf: 'center' }} />
                <Grid item sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight="bold">100+</Typography>
                  <Typography variant="body2" color="textSecondary">Team Member</Typography>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ height: 60, alignSelf: 'center' }} />
                <Grid item sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight="bold">20+</Typography>
                  <Typography variant="body2" color="textSecondary">Sport Activities</Typography>
                </Grid>
              </Grid>
            </Paper>

            <Grid container sx={{ maxWidth: 1100, mx: 'auto', color: 'white', px: 4, mt: 8 }}>
              <Grid item md={5}>
                <Typography variant="h4" fontWeight="bold">Explore Online</Typography>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>Services & resources</Typography>
                <Button variant="contained" sx={{ bgcolor: 'white', color: '#208c6c', fontWeight: 600, '&:hover': { bgcolor: '#f0f0f0' }, px: 4, py: 1.5 }}>
                  View All Services
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ bgcolor: 'white', height: 150 }} />
          <Box
            sx={{
              position: 'absolute',
              bottom: 40,
              right: 180, 
              width: '40%',
              maxWidth: 500,
              zIndex: 4,
              display: 'flex',
            }}
          >
            <Paper sx={{ bgcolor: 'rgba(0,0,0,0.8)', color: 'white', p: 3, width: '50%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}><CheckCircle sx={{ color: 'white', mr: 1.5, fontSize: '1.2rem' }} /><Typography variant="body2">It Is A Long Established Fact</Typography></Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}><CheckCircle sx={{ color: 'white', mr: 1.5, fontSize: '1.2rem' }} /><Typography variant="body2">Many Desktop Publishing</Typography></Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}><CheckCircle sx={{ color: 'white', mr: 1.5, fontSize: '1.2rem' }} /><Typography variant="body2">Something by accident</Typography></Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}><CheckCircle sx={{ color: 'white', mr: 1.5, fontSize: '1.2rem' }} /><Typography variant="body2">Many Desktop Publishing</Typography></Box>
            </Paper>
            <Paper sx={{ bgcolor: '#d4b257', color: 'black', p: 3, width: '50%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}><CheckCircle sx={{ color: 'black', mr: 1.5, fontSize: '1.2rem' }} /><Typography variant="body2">It Is A Long Established Fact</Typography></Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}><CheckCircle sx={{ color: 'black', mr: 1.5, fontSize: '1.2rem' }} /><Typography variant="body2">Many Desktop Publishing</Typography></Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}><CheckCircle sx={{ color: 'black', mr: 1.5, fontSize: '1.2rem' }} /><Typography variant="body2">Something by accident</Typography></Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}><CheckCircle sx={{ color: 'black', mr: 1.5, fontSize: '1.2rem' }} /><Typography variant="body2">It Is A Long Established Fact</Typography></Box>
            </Paper>
          </Box>
        </Box>

        {/* Desktop: Testimonials Section */}
        <Box sx={{ py: 6, bgcolor: 'white', textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>What Customer Says</Typography>
          <Divider sx={{ width: '60px', mx: 'auto', mb: 5, borderWidth: '2px', borderColor: 'black' }} />
          <Grid container spacing={4} sx={{ maxWidth: 1100, mx: 'auto', justifyContent: 'center', display: 'flex', flexWrap: 'nowrap'}}>
            {/* Testimonial 1 */}
            <Grid item md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper
                  elevation={0}
                  sx={{
                    position: 'relative',
                    bgcolor: '#e8f5e9',
                    p: 3,
                    borderRadius: '16px',
                    mb: 4,
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      borderWidth: '20px 20px 0',
                      borderStyle: 'solid',
                      borderColor: '#e8f5e9 transparent transparent transparent',
                    },
                  }}
                >
                  <Rating value={5} readOnly sx={{ mb: 1, color: '#fdd835' }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    {testimonials[0].quote}
                  </Typography>
                </Paper>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                  <Avatar src={testimonials[0].image} alt={testimonials[0].name} sx={{ width: 80, height: 80, mb: 2 }} />
                  <Typography variant="h6" fontWeight="bold">
                    {testimonials[0].name.split(' ')[0]}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {testimonials[0].name.split(' ').slice(1).join(' ')}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {/* Testimonial 2 */}
            <Grid item md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper
                  elevation={0}
                  sx={{
                    position: 'relative',
                    bgcolor: '#e8f5e9',
                    p: 3,
                    borderRadius: '16px',
                    mb: 4,
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      borderWidth: '20px 20px 0',
                      borderStyle: 'solid',
                      borderColor: '#e8f5e9 transparent transparent transparent',
                    },
                  }}
                >
                  <Rating value={5} readOnly sx={{ mb: 1, color: '#fdd835' }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    {testimonials[1].quote}
                  </Typography>
                </Paper>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                  <Avatar src={testimonials[1].image} alt={testimonials[1].name} sx={{ width: 80, height: 80, mb: 2 }} />
                  <Typography variant="h6" fontWeight="bold">
                    {testimonials[1].name.split(' ')[0]}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {testimonials[1].name.split(' ').slice(1).join(' ')}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {/* Testimonial 3 */}
            <Grid item md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper
                  elevation={0}
                  sx={{
                    position: 'relative',
                    bgcolor: '#e8f5e9',
                    p: 3,
                    borderRadius: '16px',
                    mb: 4,
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      borderWidth: '20px 20px 0',
                      borderStyle: 'solid',
                      borderColor: '#e8f5e9 transparent transparent transparent',
                    },
                  }}
                >
                  <Rating value={5} readOnly sx={{ mb: 1, color: '#fdd835' }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    {testimonials[2].quote}
                  </Typography>
                </Paper>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                  <Avatar src={testimonials[2].image} alt={testimonials[2].name} sx={{ width: 80, height: 80, mb: 2 }} />
                  <Typography variant="h6" fontWeight="bold">
                    {testimonials[2].name.split(' ')[0]}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {testimonials[2].name.split(' ').slice(1).join(' ')}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Desktop: Latest News Update Section */}
        <Box sx={{ py: 6, bgcolor: '#eff3f2' }}>
          <Box sx={{ maxWidth: 1100, mx: 'auto', textAlign: 'center' }}>
            <Typography variant="h4" component="h2" sx={{ mb: 5, fontWeight: 'bold' }}>
              Latest News Update
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {newsUpdates.map((news, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Box sx={{ position: 'relative', width: 280, height: 220, mx: 'auto', mb: 8 }}>
                    <Box
                      component="img"
                      src={news.image}
                      alt={news.title}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '16px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                      }}
                    />
                    <Paper
                      elevation={6}
                      sx={{
                        position: 'absolute',
                        bottom: -60,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '90%',
                        p: 2,
                        borderRadius: '16px',
                        bgcolor: 'rgba(255, 255, 255, 0.85)',
                        backdropFilter: 'blur(10px)',
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', fontSize: '1rem', mb: 0.5 }}>
                        {news.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                        {news.description}
                      </Typography>
                    </Paper>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>

      {/* --- Mobile View --- */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        {/* Mobile Hero + Search */}
        <Box sx={{ mb: 4 }}><Box sx={{ position: 'relative', height: 380, width: '100%', backgroundImage: `url(${coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}><Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.4)', zIndex: 1 }} /><Box sx={{ position: 'relative', zIndex: 2, height: '100%', px: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'white' }}><Typography variant="h4" sx={{ fontWeight: 700, textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>Book With Best</Typography><Typography variant="h6" sx={{ fontWeight: 600, textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>Luxury Hotel</Typography></Box></Box><Box sx={{ mt: -12, px: 2, position: 'relative', zIndex: 5, display: 'flex', justifyContent: 'center' }}><Paper elevation={6} sx={{ width: '100%', bgcolor: '#208c6c', borderRadius: '16px', p: 2 }}><Grid container spacing={2} display={'flex'} width={'100%'} flexWrap={'nowrap'} flexDirection={'column'}>{[ { label: 'Check In', type: 'date' }, { label: 'Check Out', type: 'date' }, { label: 'Rooms', type: 'number' }, { label: 'Adults', type: 'number' }, { label: 'Children', type: 'number' }, ].map(({ label, type }) => (<Grid item xs={12} key={label}><TextField placeholder={label} type={type} fullWidth InputLabelProps={type === 'date' ? { shrink: true } : undefined} sx={{ bgcolor: 'white', borderRadius: 1, '& .MuiOutlinedInput-root > fieldset': { border: 'none' } }}/></Grid>))}<Grid item xs={12} sx={{ textAlign: 'center' }}><Button variant="contained" sx={{ height: '56px', bgcolor: 'white', color: '#208c6c', fontWeight: 600, '&:hover': { bgcolor: '#f0f0f0' }, px: 6 }}>Check Now</Button></Grid></Grid></Paper></Box></Box>
        {/* Mobile: World Class Luxury Hotel Section */}
        <Box sx={{ py: 4, bgcolor: '#f0f4ec' }}><Box sx={{ px: 2 }}><Box component="img" src={luxuryCityHotelImage} alt="Luxury hotel by the city" sx={{ width: '100%', borderRadius: '16px', mb: 3, display: 'block', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}/><Typography variant="h5" fontWeight="bold">World Class Luxury Hotel</Typography><Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>Near City</Typography>{['24 Hour Emergency Service', 'Comfortable Atmosphere', 'Something By Accident'].map((text) => (<Box key={text} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}><CheckCircle sx={{ color: '#208c6c', mr: 1.5 }} /><Typography variant="body1">{text}</Typography></Box>))}</Box></Box>
        {/* Mobile: Amenities Section */}
        <Box sx={{ py: 4, bgcolor: '#f8f9fa' }}><Box sx={{ textAlign: 'center', mb: 4, px: 2 }}><Typography variant="h4" component="h2" sx={{ mb: 1 }}>Get The Best</Typography><Typography variant="h4" component="h2" fontWeight="bold">STAYEASE Amenities</Typography></Box><Grid container spacing={3} justifyContent="center" sx={{ px: 2, maxWidth: 1600, mx: 'auto' }}>{amenities.slice(0, 8).map((text) => (<Grid item xs={3} key={text}><Paper elevation={0} sx={{ bgcolor: '#e8f5e9', borderRadius: 2, px: 2, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography align="center">{text}</Typography></Paper></Grid>))}</Grid></Box>
        {/* Mobile: Luxury Rooms Section */}
        <Box sx={{ px: 2, py: 4, textAlign: 'center', justifyContent: 'center', alignItems: 'center', bgcolor: '#f0f4ec' }}><Typography variant="h5" component="h2" sx={{ mb: 3 }}>Take A Look At Our Luxury Rooms</Typography><Grid justifyContent={'center'} alignContent={'center'} alignItems={'center'} container spacing={2}>{[...roomImages, ...roomImages.slice(0,2)].map((img, index) => (<Grid item  xs={6} key={index}><Box component="img" src={img} alt={`Luxury room ${index + 1}`} sx={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '16px' }}/></Grid>))}</Grid></Box>
        {/* Mobile: Video Section */}
        <Box sx={{ py: 8, bgcolor: '#eff3f2', position: 'relative', backgroundImage: `url(${hotel3})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(0,0,0,0.5)' }} />
            <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
                <IconButton onClick={handleOpen} sx={{ color: 'white' }}>
                    <PlayCircleOutlineIcon sx={{ fontSize: 50 }} />
                </IconButton>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 500 }}>Watch The Experience</Typography>
                <Typography variant="h6" component="p">Before you Feel It</Typography>
            </Box>
        </Box>

        {/* Mobile: New Hotel/Food Section */}
        <Box sx={{ py: 4, bgcolor: '#eff3f2', px: 2 }}>
          {/* First Part */}
          <Box sx={{ mb: 3 }}>
            <Box component="img" src={hotelNearCity1} alt="Luxury Hotel Exterior" sx={{ width: '100%', borderRadius: '16px', mb: 1.5 }} />
            <Typography variant="h5" fontWeight="bold">World Class Luxury Hotel</Typography>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1.5 }}>Near City</Typography>
            <Box sx={{ mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography variant="body2">24 Hour Emergency Service</Typography></Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography variant="body2">Comfortable Atmosphere</Typography></Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography variant="body2">Something By Accident</Typography></Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography variant="body2">It Is A Long Established Fact</Typography></Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography variant="body2">Flexible and Cost-Effective</Typography></Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography variant="body2">Get Free-Consultation Anytime</Typography></Box>
            </Box>
            <Button variant="contained" sx={{ bgcolor: '#208c6c', '&:hover': { bgcolor: '#1a7558' } }}>Book Your Stay</Button>
          </Box>
          {/* Second Part */}
          <Box>
            <Box component="img" src={hotelNearCity2} alt="Hotel Pool Area" sx={{ width: '100%', borderRadius: '16px', mb: 1.5 }} />
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1.5 }}>Get the best Food in the town</Typography>
             <Box sx={{ mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography variant="body2">24 Hour Emergency Service</Typography></Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography variant="body2">Comfortable Atmosphere</Typography></Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography variant="body2">Something By Accident</Typography></Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography variant="body2">It Is A Long Established Fact</Typography></Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography variant="body2">Flexible and Cost-Effective</Typography></Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: '#208c6c', mr: 1 }} /><Typography variant="body2">Get Free-Consultation Anytime</Typography></Box>
            </Box>
            <Button variant="contained" sx={{ bgcolor: '#208c6c', '&:hover': { bgcolor: '#1a7558' } }}>Book Your Stay</Button>
          </Box>
        </Box>



        {/* Mobile: Explore Online Services Section */}
        <Box sx={{ bgcolor: '#208c6c', py: 5, px: 2, textAlign: 'center' }}>
          <Paper elevation={3} sx={{ p: 2, mb: 4, borderRadius: '16px' }}>
            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold">350+</Typography>
                <Typography variant="caption" color="textSecondary">Luxury Rooms</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold">650+</Typography>
                <Typography variant="caption" color="textSecondary">Regular Guest</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold">100+</Typography>
                <Typography variant="caption" color="textSecondary">Team Member</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold">20+</Typography>
                <Typography variant="caption" color="textSecondary">Sport Activities</Typography>
              </Grid>
            </Grid>
          </Paper>

          <Box sx={{ color: 'white', mb: 4 }}>
            <Typography variant="h5" fontWeight="bold">Explore Online</Typography>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>Services & resources</Typography>
            <Button variant="contained" sx={{ bgcolor: 'white', color: '#208c6c', fontWeight: 600, '&:hover': { bgcolor: '#f0f0f0' }}}>
              View All Services
            </Button>
          </Box>

          <Grid container spacing={2} justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
            <Grid item xs={12}>
              <Paper sx={{ bgcolor: 'rgba(0,0,0,0.8)', color: 'white', p: 2, borderRadius: '16px', textAlign: 'left' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: 'white', mr: 1, fontSize: '1.1rem' }} /><Typography variant="body2">It Is A Long Established Fact</Typography></Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: 'white', mr: 1, fontSize: '1.1rem' }} /><Typography variant="body2">Many Desktop Publishing</Typography></Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: 'white', mr: 1, fontSize: '1.1rem' }} /><Typography variant="body2">Something by accident</Typography></Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}><CheckCircle sx={{ color: 'white', mr: 1, fontSize: '1.1rem' }} /><Typography variant="body2">Many Desktop Publishing</Typography></Box>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ bgcolor: '#d4b257', color: 'black', p: 2, borderRadius: '16px', textAlign: 'left' }}>
                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: 'black', mr: 1, fontSize: '1.1rem' }} /><Typography variant="body2">It Is A Long Established Fact</Typography></Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: 'black', mr: 1, fontSize: '1.1rem' }} /><Typography variant="body2">Many Desktop Publishing</Typography></Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircle sx={{ color: 'black', mr: 1, fontSize: '1.1rem' }} /><Typography variant="body2">Something by accident</Typography></Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}><CheckCircle sx={{ color: 'black', mr: 1, fontSize: '1.1rem' }} /><Typography variant="body2">It Is A Long Established Fact</Typography></Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>


                {/* Mobile: Testimonials Section */}
                <Box sx={{ py: 4, bgcolor: 'white', textAlign: 'center', px: 2 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>What Customer Says</Typography>
          <Divider sx={{ width: '50px', mx: 'auto', mb: 4, borderWidth: '1.5px', borderColor: 'black' }} />
          <Box>
            <Paper
              elevation={0}
              sx={{
                position: 'relative',
                bgcolor: '#f0f4f7',
                p: 2,
                borderRadius: '12px',
                mb: 2,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  borderWidth: '15px 15px 0',
                  borderStyle: 'solid',
                  borderColor: '#f0f4f7 transparent transparent transparent',
                },
              }}
            >
              <Rating value={5} readOnly sx={{ mb: 1, color: '#fdd835' }} />
              <Typography variant="body2" color="textSecondary">{testimonials[activeTestimonial].quote}</Typography>
            </Paper>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3 }}>
              <Avatar src={testimonials[activeTestimonial].image} alt={testimonials[activeTestimonial].name} sx={{ width: 50, height: 50, mr: 2 }} />
              <Typography variant="h6" fontWeight="bold">{testimonials[activeTestimonial].name}</Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            {testimonials.map((_, index) => (
              <IconButton key={index} size="small" onClick={() => setActiveTestimonial(index)}>
                <CircleIcon sx={{ fontSize: 10, color: activeTestimonial === index ? 'black' : 'grey.300' }} />
              </IconButton>
            ))}
          </Box>
        </Box>

        {/* Mobile: Latest News Update Section */}
        <Box sx={{ py: 4, bgcolor: '#eff3f2' }}>
          <Box sx={{ px: 2, textAlign: 'center' }}>
            <Typography variant="h5" component="h2" sx={{ mb: 4, fontWeight: 'bold' }}>
              Latest News Update
            </Typography>
            <Stack spacing={14} width={'100%'} justifyContent={'center'} display={'flex'} alignItems={'center'}>
              {newsUpdates.map((news, index) => (
                <Box key={index} sx={{ position: 'relative', width: '90%', maxWidth: 280, height: 220, mx: 'auto', }}>
                  <Box
                    component="img"
                    src={news.image}
                    alt={news.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '16px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    }}
                  />
                  <Paper
                    elevation={6}
                    sx={{
                      position: 'absolute',
                      bottom: -60,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '90%',
                      p: 2,
                      borderRadius: '16px',
                      bgcolor: 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(10px)',
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', fontSize: '1rem', mb: 0.5 }}>
                      {news.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                      {news.description}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>

      <Modal open={open} onClose={handleClose} aria-labelledby="video-modal-title" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ width: '80%', maxWidth: 900, height: 'auto', aspectRatio: '16/9' }}>
          <ReactPlayer url="https://youtu.be/_PO-5v5lJNs?si=Nm9ue0mo-CiLA7Gl" width="100%" height="100%" playing={open} controls />
        </Box>
      </Modal>
      <Footer />
    </Box>
  );
};

export default HomePage;