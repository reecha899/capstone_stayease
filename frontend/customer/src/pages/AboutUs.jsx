import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Container, Breadcrumbs, Link, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import coverImage from '../assets/home-page-cover-image.png';

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

      {/* Outdoor Activities Section - Desktop & Mobile Responsive */}
      <Box
        sx={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
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
          sx={{
            maxWidth: '98vw',
            mx: 'auto',
            display: { xs: 'block', md: 'none' },
            borderRadius: 3,
            p: 3,
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
          <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 2, maxWidth: 400, mx: 'auto', width: '100%', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
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
            <React.Fragment>
            <Box key={stat.label} sx={{ textAlign: 'center' }}>
              <Typography variant="h5" fontWeight="bold" color="#111" sx={{ fontSize: 24 }}>{stat.value}</Typography>
              <Typography variant="h6" fontWeight="bold" color="#111" sx={{ fontSize: 16 }}>{stat.label}</Typography>
            </Box>

            {idx < arr.length - 1 && (
                <Divider orientation="horizontal" flexItem sx={{ display: 'flex', marginX: 5,  bgcolor: 'rgba(0,0,0,0.18)' }} />
              )}
            </React.Fragment>
            
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AboutUs; 