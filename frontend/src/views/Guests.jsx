import React, { useEffect, useState } from 'react';
import {
  Box, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Dialog, DialogTitle, DialogContent, TextField, Avatar, InputBase, TablePagination, Tabs, Tab, Menu, MenuItem
} from '@mui/material';
import { FilterList as FilterListIcon, Search as SearchIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import CenteredLoader from '../components/CenteredLoader';

const STATUS_COLORS = {
  Available: 'success',
  Booked: 'error',
  Reserved: 'warning',
  Waitlist: 'default',
  pending: 'info'
};

const STATUS_FILTERS = ['All', 'Available', 'Booked', 'Reserved', 'Waitlist', 'pending'];

export default function Guests({ fetchWithAuth }) {
  const [guests, setGuests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [statusFilter, setStatusFilter] = useState('All');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [guestsRes, bookingsRes] = await Promise.all([
        fetchWithAuth('http://localhost:5000/api/guests'),
        fetchWithAuth('http://localhost:5000/api/bookings'),
      ]);
      const guestsData = await guestsRes.json();
      const bookingsData = await bookingsRes.json();
      setGuests(guestsData);
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching guests/bookings:', error);
    }
    setLoading(false);
  };

  // Join guest and booking data for table
  const rows = bookings.map(b => {
    // Find the guest by matching booking's user ID with guest's _id
    const guest = guests.find(g => g._id === b.user);
    return {
      id: b._id,
      reservationId: b.registrationNumber || b._id,
      // Use the 'User' field from the backend response for the name in the table
      name: b.User || (guest ? guest.name : ''), // Fallback to guest.name if User is not available
      image: guest ? guest.image : '', // Get image from the found guest object
      roomNumber: b.room && b.room.roomNumber ? b.room.roomNumber : '',
      totalAmount: b.totalPrice || '',
      amountPaid: b.amountPaid || '', // Assuming amountPaid comes directly from booking if available
      status: b.status || '',
      checkIn: b.checkIn,
      checkOut: b.checkOut,
      guest, // Keep the found guest object for modal details
      booking: b, // Keep the original booking object
    };
  }).filter(row => {
    // Status filter
    const statusMatch = statusFilter === 'All' ? 
                        true : // Show all statuses if filter is 'All'
                        row.status === statusFilter;
    
    // Tab filter (All, Check-in, Check-out)
    let tabMatch = true;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const checkInDate = row.checkIn ? new Date(row.checkIn) : null;
    const checkOutDate = row.checkOut ? new Date(row.checkOut) : null;

    if (activeTab === 1) { // Check-in tab
      tabMatch = checkInDate && checkInDate >= today && checkInDate < tomorrow;
    } else if (activeTab === 2) { // Check-out tab
      tabMatch = checkOutDate && checkOutDate >= today && checkOutDate < tomorrow;
    }
    // If activeTab is 0 ('All'), tabMatch remains true, showing all dates

    
    return statusMatch && tabMatch;
  });

  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleOpenModal = (row) => {
    setSelected(row);
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    // Optionally reset status filter or search when changing tabs
    // setStatusFilter('All');
    // setSearch('');
    setPage(0);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setFilterAnchorEl(null);
    setPage(0);
  };

  if (loading) return <CenteredLoader message="Loading guests..." />;

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 1100, mx: 'auto', mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Guests</Typography>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 1px 4px #e6e8ec33' }}>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="All" />
          <Tab label="Check in" />
          <Tab label="Check out" />
        </Tabs>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<FilterListIcon />}
            onClick={handleFilterClick}
          >
            Filter: {statusFilter}
          </Button>
          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={handleFilterClose}
          >
            {STATUS_FILTERS.map((status) => (
              <MenuItem 
                key={status} 
                onClick={() => handleStatusFilter(status)}
                selected={statusFilter === status}
              >
                {status}
              </MenuItem>
            ))}
          </Menu>
          <Box sx={{ flexGrow: 1 }} />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Reservation ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Room Number</TableCell>
                <TableCell>Total amount</TableCell>
                <TableCell>Amount paid</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map(row => (
                <TableRow key={row.id} hover onClick={() => handleOpenModal(row)} style={{ cursor: 'pointer' }}>
                  <TableCell>#{row.reservationId}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {row.image && <Avatar src={row.image} />}
                      {row.name}
                    </Box>
                  </TableCell>
                  <TableCell>{row.roomNumber}</TableCell>
                  <TableCell>{row.totalAmount ? `$ ${row.totalAmount}` : ''}</TableCell>
                  <TableCell>{row.amountPaid ? `$ ${row.amountPaid}` : ''}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color={STATUS_COLORS[row.status] || 'default'}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small"><MoreVertIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={e => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Paper>

      {/* Details Modal */}
      <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="xs" fullWidth>
        <DialogTitle>Guest Details</DialogTitle>
        <DialogContent>
          {selected && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <Avatar src={selected.image} sx={{ width: 64, height: 64, mb: 1 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>{selected.name}</Typography>
              <TextField label="Guest name" value={selected.name} fullWidth margin="dense" InputProps={{ readOnly: true }} />
              <TextField label="Registration number" value={selected.booking?.registrationNumber || ''} fullWidth margin="dense" InputProps={{ readOnly: true }} />
              <TextField label="Check in date" value={selected.booking?.checkIn ? new Date(selected.booking.checkIn).toLocaleDateString() : ''} fullWidth margin="dense" InputProps={{ readOnly: true }} />
              <TextField label="Room type" value={selected.booking?.room?.type || ''} fullWidth margin="dense" InputProps={{ readOnly: true }} />
              <TextField label="Stay" value={selected.booking?.checkIn && selected.booking?.checkOut ? `${Math.ceil((new Date(selected.booking.checkOut) - new Date(selected.booking.checkIn)) / (1000*60*60*24))} nights` : ''} fullWidth margin="dense" InputProps={{ readOnly: true }} />
              <TextField label="Discount" value={selected.booking?.discount ? `$ ${selected.booking.discount}` : ''} fullWidth margin="dense" InputProps={{ readOnly: true }} />
            </Box>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={handleCloseModal} variant="outlined" sx={{ mr: 1 }}>Close</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}