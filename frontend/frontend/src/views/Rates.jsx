import React, { useEffect, useState } from 'react';
import {
  Box, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, InputLabel, Select, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Menu, Chip
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Add as AddIcon } from '@mui/icons-material';
import CenteredLoader from '../components/CenteredLoader';

export default function Rates({ fetchWithAuth }) {
  const [rates, setRates] = useState([]);
  const [deals, setDeals] = useState([]); // To store deals for the dropdown
  const [roomTypeFilter, setRoomTypeFilter] = useState(''); // State for room type filter
  const [dealFilter, setDealFilter] = useState(''); // State for deal filter
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    roomType: '',
    deal: '',
    cancellationPolicy: '',
    dealPrice: '',
    rate: '',
    availability: '',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch rates and deals from backend
  useEffect(() => {
    setLoading(true);
    Promise.all([fetchRates(), fetchDeals()]).then(() => setLoading(false));
  }, [open]); // Refetch when modal is closed

  const fetchRates = async () => {
    try {
      const res = await fetchWithAuth('http://localhost:5000/api/rates');
      const data = await res.json();
      setRates(data);
    } catch (error) {
      console.error('Error fetching rates:', error);
    }
  };

  const fetchDeals = async () => {
    try {
      const res = await fetchWithAuth('http://localhost:5000/api/deals');
      const data = await res.json();
      setDeals(data);
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setForm({ roomType: '', deal: '', cancellationPolicy: '', dealPrice: '', rate: '', availability: '' });
    setSelectedRate(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMenuOpen = (event, rate) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedRate(rate);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleEdit = () => {
    if (selectedRate) {
      setForm(selectedRate);
      setIsEdit(true);
      setOpen(true);
    }
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (selectedRate) {
      try {
        await fetchWithAuth(`http://localhost:5000/api/rates/${selectedRate._id}`, { method: 'DELETE' });
        fetchRates(); // Refresh rates after deletion
      } catch (error) {
        console.error('Error deleting rate:', error);
      }
    }
    handleMenuClose();
  };

  const handleSave = async () => {
    try {
      const rateData = {
        ...form,
        dealPrice: Number(form.dealPrice),
        rate: Number(form.rate),
      };
      console.log('Saving rate data:', rateData); // Log data being sent

      if (isEdit && selectedRate) {
        const updateData = { ...rateData };
        delete updateData._id; // Exclude _id from update body
        console.log('Updating rate with ID:', selectedRate._id); // Log the ID being used for update
        await fetchWithAuth(`http://localhost:5000/api/rates/${selectedRate._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData),
        });
      } else {
        await fetchWithAuth('http://localhost:5000/api/rates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(rateData),
        });
      }
      handleClose();
      fetchRates(); // Refresh rates after save
    } catch (error) {
      console.error('Error saving rate:', error);
      // Potentially add user-facing error feedback here
    }
  };

  // Filter rates based on selected filters
  const filteredRates = rates.filter(rate => {
    const roomTypeMatch = roomTypeFilter === '' || rate.roomType === roomTypeFilter;
    const dealMatch = dealFilter === '' || rate.deal === dealFilter;
    return roomTypeMatch && dealMatch;
  });

  // Add helper for availability color
 
  // Add helper for availability color
  const getAvailabilityColor = (availability) => {
    if (typeof availability === 'string' && availability.toLowerCase() === 'full') return 'error';
    const num = parseInt(availability);
    if (!isNaN(num) && num <= 5) return 'warning';
    if (!isNaN(num)) return 'info';
    return 'default';
  };


  

  if (loading) return <CenteredLoader message="Loading rates..." />;

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Rates</Typography>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 1px 4px #e6e8ec33' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            Add Rate
          </Button>
          {/* Filter Controls */}
          <FormControl sx={{ minWidth: 120, ml: 2 }} size="small">
            <InputLabel>Room Type</InputLabel>
            <Select value={roomTypeFilter} label="Room Type" onChange={(e) => setRoomTypeFilter(e.target.value)}>
              <MenuItem value=""><em>All</em></MenuItem>
              {/* Assuming roomTypes is available from a previous context or needs to be fetched/defined */}
              {/* For now, using unique room types from fetched rates */}
              {[...new Set(rates.map(rate => rate.roomType))].map(roomType => (
                <MenuItem key={roomType} value={roomType}>{roomType}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120, ml: 2 }} size="small">
            <InputLabel>Deal</InputLabel>
            <Select value={dealFilter} label="Deal" onChange={(e) => setDealFilter(e.target.value)}>
              <MenuItem value=""><em>All</em></MenuItem>
              {deals.map(deal => (
                <MenuItem key={deal._id} value={deal._id}>{deal.dealName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Room Type</TableCell>
                <TableCell>Deals</TableCell>
                <TableCell>Cancellation policy</TableCell>
                <TableCell>Deal price</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Availability</TableCell>
                <TableCell align="right"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRates.map((rate) => (
                <TableRow key={rate._id}>
                  <TableCell>{rate.roomType}</TableCell>
                  <TableCell>
                    <Typography>
                      {deals.find(deal => deal._id === rate.deal)?.dealName || rate.deal}
                    </Typography>
                  </TableCell>
                  <TableCell>{rate.cancellationPolicy}</TableCell>
                  <TableCell>${Number(rate.dealPrice).toLocaleString()}</TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">${Number(rate.rate).toLocaleString()}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={rate.availability}
                      color={getAvailabilityColor(rate.availability)}
                      variant="outlined"
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={e => handleMenuOpen(e, rate)}><MoreVertIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Menu for Update/Delete */}
      <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>Update</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      {/* Add/Edit Rate Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{isEdit ? 'Update Rate' : 'Add Rate'}</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
            <TextField label="Room type" name="roomType" value={form.roomType} onChange={handleChange} fullWidth margin="dense" />
            <FormControl fullWidth margin="dense">
              <InputLabel>Deal</InputLabel>
              <Select label="Deal" name="deal" value={form.deal} onChange={handleChange}>
                {deals.map(deal => <MenuItem key={deal._id} value={deal._id}>{deal.dealName}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField label="Cancellation policy" name="cancellationPolicy" value={form.cancellationPolicy} onChange={handleChange} fullWidth margin="dense" />
            <TextField label="Rooms" name="availability" value={form.availability} onChange={handleChange} fullWidth margin="dense" type="text" />
            <TextField label="Price" name="dealPrice" value={form.dealPrice} onChange={handleChange} fullWidth margin="dense" type="number" />
            <TextField label="Rate" name="rate" value={form.rate} onChange={handleChange} fullWidth margin="dense" type="number" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">{isEdit ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 