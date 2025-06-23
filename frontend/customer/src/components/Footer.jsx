import React from 'react';
import { Box, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  const mapSrc = "https://maps.google.com/maps?q=manhattan&t=&z=13&ie=UTF8&iwloc=&output=embed";

  return (
    <Box sx={{ bgcolor: '#1a1a1a', color: 'white', pt: 8, pb: 4 }}>
      {/* Desktop Footer */}
      <Box sx={{ display: { xs: 'none', md: 'block' }, maxWidth: 1200, mx: 'auto', px: 4 }}>
        <Grid container spacing={5} flexWrap={'nowrap'}>
          <Grid item xs={12} md={4}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#2E8B57' }}>StayEase</Typography>
            <Typography variant="body2" sx={{ mb: 3, color: 'grey.400', lineHeight: 1.8 }}>
              Experience the pinnacle of luxury and comfort. Your perfect getaway awaits.
            </Typography>
            <Box>
              <IconButton href="#" sx={{ color: 'white', backgroundColor: '#3b5998', mr: 1, '&:hover': { transform: 'scale(1.1)', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)' } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton href="#" sx={{ color: 'white', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', mr: 1, '&:hover': { transform: 'scale(1.1)', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)' } }}>
                <InstagramIcon />
              </IconButton>
              <IconButton href="#" sx={{ color: 'white', backgroundColor: '#1da1f2', mr: 1, '&:hover': { transform: 'scale(1.1)', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)' } }}>
                <TwitterIcon />
              </IconButton>
              <IconButton href="#" sx={{ color: 'white', backgroundColor: '#0077b5', '&:hover': { transform: 'scale(1.1)', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)' } }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Quick Links</Typography>
            <Link href="#" variant="body2" display="block" color="inherit" sx={{ mb: 1.5, textDecoration: 'none', '&:hover': { color: '#2E8B57' } }}>About Us</Link>
            <Link href="#" variant="body2" display="block" color="inherit" sx={{ mb: 1.5, textDecoration: 'none', '&:hover': { color: '#2E8B57' } }}>Rooms & Suites</Link>
            <Link href="#" variant="body2" display="block" color="inherit" sx={{ mb: 1.5, textDecoration: 'none', '&:hover': { color: '#2E8B57' } }}>Specials</Link>
            <Link href="#" variant="body2" display="block" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#2E8B57' } }}>Contact</Link>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Contact Info</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <LocationOnIcon sx={{ mr: 1.5, color: '#2E8B57' }} />
              <Typography variant="body2">123 Luxury Ave, New York, NY</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <PhoneIcon sx={{ mr: 1.5, color: '#2E8B57' }} />
              <Typography variant="body2">+1 234 567 8900</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <EmailIcon sx={{ mr: 1.5, color: '#2E8B57' }} />
              <Typography variant="body2">contact@stayease.com</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ height: 200, borderRadius: '8px', overflow: 'hidden', boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)' }}>
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Google Map"
              ></iframe>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, bgcolor: 'grey.800' }} />
        <Typography variant="body2" align="center" sx={{ color: 'grey.500' }}>
          © {new Date().getFullYear()} StayEase. All Rights Reserved.
        </Typography>
      </Box>

      {/* Mobile Footer */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, p: 3, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#2E8B57' }}>StayEase</Typography>
        <Typography variant="body2" sx={{ mb: 3, color: 'grey.400' }}>
          Experience the pinnacle of luxury and comfort. Your perfect getaway awaits.
        </Typography>
        <Box sx={{ mb: 3 }}>
          <IconButton href="#" sx={{ color: 'white', backgroundColor: '#3b5998', mr: 1, '&:hover': { transform: 'scale(1.1)' } }}>
            <FacebookIcon />
          </IconButton>
          <IconButton href="#" sx={{ color: 'white', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', mr: 1, '&:hover': { transform: 'scale(1.1)' } }}>
            <InstagramIcon />
          </IconButton>
          <IconButton href="#" sx={{ color: 'white', backgroundColor: '#1da1f2', mr: 1, '&:hover': { transform: 'scale(1.1)' } }}>
            <TwitterIcon />
          </IconButton>
          <IconButton href="#" sx={{ color: 'white', backgroundColor: '#0077b5', '&:hover': { transform: 'scale(1.1)' } }}>
            <LinkedInIcon />
          </IconButton>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Quick Links</Typography>
            <Link href="#" variant="body2" display="block" color="inherit" sx={{ mb: 1, textDecoration: 'none' }}>About Us</Link>
            <Link href="#" variant="body2" display="block" color="inherit" sx={{ mb: 1, textDecoration: 'none' }}>Rooms</Link>
            <Link href="#" variant="body2" display="block" color="inherit" sx={{ mb: 1, textDecoration: 'none' }}>Specials</Link>
            <Link href="#" variant="body2" display="block" color="inherit" sx={{ textDecoration: 'none' }}>Contact</Link>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, mt: 2 }}>Contact Info</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>123 Luxury Ave, NY</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>+1 234 567 8900</Typography>
            <Typography variant="body2">contact@stayease.com</Typography>
          </Grid>
        </Grid>
        <Box sx={{ height: 200, borderRadius: '8px', overflow: 'hidden', boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)', mt: 3 }}>
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Map"
          ></iframe>
        </Box>
        <Divider sx={{ my: 4, bgcolor: 'grey.800' }} />
        <Typography variant="body2" align="center" sx={{ color: 'grey.500' }}>
          © {new Date().getFullYear()} StayEase. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer; 