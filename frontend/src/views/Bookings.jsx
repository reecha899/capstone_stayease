import React, { useState } from 'react';
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
  MenuItem,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add as AddIcon } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

const columns = [
  { field: 'id', headerName: 'Booking ID', width: 130 },
  { field: 'guestName', headerName: 'Guest Name', width: 200 },
  { field: 'roomNumber', headerName: 'Room Number', width: 130 },
  { field: 'checkIn', headerName: 'Check In', width: 130 },
  { field: 'checkOut', headerName: 'Check Out', width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'totalAmount', headerName: 'Total Amount', width: 130 },
];

const initialRows = [
  {
    id: 1,
    guestName: 'John Doe',
    roomNumber: 101,
    checkIn: '2024-03-20',
    checkOut: '2024-03-25',
    status: 'Confirmed',
    totalAmount: '$1000',
  },
  {
    id: 2,
    guestName: 'Jane Smith',
    roomNumber: 102,
    checkIn: '2024-03-21',
    checkOut: '2024-03-23',
    status: 'Pending',
    totalAmount: '$600',
  },
];

function Bookings() {
  const [rows, setRows] = useState(initialRows);
  const [open, setOpen] = useState(false);
  const [newBooking, setNewBooking] = useState({
    guestName: '',
    roomNumber: '',
    checkIn: null,
    checkOut: null,
    status: 'Pending',
    totalAmount: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddBooking = () => {
    setRows([
      ...rows,
      {
        ...newBooking,
        id: rows.length + 1,
        checkIn: newBooking.checkIn.toISOString().split('T')[0],
        checkOut: newBooking.checkOut.toISOString().split('T')[0],
      },
    ]);
    setNewBooking({
      guestName: '',
      roomNumber: '',
      checkIn: null,
      checkOut: null,
      status: 'Pending',
      totalAmount: '',
    });
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Bookings</Typography>
      </Box>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Paper>
    </Box>
  );
}

export default Bookings; 