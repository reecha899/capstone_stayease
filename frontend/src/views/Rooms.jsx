import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  TablePagination,
} from '@mui/material';
import { Add as AddIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import CenteredLoader from '../components/CenteredLoader';

const STATUS_OPTIONS = ['Available', 'Booked', 'Reserved'];

const ROOM_TYPE_OPTIONS = [
  { value: 'single', label: 'Single' },
  { value: 'double', label: 'Double' },
  { value: 'triple', label: 'Triple' },
  { value: 'vip', label: 'VIP' },
  { value: 'suite', label: 'Suite' },
  { value: 'deluxe', label: 'Deluxe' },
];

const STATUS_ENUM = ['Available', 'Booked', 'Reserved', 'Waitlist'];

export default function Rooms({ fetchWithAuth }) {
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    roomNumber: '',
    type: '',
    price: '',
    capacity: '',
    amenities: '',
    status: 'Available',
    floor: '',
    description: '',
    images: '',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setLoading(true);
    fetchRooms();
  }, [open]);

  const fetchRooms = async () => {
    try {
      const res = await fetchWithAuth('http://localhost:5000/api/rooms');
      const data = await res.json();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
    setLoading(false);
  };

  const handleOpen = () => {
    setOpen(true);
    setIsEdit(false);
    setForm({
      roomNumber: '', type: '', price: '', capacity: '', amenities: '', status: 'Available', floor: '', description: '', images: '',
    });
  };

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setSelectedRoom(null);
    setForm({
      roomNumber: '', type: '', price: '', capacity: '', amenities: '', status: 'Available', floor: '', description: '', images: '',
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMenuOpen = (event, room) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedRoom(room);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleEdit = () => {
    if (selectedRoom) {
      setForm(selectedRoom);
      setIsEdit(true);
      setOpen(true);
    }
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (selectedRoom) {
      try {
        await fetchWithAuth(`http://localhost:5000/api/rooms/${selectedRoom._id}`, { method: 'DELETE' });
        fetchRooms();
      } catch (error) {
        console.error('Error deleting room:', error);
      }
    }
    handleMenuClose();
  };

  const validate = () => {
    const newErrors = {};
    if (!form.roomNumber || form.roomNumber.trim() === '') newErrors.roomNumber = 'Room number is required';
    if (!form.type || form.type.trim() === '') newErrors.type = 'Bed type is required';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) newErrors.price = 'Price must be a positive number';
    if (!form.capacity || isNaN(Number(form.capacity)) || Number(form.capacity) <= 0) newErrors.capacity = 'Capacity must be a positive number';
    if (!form.status || !STATUS_ENUM.includes(form.status)) newErrors.status = 'Status is required and must be valid';
    if (!form.floor || isNaN(Number(form.floor))) newErrors.floor = 'Room floor is required';
    if (!form.description || form.description.trim() === '') newErrors.description = 'Room facility is required';
    let amenitiesArr = form.amenities;
    if (typeof amenitiesArr === 'string') amenitiesArr = amenitiesArr.split(',').map(s => s.trim()).filter(Boolean);
    if (!amenitiesArr || amenitiesArr.length === 0) newErrors.amenities = 'At least one amenity is required';
    let imagesArr = form.images;
    if (typeof imagesArr === 'string') imagesArr = imagesArr.split(',').map(s => s.trim()).filter(Boolean);
    if (!imagesArr || imagesArr.length === 0 || !imagesArr[0]) newErrors.images = 'At least one image URL is required';
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    try {
      // Prepare data for backend
      const payload = { ...form };
      if (isEdit && selectedRoom) {
        const updateData = { ...payload };
        delete updateData._id;
        await fetchWithAuth(`http://localhost:5000/api/rooms/${selectedRoom._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData),
        });
      } else {
        await fetchWithAuth('http://localhost:5000/api/rooms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      handleClose();
    } catch (error) {
      console.error('Error saving room:', error);
    }
  };

  // Filtered rooms based on statusFilter
  const filteredRooms = statusFilter === 'All' ? rooms : rooms.filter(room => room.status === statusFilter);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRooms = filteredRooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (loading) return <CenteredLoader message="Loading rooms..." />;

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 1100, mx: 'auto', mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Rooms</Typography>
      {/* Status Filter Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button
          variant={statusFilter === 'All' ? 'contained' : 'outlined'}
          onClick={() => setStatusFilter('All')}
        >
          All rooms ({rooms.length})
        </Button>
        {STATUS_OPTIONS.map(option => (
          <Button
            key={option}
            variant={statusFilter === option ? 'contained' : 'outlined'}
            onClick={() => setStatusFilter(option)}
          >
            {option} ({rooms.filter(room => room.status === option).length})
          </Button>
        ))}
      </Box>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 1px 4px #e6e8ec33' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Rooms List</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            Add Room
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Room Number</TableCell>
                <TableCell>Bed Type</TableCell>
                <TableCell>Room Floor</TableCell>
                <TableCell>Room Facility</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRooms.map((room) => (
                <TableRow key={room._id}>
                  <TableCell>
                    {Array.isArray(room.images) && room.images[0] ? (
                      <img
                        src={room.images[0]}
                        alt="Room"
                        style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }}
                      />
                    ) : (
                      <Box sx={{ width: 60, height: 40, bgcolor: '#f0f0f0', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: 12 }}>
                        No Image
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>{room.roomNumber}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>{room.floor}</TableCell>
                  <TableCell>{room.description}</TableCell>
                  <TableCell>
                    <Chip
                      label={room.status}
                      color={
                        room.status === 'Available' ? 'success' :
                        room.status === 'Booked' ? 'error' :
                        room.status === 'Reserved' ? 'warning' :
                        'default'
                      }
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={e => handleMenuOpen(e, room)}><MoreVertIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredRooms.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Paper>

      <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>Update</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{isEdit ? 'Update Room' : 'Add Room'}</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
            <TextField label="Room Number" name="roomNumber" value={form.roomNumber} onChange={handleChange} fullWidth margin="dense" error={!!errors.roomNumber} helperText={errors.roomNumber} />
            <FormControl fullWidth margin="dense" error={!!errors.type}>
              <InputLabel>Bed Type</InputLabel>
              <Select
                label="Bed Type"
                name="type"
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
              >
                {ROOM_TYPE_OPTIONS.map(opt => (
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </Select>
              {errors.type && <Typography variant="caption" color="error">{errors.type}</Typography>}
            </FormControl>
            <TextField label="Price" name="price" value={form.price} onChange={handleChange} fullWidth margin="dense" type="number" error={!!errors.price} helperText={errors.price} />
            <TextField label="Capacity" name="capacity" value={form.capacity} onChange={handleChange} fullWidth margin="dense" type="number" error={!!errors.capacity} helperText={errors.capacity} />
            <FormControl fullWidth margin="dense" error={!!errors.status}>
              <InputLabel>Status</InputLabel>
              <Select label="Status" name="status" value={form.status} onChange={handleChange}>
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Booked">Booked</MenuItem>
                <MenuItem value="Reserved">Reserved</MenuItem>
                <MenuItem value="Waitlist">Waitlist</MenuItem>
              </Select>
              {errors.status && <Typography variant="caption" color="error">{errors.status}</Typography>}
            </FormControl>
            <TextField label="Room Floor" name="floor" value={form.floor} onChange={handleChange} fullWidth margin="dense" type="number" error={!!errors.floor} helperText={errors.floor} />
            <TextField label="Room Facility" name="description" value={form.description} onChange={handleChange} fullWidth margin="dense" error={!!errors.description} helperText={errors.description} />
            <TextField label="Amenities" name="amenities" value={form.amenities} onChange={handleChange} fullWidth margin="dense" error={!!errors.amenities} helperText={errors.amenities} />
            <TextField label="Images (comma-separated URLs)" name="images" value={form.images} onChange={handleChange} fullWidth margin="dense" error={!!errors.images} helperText={errors.images} />
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