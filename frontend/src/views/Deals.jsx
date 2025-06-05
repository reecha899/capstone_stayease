import React, { useEffect, useState } from 'react';
import {
  Box, Paper, Typography, Button, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, InputLabel, Select, FormControl, Menu
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import CenteredLoader from '../components/CenteredLoader';

const statusColors = {
  Ongoing: 'primary',
  Full: 'error',
  Inactive: 'default',
  New: 'success',
};

const roomTypes = [
  'Single', 'Double', 'Triple', 'VIP', 'Single, Double', 'Suite'
];

export default function Deals({ fetchWithAuth }) {
  const [tab, setTab] = useState(0);
  const [deals, setDeals] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [roomTypeFilter, setRoomTypeFilter] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    referenceNumber: '',
    dealName: '',
    reservationsLeft: '',
    endDate: '',
    roomType: '',
    status: 'Ongoing',
    price: '',
    tags: '',
    description: '',
    discount: '',
    startDate: '',
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // Fetch deals from backend
  useEffect(() => {
    setLoading(true);
    fetchWithAuth('http://localhost:5000/api/deals')
      .then(res => res.json())
      .then(data => { setDeals(data); setLoading(false); });
  }, [open, fetchWithAuth]);

  const handleTabChange = (e, v) => setTab(v);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.dealName) newErrors.dealName = 'Deal name is required';
    if (!form.referenceNumber) newErrors.referenceNumber = 'Reference number is required';
    if (!form.reservationsLeft || isNaN(Number(form.reservationsLeft)) || Number(form.reservationsLeft) < 0) newErrors.reservationsLeft = 'Reservations left must be a non-negative number';
    if (!form.endDate) newErrors.endDate = 'End date is required';
    if (!form.roomType) newErrors.roomType = 'Room type is required';
    if (!form.status) newErrors.status = 'Status is required';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) < 0) newErrors.price = 'Price must be a non-negative number';
    if (!form.startDate) newErrors.startDate = 'Start date is required';
    if (!form.discount || isNaN(Number(form.discount)) || Number(form.discount) < 0) newErrors.discount = 'Discount must be a non-negative number';
    return newErrors;
  };

  const handleMenuOpen = (event, deal) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedDeal(deal);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleEdit = () => {
    setForm({
      ...selectedDeal,
      description: selectedDeal.roomFacility || selectedDeal.description || '',
      endDate: selectedDeal.endDate ? selectedDeal.endDate.slice(0, 10) : '',
      startDate: selectedDeal.startDate ? selectedDeal.startDate.slice(0, 10) : ''
    });
    setIsEdit(true);
    setOpen(true);
    handleMenuClose();
  };

  const handleDelete = async () => {
    await fetchWithAuth(`http://localhost:5000/api/deals/${selectedDeal._id}`, { method: 'DELETE' });
    setMenuAnchorEl(null);
    setSelectedDeal(null);
    // Refresh deals
    fetchWithAuth('http://localhost:5000/api/deals')
      .then(res => res.json())
      .then(data => setDeals(data));
  };

  const handleDialogClose = () => {
    setOpen(false);
    setIsEdit(false);
    setForm({
      referenceNumber: '', dealName: '', reservationsLeft: '', endDate: '', roomType: '', status: 'Ongoing', price: '', tags: '', description: '', discount: '', startDate: '',
    });
    setErrors({});
  };

  const handleSave = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setLoading(true);
    const dealPayload = {
      referenceNumber: form.referenceNumber,
      dealName: form.dealName,
      reservationsLeft: Number(form.reservationsLeft),
      endDate: form.endDate ? new Date(form.endDate) : undefined,
      roomType: form.roomType,
      status: form.status,
      price: form.price,
      tags: form.tags,
      roomFacility: form.description,
      discount: form.discount,
      startDate: form.startDate,
    };
    if (isEdit && selectedDeal) {
      await fetchWithAuth(`http://localhost:5000/api/deals/${selectedDeal._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dealPayload),
      });
    } else {
      await fetchWithAuth('http://localhost:5000/api/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dealPayload),
      });
    }
    setLoading(false);
    setOpen(false);
    setIsEdit(false);
    setForm({
      referenceNumber: '', dealName: '', reservationsLeft: '', endDate: '', roomType: '', status: 'Ongoing', price: '', tags: '', description: '', discount: '', startDate: '',
    });
    setErrors({});
    // Refresh deals
    fetchWithAuth('http://localhost:5000/api/deals')
      .then(res => res.json())
      .then(data => setDeals(data));
  };

  // Filter deals by status (Ongoing/Finished) and dropdowns
  const filteredDeals = deals.filter(d => {
    // Apply tab filter first
    const tabFiltered = tab === 0 ? d.status === 'Ongoing' || d.status === 'New' : d.status !== 'Ongoing' && d.status !== 'New';

    // Apply status filter dropdown
    const statusFiltered = statusFilter === '' || d.status === statusFilter;

    // Apply room type filter dropdown
    const roomTypeFiltered = roomTypeFilter === '' || d.roomType === roomTypeFilter;

    return tabFiltered && statusFiltered && roomTypeFiltered;
  });

  if (loading) return <CenteredLoader message="Loading deals..." />;

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Deal</Typography>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 1px 4px #e6e8ec33' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Tabs value={tab} onChange={handleTabChange} sx={{ minHeight: 0 }}>
            <Tab label="Ongoing" sx={{ textTransform: 'none', fontWeight: 600, minHeight: 0 }} />
            <Tab label="Finished" sx={{ textTransform: 'none', fontWeight: 600, minHeight: 0 }} />
          </Tabs>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="contained" onClick={handleOpen} sx={{ mr: 2, borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>Add deal</Button>
          <FormControl sx={{ minWidth: 120, mr: 1 }} size="small">
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
              <MenuItem value=""><em>All</em></MenuItem>
              <MenuItem value="Ongoing">Ongoing</MenuItem>
              <MenuItem value="Full">Full</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="New">New</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel>Room Type</InputLabel>
            <Select value={roomTypeFilter} label="Room Type" onChange={(e) => setRoomTypeFilter(e.target.value)}>
              <MenuItem value=""><em>All</em></MenuItem>
              {roomTypes.map(rt => <MenuItem key={rt} value={rt}>{rt}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Reference number</TableCell>
                <TableCell>Deal name</TableCell>
                <TableCell>Reservations left</TableCell>
                <TableCell>End date</TableCell>
                <TableCell>Room type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDeals.map((deal) => (
                <TableRow key={deal.referenceNumber}>
                  <TableCell>#{deal.referenceNumber}</TableCell>
                  <TableCell>{deal.dealName}</TableCell>
                  <TableCell>{deal.reservationsLeft}</TableCell>
                  <TableCell>{deal.endDate ? new Date(deal.endDate).toLocaleDateString() : '-'}</TableCell>
                  <TableCell>{deal.roomType}</TableCell>
                  <TableCell>
                    <Chip label={deal.status} color={statusColors[deal.status] || 'default'} size="small" />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={e => handleMenuOpen(e, deal)}><MoreVertIcon /></IconButton>
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

      {/* Add Deal Modal */}
      <Dialog open={open} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>{isEdit ? 'Update Deal' : 'Add Deal'}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <Box component="form" noValidate autoComplete="off">
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <TextField label="Deal name" name="dealName" value={form.dealName} onChange={handleChange} fullWidth margin="dense" error={!!errors.dealName} helperText={errors.dealName} />
                <TextField label="Reference number" name="referenceNumber" value={form.referenceNumber} onChange={handleChange} fullWidth margin="dense" error={!!errors.referenceNumber} helperText={errors.referenceNumber} />
                <TextField label="Tags" name="tags" value={form.tags} onChange={handleChange} fullWidth margin="dense" />
                <TextField label="Price" name="price" value={form.price} onChange={handleChange} fullWidth margin="dense" error={!!errors.price} helperText={errors.price} />
                <FormControl fullWidth margin="dense" error={!!errors.roomType}>
                  <InputLabel>Room type</InputLabel>
                  <Select label="Room type" name="roomType" value={form.roomType} onChange={handleChange}>
                    {roomTypes.map(rt => <MenuItem key={rt} value={rt}>{rt}</MenuItem>)}
                  </Select>
                  {errors.roomType && <Typography variant="caption" color="error">{errors.roomType}</Typography>}
                </FormControl>
                <TextField label="Discount" name="discount" value={form.discount} onChange={handleChange} fullWidth margin="dense" error={!!errors.discount} helperText={errors.discount} />
                <TextField label="Reservations left" name="reservationsLeft" value={form.reservationsLeft} onChange={handleChange} fullWidth margin="dense" error={!!errors.reservationsLeft} helperText={errors.reservationsLeft} />
                <TextField label="Start date" name="startDate" value={form.startDate} onChange={handleChange} fullWidth margin="dense" type="date" InputLabelProps={{ shrink: true }} error={!!errors.startDate} helperText={errors.startDate} />
                <TextField label="End date" name="endDate" value={form.endDate} onChange={handleChange} fullWidth margin="dense" type="date" InputLabelProps={{ shrink: true }} error={!!errors.endDate} helperText={errors.endDate} />
                <FormControl fullWidth margin="dense" error={!!errors.status}>
                  <InputLabel>Status</InputLabel>
                  <Select label="Status" name="status" value={form.status} onChange={handleChange}>
                    <MenuItem value="Ongoing">Ongoing</MenuItem>
                    <MenuItem value="Full">Full</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    <MenuItem value="New">New</MenuItem>
                  </Select>
                  {errors.status && <Typography variant="caption" color="error">{errors.status}</Typography>}
                </FormControl>
              </Box>
              <TextField label="Room facility" name="description" value={form.description} onChange={handleChange} fullWidth multiline rows={2} margin="dense" sx={{ mt: 2 }} />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button onClick={handleDialogClose} variant="outlined">Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={loading}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 