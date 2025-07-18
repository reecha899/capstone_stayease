import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Container, Breadcrumbs, Link, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import coverImage from '../assets/home-page-cover-image.png';
import Footer from '../components/Footer';
import ReactPlayer from 'react-player/youtube';

const AboutUs = () => {
  const navigate = useNavigate();

  // Mobile slider state and effect (fix for hooks-in-render error)
  const images = [
    { src: require('../assets/great-customer.png'), alt: 'great-customer' },
    { src: require('../assets/swimming-pool.png'), alt: 'swimming-pool' },
    { src: require('../assets/hotel-gym.png'), alt: 'hotel-gym' },
  ];
  // --- Card-style mobile slider state and logic ---
  const cardWidthVW = 70;
  const cardGapPx = 16;
  // --- Robust mobile slider logic ---
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef();
  useEffect(() => { setCurrent(0); }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [images.length]);
  useEffect(() => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollTo({
      left: current * sliderRef.current.offsetWidth,
      behavior: 'smooth'
    });
  }, [current]);
  useEffect(() => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    let isTouching = false;
    let scrollTimeout;
    const onTouchStart = () => { isTouching = true; };
    const onTouchEnd = () => {
      isTouching = false;
      snapToCard();
    };
    const onScroll = () => {
      if (!isTouching) return;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (!isTouching) snapToCard();
      }, 100);
    };
    function snapToCard() {
      const idx = Math.round(container.scrollLeft / container.offsetWidth);
      setCurrent(idx);
    }
    container.addEventListener('touchstart', onTouchStart);
    container.addEventListener('touchend', onTouchEnd);
    container.addEventListener('scroll', onScroll);
    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimeout);
    };
  }, [images.length]);

  // Always start from the first image on mount
  useEffect(() => { setCurrent(0); }, []);

  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
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

      {/* Outdoor Activities Section - Desktop & Mobile Responsive */}
      <Box
        sx={{
          width: '100%',
          bgcolor: '#f2f8f6',
          py: { xs: 4, md: 8 },
          mb: 4,
        }}
      >
        {/* Desktop Layout */}
        <Box
          sx={{
            maxWidth: '1400px',
            mx: 'auto',
            display: { xs: 'none', md: 'flex' },
            borderRadius: 4,
            p: 5,
            alignItems: 'center',
            position: 'relative',
            minHeight: 350,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" fontWeight="bold" mb={2} color="#222">
              We Provide Outdoor Activities<br />TO All Visitors
            </Typography>
            <Box sx={{ display: 'flex', gap: 6, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span role="img" aria-label="pool" style={{ fontSize: 32 }}>🏊‍♂️</span>
                <Box>
                  <Typography fontWeight="bold">The Best Swimming Pool</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span role="img" aria-label="gym" style={{ fontSize: 32 }}>🏋️‍♂️</span>
                <Box>
                  <Typography fontWeight="bold">The Best Gym</Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              {[1,2,3].map((i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <span role="img" aria-label="check" style={{ color: '#2ecc71', fontSize: 22, marginRight: 8 }}>✅</span>
                  <Typography sx={{ color: '#222', fontSize: 15 }}>
                    It is a long fact that a reader will be distracted by the readable
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          {/* Images on the right - Clustered Overlap */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', minHeight: 420, minWidth: 420 }}>
            {/* Cluster container */}
            <Box sx={{ position: 'relative', width: 360, height: 380 }}>
              {/* Greeting image (taller) */}
              <Box sx={{ position: 'absolute', right: 0, top: 0, width: 200, height: 260, borderRadius: 6, overflow: 'hidden', boxShadow: 4, zIndex: 1 }}>
                <img src={require('../assets/great-customer.png')} alt="great-customer" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 20 }} />
              </Box>
              {/* Gym image (overlapping greeting) */}
              <Box sx={{ position: 'absolute', right: 60, top: 190, width: 130, height: 130, borderRadius: 6, overflow: 'hidden', boxShadow: 4, border: '5px solid #fff', zIndex: 4 }}>
                <img src={require('../assets/hotel-gym.png')} alt="hotel-gym" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16 }} />
              </Box>
              {/* Pool image (overlapping both) */}
              <Box sx={{ position: 'absolute', left: 20, bottom: 10, width: 200,right: 130, height: 220, borderRadius: 6, overflow: 'hidden', boxShadow: 4, zIndex: 3 }}>
                <img src={require('../assets/swimming-pool.png')} alt="swimming-pool" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 20 }} />
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Mobile Layout */}

        <Box
       sx= {{
        width: '100%',
        display: 'flex'
       }}
       >
        <Box
          sx={{
            width: '100%',
            display: { xs: 'block', md: 'none' },
            borderRadius: 3,
            p: 2,
            mt: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2} color="#222" sx={{ fontSize: '1.3rem' }}>
            We Provide Outdoor Activities TO All Visitors
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span role="img" aria-label="pool" style={{ fontSize: 24 }}>🏊‍♂️</span>
              <Typography fontWeight="bold" sx={{ fontSize: 15 }}>The Best Swimming Pool</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span role="img" aria-label="gym" style={{ fontSize: 24 }}>🏋️‍♂️</span>
              <Typography fontWeight="bold" sx={{ fontSize: 15 }}>The Best Gym</Typography>
            </Box>
          </Box>
          <Box>
            {[1,2,3].map((i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <span role="img" aria-label="check" style={{ color: '#2ecc71', fontSize: 18, marginRight: 6 }}>✅</span>
                <Typography sx={{ color: '#222', fontSize: 13 }}>
                  It is a long fact that a reader will be distracted by the readable
                </Typography>
              </Box>
            ))}
          </Box>
          {/* Mobile Image Full-Width Slider (robust, one image visible at a time) */}
          <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 2, width: '100%', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <Box
              ref={sliderRef}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                width: '100%',
                height: 220,
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
                touchAction: 'pan-x',
                cursor: 'grab',
                p: 0,
                m: 0,
                gap: 0,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              {images.map((img, idx) => (
                <Box
                  key={img.alt}
                  sx={{
                    flex: '0 0 100%',
                    width: '100%',
                    maxWidth: '100%',
                    height: 220,
                    scrollSnapAlign: 'center',
                    transition: 'transform 0.4s, opacity 0.4s',
                    transform: idx === current ? 'scale(1)' : 'scale(0.95)',
                    opacity: idx === current ? 1 : 0.7,
                    zIndex: idx === current ? 2 : 1,
                    boxShadow: idx === current ? 4 : 1,
                    borderRadius: 16,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#fff',
                    p: 0,
                    m: 0,
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16, display: 'block' }}
                  />
                </Box>
              ))}
            </Box>
            {/* Left/Right arrows for manual navigation */}
            <Box sx={{ position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%)', zIndex: 10 }}>
              <button
                aria-label="Previous"
                style={{ background: 'rgba(255,255,255,0.7)', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
                onClick={() => {
                  setCurrent((prev) => (prev - 1 + images.length) % images.length);
                }}
              >
                &#8592;
              </button>
            </Box>
            <Box sx={{ position: 'absolute', top: '50%', right: 12, transform: 'translateY(-50%)', zIndex: 10 }}>
              <button
                aria-label="Next"
                style={{ background: 'rgba(255,255,255,0.7)', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
                onClick={() => {
                  setCurrent((prev) => (prev + 1) % images.length);
                }}
              >
                &#8594;
              </button>
            </Box>
          </Box>
        </Box>
       </Box>
        
      </Box>

      {/* Stats Section - Desktop & Mobile Responsive */}
      <Box sx={{ width: '100%', bgcolor: '#22987a', py: { xs: 4, md: 6 }, mt: 4 }}>
        {/* Desktop Layout */}
        <Box sx={{
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'space-around',
          alignItems: 'center',
          maxWidth: '1200px',
          mx: 'auto',
        }}>
          {[{
            value: '350+', label: 'Luxury Rooms'
          }, {
            value: '650+', label: 'Regular Guest'
          }, {
            value: '100+', label: 'Team Member'
          }, {
            value: '20+', label: 'Sport Activities'
          }].map((stat, idx, arr) => (
            <React.Fragment key={stat.label}>
              <Box sx={{ textAlign: 'center', flex: 1 }}>
                <Typography variant="h5" fontWeight="bold" color="#111" sx={{ fontSize: 28, justifyContent: 'start', alignContent: 'start', textAlign: 'start', paddingLeft: 3 }}>{stat.value}</Typography>
                <Typography variant="h6" fontWeight="bold" color="#111" sx={{ fontSize: 18, justifyContent: 'start', alignContent: 'start', textAlign: 'start', paddingLeft: 3  }}>{stat.label}</Typography>
              </Box>
              {idx < arr.length - 1 && (
                <Divider orientation="vertical" flexItem sx={{ mx: 4, my: 2, borderRightWidth: 2, height: 80, bgcolor: 'rgba(0,0,0,0.18)' }} />
              )}
            </React.Fragment>
          ))}
        </Box>
        {/* Mobile Layout */}
        
        <Box sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          width: '100%',
          px: 2,
        }}>
          {[{
            value: '350+', label: 'Luxury Rooms'
          }, {
            value: '650+', label: 'Regular Guest'
          }, {
            value: '100+', label: 'Team Member'
          }, {
            value: '20+', label: 'Sport Activities'
          }].map((stat, idx, arr) => (
            <React.Fragment key={stat.label}>
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              <Typography variant="h5" fontWeight="bold" color="#111" sx={{ fontSize: 24 }}>{stat.value}</Typography>
              <Typography variant="h6" fontWeight="bold" color="#111" sx={{ fontSize: 16 }}>{stat.label}</Typography>
            </Box>

            {idx < arr.length - 1 && (
                <Divider orientation="horizontal" flexItem sx={{ display: 'flex', width: '80%', bgcolor: 'rgba(0,0,0,0.18)' }} />
              )}
            </React.Fragment>
            
          ))}
        </Box>
      </Box>

      {/* Why Choose Us Section - Desktop & Mobile Responsive */}
      <Box
        sx={{
          width: '100%',
          bgcolor: '#f8f9fa',
          py: { xs: 4, md: 8 },
          mb: 4,
        }}
      >
        {/* Desktop Layout */}
        <Box
          sx={{
            maxWidth: '1400px',
            mx: 'auto',
            display: { xs: 'none', md: 'flex' },
            borderRadius: 4,
            p: 5,
            alignItems: 'center',
            position: 'relative',
            minHeight: 400,
            gap: 6,
          }}
        >
          {/* Left Section - Text and Data */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" fontWeight="bold" mb={4} color="#222">
              Why Choose Us?
            </Typography>
            
                         {/* Services */}
             <Box sx={{ mb: 3 }}>
               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                 <Typography fontWeight="bold" color="#222">Services</Typography>
                 <Typography fontWeight="bold" color="#22987a">95%</Typography>
               </Box>
               <Box sx={{ width: '100%', height: 8, bgcolor: '#e9ecef', borderRadius: 4, overflow: 'hidden' }}>
                 <Box sx={{ width: '95%', height: '100%', bgcolor: '#22987a', borderRadius: 4 }} />
               </Box>
             </Box>

             {/* Activities */}
             <Box sx={{ mb: 3 }}>
               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                 <Typography fontWeight="bold" color="#222">Activities</Typography>
                 <Typography fontWeight="bold" color="#22987a">85%</Typography>
               </Box>
               <Box sx={{ width: '100%', height: 8, bgcolor: '#e9ecef', borderRadius: 4, overflow: 'hidden' }}>
                 <Box sx={{ width: '85%', height: '100%', bgcolor: '#22987a', borderRadius: 4 }} />
               </Box>
             </Box>

             {/* Sports Activities */}
             <Box sx={{ mb: 3 }}>
               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                 <Typography fontWeight="bold" color="#222">Sports Activities</Typography>
                 <Typography fontWeight="bold" color="#22987a">90%</Typography>
               </Box>
               <Box sx={{ width: '100%', height: 8, bgcolor: '#e9ecef', borderRadius: 4, overflow: 'hidden' }}>
                 <Box sx={{ width: '90%', height: '100%', bgcolor: '#22987a', borderRadius: 4 }} />
               </Box>
             </Box>

             {/* Rooms */}
             <Box sx={{ mb: 3 }}>
               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                 <Typography fontWeight="bold" color="#222">Rooms</Typography>
                 <Typography fontWeight="bold" color="#22987a">98%</Typography>
               </Box>
               <Box sx={{ width: '100%', height: 8, bgcolor: '#e9ecef', borderRadius: 4, overflow: 'hidden' }}>
                 <Box sx={{ width: '98%', height: '100%', bgcolor: '#22987a', borderRadius: 4 }} />
               </Box>
             </Box>
          </Box>

          {/* Right Section - Images */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', minHeight: 400 }}>
            {/* Main Image - Balcony View */}
            <Box sx={{ position: 'relative', width: 300, height: 400, borderRadius: 6, overflow: 'hidden', boxShadow: 4 }}>
              <img 
                src={require('../assets/hotel-balcony-view.png')} 
                alt="Balcony view with beach and ocean" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 24 }} 
              />
            </Box>
            
            {/* Overlay Image - Hotel Room with Breakfast */}
            <Box sx={{ 
              position: 'absolute', 
              bottom: 30, 
              left: 40, 
              width: 150, 
              height: 150, 
              borderRadius: 3, 
              overflow: 'hidden', 
              boxShadow: 4, 
              zIndex: 2
            }}>
              <img 
                src={require('../assets/hotel-bedroom-view.png')} 
                alt="Hotel room with breakfast" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16 }} 
              />
            </Box>
          </Box>
        </Box>

        {/* Mobile Layout */}
       <Box
       sx= {{
        width: '100%',
        display: 'flex'
       }}
       >
       <Box
          sx={{
            width: '100%',
            display: { xs: 'block', md: 'none' },
            borderRadius: 3,
            p: 3,
            mt: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={3} color="#222" sx={{ fontSize: '1.5rem', textAlign: 'center' }}>
            Why Choose Us?
          </Typography>
          
                     {/* Mobile Progress Bars */}
           <Box sx={{ mb: 4, width: '100%' }}>
             {/* Services */}
             <Box sx={{ mb: 3 }}>
               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                 <Typography fontWeight="bold" color="#222" sx={{ fontSize: 14 }}>Services</Typography>
                 <Typography fontWeight="bold" color="#22987a" sx={{ fontSize: 14 }}>95%</Typography>
               </Box>
               <Box sx={{ width: '100%', height: 6, bgcolor: '#e9ecef', borderRadius: 3, overflow: 'hidden' }}>
                 <Box sx={{ width: '95%', height: '100%', bgcolor: '#22987a', borderRadius: 3 }} />
               </Box>
             </Box>

             {/* Activities */}
             <Box sx={{ mb: 3 }}>
               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                 <Typography fontWeight="bold" color="#222" sx={{ fontSize: 14 }}>Activities</Typography>
                 <Typography fontWeight="bold" color="#22987a" sx={{ fontSize: 14 }}>85%</Typography>
               </Box>
               <Box sx={{ width: '100%', height: 6, bgcolor: '#e9ecef', borderRadius: 3, overflow: 'hidden' }}>
                 <Box sx={{ width: '85%', height: '100%', bgcolor: '#22987a', borderRadius: 3 }} />
               </Box>
             </Box>

             {/* Sports Activities */}
             <Box sx={{ mb: 3 }}>
               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                 <Typography fontWeight="bold" color="#222" sx={{ fontSize: 14 }}>Sports Activities</Typography>
                 <Typography fontWeight="bold" color="#22987a" sx={{ fontSize: 14 }}>90%</Typography>
               </Box>
               <Box sx={{ width: '100%', height: 6, bgcolor: '#e9ecef', borderRadius: 3, overflow: 'hidden' }}>
                 <Box sx={{ width: '90%', height: '100%', bgcolor: '#22987a', borderRadius: 3 }} />
               </Box>
             </Box>

             {/* Rooms */}
             <Box sx={{ mb: 3 }}>
               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                 <Typography fontWeight="bold" color="#222" sx={{ fontSize: 14 }}>Rooms</Typography>
                 <Typography fontWeight="bold" color="#22987a" sx={{ fontSize: 14 }}>98%</Typography>
               </Box>
               <Box sx={{ width: '100%', height: 6, bgcolor: '#e9ecef', borderRadius: 3, overflow: 'hidden' }}>
                 <Box sx={{ width: '98%', height: '100%', bgcolor: '#22987a', borderRadius: 3 }} />
               </Box>
             </Box>
           </Box>

                     {/* Mobile Images - Clear & Attractive Layout */}
           <Box sx={{ 
             position: 'relative',
             mt: 4,
             height: 450,
             width: '100%',
             mx: 'auto'
           }}>
             {/* Main Large Image - Clear Background */}
             <Box sx={{ 
               position: 'absolute',
               top: 0,
               left: 0,
               width: '100%',
               height: '100%',
               borderRadius: 28, 
               overflow: 'hidden', 
               boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
               background: '#ffffff',
               '&:hover': {
                 transform: 'scale(1.02)',
                 transition: 'all 0.4s ease-in-out'
               }
             }}>
               <img 
                 src={require('../assets/hotel-balcony-view.png')} 
                 alt="Balcony view with beach and ocean" 
                 style={{ 
                   width: '100%', 
                   height: '100%', 
                   objectFit: 'cover',
                   filter: 'brightness(1.2) contrast(1.2) saturate(1.1)',
                 }} 
               />
               
               {/* Subtle Gradient Overlay for Clarity */}
               <Box sx={{
                 position: 'absolute',
                 top: 0,
                 left: 0,
                 right: 0,
                 bottom: 0,
                 background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
                 pointerEvents: 'none'
               }} />
             </Box>

             {/* Large Floating Secondary Image - Top Right */}
             <Box sx={{ 
               position: 'absolute',
               top: 25,
               right: 25,
               width: 140,
               height: 110,
               borderRadius: 20, 
               overflow: 'hidden', 
               boxShadow: '0 12px 35px rgba(0,0,0,0.3)',
               border: '4px solid white',
               transform: 'rotate(5deg)',
               zIndex: 3,
               '&:hover': {
                 transform: 'rotate(0deg) scale(1.15)',
                 transition: 'all 0.3s ease-in-out',
                 zIndex: 5
               }
             }}>
               <img 
                 src={require('../assets/hotel-bedroom-view.png')} 
                 alt="Hotel room with breakfast" 
                 style={{ 
                   width: '100%', 
                   height: '100%', 
                   objectFit: 'cover',
                   filter: 'brightness(1.15) contrast(1.2)'
                 }} 
               />
             </Box>

             {/* Large Floating Third Image - Bottom Left */}
             <Box sx={{ 
               position: 'absolute',
               bottom: 35,
               left: 20,
               width: 120,
               height: 90,
               borderRadius: 18, 
               overflow: 'hidden', 
               boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
               border: '4px solid white',
               transform: 'rotate(-3deg)',
               zIndex: 3,
               '&:hover': {
                 transform: 'rotate(0deg) scale(1.15)',
                 transition: 'all 0.3s ease-in-out',
                 zIndex: 5
               }
             }}>
               <img 
                 src={require('../assets/hotel-gym.png')} 
                 alt="Hotel gym facilities" 
                 style={{ 
                   width: '100%', 
                   height: '100%', 
                   objectFit: 'cover',
                   filter: 'brightness(1.15) contrast(1.2)'
                 }} 
               />
             </Box>

             {/* Enhanced Decorative Elements */}
             <Box sx={{
               position: 'absolute',
               top: -20,
               right: -15,
               width: 60,
               height: 60,
               borderRadius: '50%',
               background: 'linear-gradient(135deg, #22987a, #2ecc71)',
               opacity: 0.95,
               zIndex: 2,
               animation: 'pulse 2s infinite',
               boxShadow: '0 8px 20px rgba(34,152,122,0.4)'
             }} />
             
             <Box sx={{
               position: 'absolute',
               bottom: -15,
               left: -10,
               width: 45,
               height: 45,
               borderRadius: '50%',
               background: 'linear-gradient(135deg, #2ecc71, #22987a)',
               opacity: 0.9,
               zIndex: 2,
               animation: 'pulse 2.5s infinite',
               boxShadow: '0 6px 15px rgba(46,204,113,0.4)'
             }} />

             {/* Enhanced Center Content Overlay */}
             <Box sx={{
               position: 'absolute',
               bottom: 25,
               left: 25,
               right: 25,
               background: 'rgba(255,255,255,0.98)',
               borderRadius: 16,
               padding: 3,
               backdropFilter: 'blur(15px)',
               border: '2px solid rgba(34,152,122,0.2)',
               zIndex: 4,
               boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
             }}>
               <Typography 
                 variant="h6" 
                 fontWeight="bold" 
                 color="#22987a" 
                 sx={{ 
                   fontSize: '1.1rem',
                   textAlign: 'center',
                   mb: 1
                 }}
               >
                 Luxury Experience
               </Typography>
               <Typography 
                 variant="body2" 
                 color="#555" 
                 sx={{ 
                   fontSize: '0.9rem',
                   textAlign: 'center',
                   lineHeight: 1.4,
                   fontWeight: 500
                 }}
               >
                 Premium amenities & stunning views
               </Typography>
             </Box>

             {/* Enhanced Floating Icon */}
             <Box sx={{
               position: 'absolute',
               top: '50%',
               left: '50%',
               transform: 'translate(-50%, -50%)',
               width: 70,
               height: 70,
               borderRadius: '50%',
               background: 'rgba(255,255,255,0.95)',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
               zIndex: 5,
               backdropFilter: 'blur(10px)',
               border: '3px solid rgba(34,152,122,0.4)',
               '&:hover': {
                 transform: 'translate(-50%, -50%) scale(1.1)',
                 transition: 'all 0.3s ease-in-out'
               }
             }}>
               <span role="img" aria-label="star" style={{ fontSize: 32, color: '#22987a' }}>⭐</span>
             </Box>

             {/* Additional Small Decorative Elements */}
             <Box sx={{
               position: 'absolute',
               top: '25%',
               left: 15,
               width: 25,
               height: 25,
               borderRadius: '50%',
               background: 'linear-gradient(135deg, #2ecc71, #22987a)',
               opacity: 0.8,
               zIndex: 2,
               animation: 'pulse 3s infinite'
             }} />

             <Box sx={{
               position: 'absolute',
               top: '15%',
               right: 15,
               width: 20,
               height: 20,
               borderRadius: '50%',
               background: 'linear-gradient(135deg, #22987a, #2ecc71)',
               opacity: 0.7,
               zIndex: 2,
               animation: 'pulse 2.8s infinite'
             }} />
           </Box>
        </Box>
       </Box>
      </Box>

      {/* Video Section - Desktop & Mobile Responsive */}
      <Box
        sx={{
          width: '100%',
          bgcolor: '#f2f8f6',
          py: { xs: 3, md: 4 },
          mb: 2,
        }}
      >
        {/* Desktop Layout */}
        <Box
          sx={{
            width: '100%',
            display: { xs: 'none', md: 'block' },
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <Typography 
            variant="h3" 
            fontWeight="bold" 
            color="#222" 
            sx={{ 
              mb: 3,
              fontSize: '2rem',
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
              url="https://youtu.be/8zCydC_oaa8?si=IBRit29tDdHwj5_3"
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

        {/* Mobile Layout */}
        <Box
       sx= {{
        width: '100%',
        display: 'flex'
       }}
       >
        <Box
          sx={{
            width: '100%',
            display: { xs: 'block', md: 'none' },
            textAlign: 'center',
            px: 2,
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
              url="https://youtu.be/8zCydC_oaa8?si=IBRit29tDdHwj5_3"
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

      {/* Expert Staff Person Section - Desktop & Mobile Responsive */}
      <Box
        sx={{
          width: '100%',
          bgcolor: '#f8f9fa',
          py: { xs: 4, md: 8 },
          mb: 4,
        }}
      >
        {/* Desktop Layout */}
        <Box
          sx={{
            maxWidth: '1400px',
            mx: 'auto',
            display: { xs: 'none', md: 'block' },
            textAlign: 'center',
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
            Expert Staff Person
          </Typography>
          
          {/* Desktop Staff Cards */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              gap: 4,
              mt: 4,
            }}
          >
            {/* Hardik Sharma */}
            <Box
              sx={{
                flex: 1,
                maxWidth: 300,
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                bgcolor: 'white',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                }
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: 280,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={require('../assets/hardik-profile-photo.jpg')}
                  alt="Hardik Sharma"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </Box>
              <Box
                sx={{
                  p: 3,
                  bgcolor: '#e8f5e8',
                  textAlign: 'center',
                }}
              >
                <Typography 
                  variant="h6" 
                  fontWeight="bold" 
                  color="#222" 
                  sx={{ mb: 1 }}
                >
                  Hardik Sharma
                </Typography>
                <Divider sx={{ mb: 1, bgcolor: '#22987a' }} />
                <Typography 
                  variant="body1" 
                  color="#22987a" 
                  fontWeight="bold"
                >
                  Chef Master
                </Typography>
              </Box>
            </Box>

            {/* Reecha Patel */}
            <Box
              sx={{
                flex: 1,
                maxWidth: 300,
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                bgcolor: 'white',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                }
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: 280,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={require('../assets/reecha-profile-photo.jpg')}
                  alt="Reecha Patel"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </Box>
              <Box
                sx={{
                  p: 3,
                  bgcolor: '#e8f5e8',
                  textAlign: 'center',
                }}
              >
                <Typography 
                  variant="h6" 
                  fontWeight="bold" 
                  color="#222" 
                  sx={{ mb: 1 }}
                >
                  Reecha Patel
                </Typography>
                <Divider sx={{ mb: 1, bgcolor: '#22987a' }} />
                <Typography 
                  variant="body1" 
                  color="#22987a" 
                  fontWeight="bold"
                >
                  Chef Master
                </Typography>
              </Box>
            </Box>

            {/* Parth Banker */}
            <Box
              sx={{
                flex: 1,
                maxWidth: 300,
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                bgcolor: 'white',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                }
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: 280,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={require('../assets/parth-profile-photo.jpg')}
                  alt="Parth Banker"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </Box>
              <Box
                sx={{
                  p: 3,
                  bgcolor: '#e8f5e8',
                  textAlign: 'center',
                }}
              >
                <Typography 
                  variant="h6" 
                  fontWeight="bold" 
                  color="#222" 
                  sx={{ mb: 1 }}
                >
                  Parth Banker
                </Typography>
                <Divider sx={{ mb: 1, bgcolor: '#22987a' }} />
                <Typography 
                  variant="body1" 
                  color="#22987a" 
                  fontWeight="bold"
                >
                  Chef Master
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Mobile Layout */}
        <Box
          sx={{
            width: '100%',
            display: { xs: 'block', md: 'none' },
            px: 2,
          }}
        >
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            color="#222" 
            sx={{ 
              mb: 4,
              fontSize: '1.8rem',
              lineHeight: 1.3,
              textAlign: 'center'
            }}
          >
            Expert Staff Person
          </Typography>
          
          {/* Mobile Staff Cards - Vertical Stack */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              mt: 3,
            }}
          >
            {/* Hardik Sharma - Mobile */}
            <Box
              sx={{
                width: '100%',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                bgcolor: 'white',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: 200,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={require('../assets/hardik-profile-photo.jpg')}
                  alt="Hardik Sharma"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </Box>
              <Box
                sx={{
                  p: 2,
                  bgcolor: '#e8f5e8',
                  textAlign: 'center',
                }}
              >
                <Typography 
                  variant="h6" 
                  fontWeight="bold" 
                  color="#222" 
                  sx={{ mb: 1, fontSize: '1.1rem' }}
                >
                  Hardik Sharma
                </Typography>
                <Divider sx={{ mb: 1, bgcolor: '#22987a' }} />
                <Typography 
                  variant="body1" 
                  color="#22987a" 
                  fontWeight="bold"
                  sx={{ fontSize: '0.9rem' }}
                >
                  Chef Master
                </Typography>
              </Box>
            </Box>

            {/* Reecha Patel - Mobile */}
            <Box
              sx={{
                width: '100%',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                bgcolor: 'white',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: 200,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={require('../assets/reecha-profile-photo.jpg')}
                  alt="Reecha Patel"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </Box>
              <Box
                sx={{
                  p: 2,
                  bgcolor: '#e8f5e8',
                  textAlign: 'center',
                }}
              >
                <Typography 
                  variant="h6" 
                  fontWeight="bold" 
                  color="#222" 
                  sx={{ mb: 1, fontSize: '1.1rem' }}
                >
                  Reecha Patel
                </Typography>
                <Divider sx={{ mb: 1, bgcolor: '#22987a' }} />
                <Typography 
                  variant="body1" 
                  color="#22987a" 
                  fontWeight="bold"
                  sx={{ fontSize: '0.9rem' }}
                >
                  Chef Master
                </Typography>
              </Box>
            </Box>

            {/* Parth Banker - Mobile */}
            <Box
              sx={{
                width: '100%',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                bgcolor: 'white',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: 200,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={require('../assets/parth-profile-photo.jpg')}
                  alt="Parth Banker"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </Box>
              <Box
                sx={{
                  p: 2,
                  bgcolor: '#e8f5e8',
                  textAlign: 'center',
                }}
              >
                <Typography 
                  variant="h6" 
                  fontWeight="bold" 
                  color="#222" 
                  sx={{ mb: 1, fontSize: '1.1rem' }}
                >
                  Parth Banker
                </Typography>
                <Divider sx={{ mb: 1, bgcolor: '#22987a' }} />
                <Typography 
                  variant="body1" 
                  color="#22987a" 
                  fontWeight="bold"
                  sx={{ fontSize: '0.9rem' }}
                >
                  Chef Master
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      
      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default AboutUs; 