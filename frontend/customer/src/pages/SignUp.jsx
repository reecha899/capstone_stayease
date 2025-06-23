import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import authService from '../services/authService';
import hotelImage from '../assets/hotel-login-page-image.jpeg';
import { Box, Paper, TextField, Button, Typography, Link, Grid, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    country: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    }
    if (errors.submit) {
      setErrors(prevErrors => ({ ...prevErrors, submit: null}));
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required.";
    if (!formData.username.trim()) tempErrors.username = "Username is required.";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is not valid.";
    }
    if (!formData.country.trim()) tempErrors.country = "Country is required.";
    if (!formData.phone.trim()) tempErrors.phone = "Phone number is required.";
    if (!formData.password) {
      tempErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await authService.register(formData);
        navigate('/account-success');
      } catch (error) {
        console.error('Registration failed', error);
        const errorMsg = error.response?.data?.message || 'An unexpected error occurred. Please try again.';
        setErrors({ submit: errorMsg });
      }
    }
  };

  return (
    // <Box sx={{
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   minHeight: 'calc(100vh - 64px)',
    //   bgcolor: '#f5f5f5',
    //   p: 2,
    // }}>
    //   <Paper elevation={3} sx={{
    //     maxWidth: { xs: 400, md: 900 },
    //     width: '100%',
    //     borderRadius: '12px',
    //     overflow: 'hidden',
    //     display: 'flex',
    //     flexDirection: { xs: 'column', md: 'row' }
    //   }}>
    //     <Box sx={{
    //       width: { xs: '100%', md: '50%' },
    //       height: { xs: 200, md: 'auto' },
    //       flexShrink: 0
    //     }}>
    //       <Box
    //         component="img"
    //         src={hotelImage}
    //         alt="Hotel"
    //         sx={{
    //           width: '100%',
    //           height: '100%',
    //           objectFit: 'cover',
    //           display: 'block',
    //         }}
    //       />
    //     </Box>
    //     <Box sx={{ p: { xs: 2, md: 4 }, width: { xs: '100%', md: '50%' } }}>
    //       <Typography component="h1" variant="h5" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
    //         Create Account
    //       </Typography>
    //       <Box component="form" width={'100%'} display={'flex'} flexDirection={'column'} noValidate onSubmit={handleSubmit}>
    //         <Grid container spacing={2}>
    //           <Grid item xs={12}>
    //             <TextField
    //               required
    //               fullWidth
    //               id="name"
    //               label="Name"
    //               name="name"
    //               autoComplete="name"
    //               value={formData.name}
    //               onChange={handleChange}
    //               error={!!errors.name}
    //               helperText={errors.name}
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <TextField
    //               required
    //               fullWidth
    //               id="username"
    //               label="Username"
    //               name="username"
    //               autoComplete="username"
    //               value={formData.username}
    //               onChange={handleChange}
    //               error={!!errors.username}
    //               helperText={errors.username}
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <TextField
    //               required
    //               fullWidth
    //               id="email"
    //               label="Email Address"
    //               name="email"
    //               autoComplete="email"
    //               value={formData.email}
    //               onChange={handleChange}
    //               error={!!errors.email}
    //               helperText={errors.email}
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //              <TextField
    //               required
    //               fullWidth
    //               id="country"
    //               label="Country"
    //               name="country"
    //               autoComplete="country"
    //               value={formData.country}
    //               onChange={handleChange}
    //               error={!!errors.country}
    //               helperText={errors.country}
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <TextField
    //               required
    //               fullWidth
    //               name="phone"
    //               label="Phone No"
    //               type="tel"
    //               id="phone"
    //               autoComplete="tel"
    //               value={formData.phone}
    //               onChange={handleChange}
    //               error={!!errors.phone}
    //               helperText={errors.phone}
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <TextField
    //               required
    //               fullWidth
    //               name="password"
    //               label="Password"
    //               type={showPassword ? 'text' : 'password'}
    //               id="password"
    //               autoComplete="new-password"
    //               value={formData.password}
    //               onChange={handleChange}
    //               error={!!errors.password}
    //               helperText={errors.password}
    //               InputProps={{
    //                 endAdornment: (
    //                   <InputAdornment position="end">
    //                     <IconButton
    //                       aria-label="toggle password visibility"
    //                       onClick={handleClickShowPassword}
    //                       onMouseDown={handleMouseDownPassword}
    //                       edge="end"
    //                     >
    //                       {showPassword ? <VisibilityOff /> : <Visibility />}
    //                     </IconButton>
    //                   </InputAdornment>
    //                 ),
    //               }}
    //             />
    //           </Grid>
    //         </Grid>
    //         {errors.submit && (
    //           <Typography color="error" align="center" sx={{ mt: 2 }}>
    //             {errors.submit}
    //           </Typography>
    //         )}
    //         <Button
    //           type="submit"
    //           fullWidth
    //           variant="contained"
    //           sx={{ mt: 3, mb: 2, bgcolor: '#208c6c', '&:hover': { bgcolor: '#1a7558' }, py: 1.5 }}
    //         >
    //           Register
    //         </Button>
    //         <Typography variant="body2" align="center">
    //           Already have an account?{' '}
    //           <Link component={RouterLink} to="/login" style={{ color: '#208c6c', textDecoration: 'underline' }}>
    //             Log in
    //           </Link>
    //         </Typography>
    //       </Box>
    //     </Box>
    //   </Paper>
    // </Box>


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
    <Box sx={{ p: { xs: 2, md: 4 }, width: { xs: '100%', md: '50%' } }}>
          <Typography component="h1" variant="h5" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
            Create Account
          </Typography>
          <Box component="form" width={'100%'} display={'flex'} flexDirection={'column'} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2} width={'100%'} display={'flex'} flexDirection={'column'} flexWrap={'nowrap'}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  error={!!errors.username}
                  helperText={errors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                 <TextField
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  autoComplete="country"
                  value={formData.country}
                  onChange={handleChange}
                  error={!!errors.country}
                  helperText={errors.country}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone No"
                  type="tel"
                  id="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
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
              </Grid>
            </Grid>
            {errors.submit && (
              <Typography color="error" align="center" sx={{ mt: 2 }}>
                {errors.submit}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#208c6c', '&:hover': { bgcolor: '#1a7558' }, py: 1.5 }}
            >
              Register
            </Button>
            <Typography variant="body2" align="center">
              Already have an account?{' '}
              <Link component={RouterLink} to="/login" style={{ color: '#208c6c', textDecoration: 'underline' }}>
                Log in
              </Link>
            </Typography>
          </Box>
        </Box>
  </Paper>
</Box>
  );
};

export default SignUp;
