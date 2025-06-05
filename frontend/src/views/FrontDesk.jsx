import React, { useEffect, useState } from 'react';
import {
  Box, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Menu, MenuItem, TextField, FormControl, InputLabel, Select
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Add as AddIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import CenteredLoader from '../components/CenteredLoader';

dayjs.extend(isoWeek);

const ROOM_TYPE_OPTIONS = [
  { value: '', label: 'All room' },
  { value: 'single', label: 'Single' },
  { value: 'double', label: 'Double' },
  { value: 'triple', label: 'Triple' },
  { value: 'vip', label: 'VIP' },
];

const STATUS_COLORS = {
  Available: 'success',
  Booked: 'error',
  Reserved: 'warning',
  Waitlist: 'default',
  DueIn: '#FFE6A0',
  CheckedOut: '#E6F0FF',
  DueOut: '#FFD6D6',
  CheckedIn: '#D6F5E6',
};

const STATUS_TEXT_COLORS = {
  DueIn: '#B08800',
  CheckedOut: '#2563EB',
  DueOut: '#E24C4B',
  CheckedIn: '#45B36B',
};

const STATUS_LABELS = {
  DueIn: 'Due in',
  CheckedOut: 'Checked out',
  DueOut: 'Due out',
  CheckedIn: 'Checked in',
};

export default function FrontDesk({ fetchWithAuth }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomType, setRoomType] = useState('');
  const [checkIn, setCheckIn] = useState(dayjs());
  const [checkOut, setCheckOut] = useState(dayjs().add(1, 'day'));
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [weekStart, setWeekStart] = useState(dayjs().startOf('week').add(1, 'day')); // Monday

  useEffect(() => {
    fetchRooms();
    fetchBookings();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth('http://localhost:5000/api/rooms');
      const data = await res.json();
      setRooms(data);
      setFilteredRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
    setLoading(false);
  };

  const fetchBookings = async () => {
    try {
      const res = await fetchWithAuth('http://localhost:5000/api/bookings');
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      setBookings([]);
    }
  };

  const handleRoomTypeFilter = (type) => {
    setRoomType(type);
    if (!type) {
      setFilteredRooms(rooms);
    } else {
      setFilteredRooms(rooms.filter(r => r.type && r.type.toLowerCase() === type));
    }
  };

  const handleCheckAvailability = () => {
    // For now, just filter by status === 'Available' and roomType
    let filtered = rooms;
    if (roomType) {
      filtered = filtered.filter(r => r.type && r.type.toLowerCase() === roomType);
    }
    filtered = filtered.filter(r => r.status === 'Available');
    setFilteredRooms(filtered);
  };

  function getBookingStatus(booking) {
    // You may want to adjust this logic based on your real booking data
    const today = dayjs().startOf('day');
    const checkIn = dayjs(booking.checkIn);
    const checkOut = dayjs(booking.checkOut);
    if (today.isBefore(checkIn)) return 'DueIn';
    if (today.isAfter(checkOut)) return 'CheckedOut';
    if (today.isSame(checkIn)) return 'CheckedIn';
    if (today.isSame(checkOut)) return 'DueOut';
    if (today.isAfter(checkIn) && today.isBefore(checkOut)) return 'CheckedIn';
    return 'DueIn';
  }

  // Week navigation handlers
  const handlePrevWeek = () => setWeekStart(weekStart.subtract(1, 'week'));
  const handleNextWeek = () => setWeekStart(weekStart.add(1, 'week'));

  // Days in the current week
  const weekDays = Array.from({ length: 7 }, (_, i) => weekStart.add(i, 'day'));
  const currentMonth = dayjs().month();
  const weekMonths = [...new Set(weekDays.map(d => d.month()))];

  if (loading) return <CenteredLoader message="Loading rooms..." />;

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 1100, mx: 'auto', mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Front desk</Typography>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 1px 4px #e6e8ec33', mb: 3, bgcolor: '#f8fafb' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          {ROOM_TYPE_OPTIONS.map((opt, idx) => (
            <Button
              key={opt.value}
              variant={roomType === opt.value ? 'contained' : 'outlined'}
              onClick={() => handleRoomTypeFilter(opt.value)}
              sx={{
                minWidth: 100,
                borderRadius: 999,
                fontWeight: 600,
                bgcolor: roomType === opt.value ? '#2563eb' : '#fff',
                color: roomType === opt.value ? '#fff' : '#23262F',
                borderColor: '#e6e8ec',
                boxShadow: 'none',
                px: 2,
                ...(roomType === opt.value && { boxShadow: '0 2px 8px #2563eb22' })
              }}
            >
              {opt.label}{idx === 0 ? `(${rooms.length})` : ''}
            </Button>
          ))}
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          flexWrap: 'wrap',
          bgcolor: '#f8fafb',
          borderRadius: 3,
          p: 2,
          boxShadow: 'none',
          justifyContent: 'space-between',
        }}>
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <Box>
              <Typography sx={{ fontWeight: 500, fontSize: 15, mb: 0.5 }}>Check in</Typography>
              <DatePicker
                value={checkIn}
                onChange={setCheckIn}
                sx={{ minWidth: 140, bgcolor: '#fff', borderRadius: 2 }}
                slotProps={{ textField: { size: 'small' } }}
              />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 500, fontSize: 15, mb: 0.5 }}>Check out</Typography>
              <DatePicker
                value={checkOut}
                onChange={setCheckOut}
                sx={{ minWidth: 140, bgcolor: '#fff', borderRadius: 2 }}
                slotProps={{ textField: { size: 'small' } }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box>
                <Typography sx={{ fontWeight: 500, fontSize: 15 }}>Adult</Typography>
                <Typography sx={{ fontSize: 12, color: '#8e9bae' }}>Older than 12 years</Typography>
              </Box>
              <Button onClick={() => setAdults(Math.max(1, adults - 1))} variant="outlined" size="small" sx={{ minWidth: 32, borderRadius: 999, px: 0 }}>-</Button>
              <Typography sx={{ fontWeight: 600, fontSize: 18 }}>{adults}</Typography>
              <Button onClick={() => setAdults(adults + 1)} variant="outlined" size="small" sx={{ minWidth: 32, borderRadius: 999, px: 0 }}>+</Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box>
                <Typography sx={{ fontWeight: 500, fontSize: 15 }}>Children</Typography>
                <Typography sx={{ fontSize: 12, color: '#8e9bae' }}>0 - 12 years</Typography>
              </Box>
              <Button onClick={() => setChildren(Math.max(0, children - 1))} variant="outlined" size="small" sx={{ minWidth: 32, borderRadius: 999, px: 0 }}>-</Button>
              <Typography sx={{ fontWeight: 600, fontSize: 18 }}>{children}</Typography>
              <Button onClick={() => setChildren(children + 1)} variant="outlined" size="small" sx={{ minWidth: 32, borderRadius: 999, px: 0 }}>+</Button>
            </Box>
          </Box>
          <Button variant="contained" sx={{ minWidth: 180, height: 48, fontWeight: 600, fontSize: 16, borderRadius: 2, boxShadow: 'none', bgcolor: '#2563eb' }} onClick={handleCheckAvailability}>
            Check availability
          </Button>
        </Box>
      </Paper>
      <Paper sx={{ p: 0, borderRadius: 3, boxShadow: '0 1px 4px #e6e8ec33' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Room number</TableCell>
                <TableCell>Bed type</TableCell>
                <TableCell>Room floor</TableCell>
                <TableCell>Room facility</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRooms.map((room) => (
                <TableRow key={room._id}>
                  <TableCell>#{room.roomNumber}</TableCell>
                  <TableCell>{room.type ? room.type.charAt(0).toUpperCase() + room.type.slice(1) : ''}</TableCell>
                  <TableCell>Floor - {room.floor}</TableCell>
                  <TableCell>{room.description}</TableCell>
                  <TableCell>
                    <Chip
                      label={room.status}
                      color={
                        room.status === 'Available' ? 'success' :
                        room.status === 'Booked' ? 'error' :
                        room.status === 'Reserved' ? 'warning' :
                        room.status === 'Waitlist' ? 'default' :
                        'default'
                      }
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
      </Paper>
      <Paper sx={{ p: 0, borderRadius: 3, boxShadow: '0 1px 4px #e6e8ec33', mt: 3, background: '#fff' }}>
        <Box sx={{ p: 3, overflowX: 'auto' }}>
          {/* Legend */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 24, height: 24, borderRadius: 2, background: STATUS_COLORS[key], display: 'inline-block', mr: 1 }} />
                <Typography sx={{ color: STATUS_TEXT_COLORS[key], fontWeight: 600, fontSize: 15 }}>{label}</Typography>
              </Box>
            ))}
          </Box>
          {/* Week Navigation and Month Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, ml: 10, gap: 2 }}>
            <Button onClick={handlePrevWeek} size="small" variant="outlined" sx={{ minWidth: 36, px: 1, fontWeight: 600 }}>&lt;</Button>
            {weekMonths.map(monthIdx => (
              <Typography
                key={monthIdx}
                sx={{
                  minWidth: 90,
                  textAlign: 'center',
                  color: monthIdx === currentMonth ? '#2563EB' : '#B1B5C3',
                  fontWeight: monthIdx === currentMonth ? 700 : 500,
                  fontSize: 18,
                  background: monthIdx === currentMonth ? '#F4F5F6' : 'transparent',
                  borderRadius: 2,
                  px: 2,
                  py: 0.5,
                }}
              >
                {dayjs().month(monthIdx).format('MMM')}
              </Typography>
            ))}
            <Button onClick={handleNextWeek} size="small" variant="outlined" sx={{ minWidth: 36, px: 1, fontWeight: 600 }}>&gt;</Button>
          </Box>
          {/* Days of the week header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, ml: { xs: 0, md: 10 }, width: '100%' }}>
            {weekDays.map((d, i) => {
              const isToday = d.isSame(dayjs(), 'day');
              return (
                <Box key={i} sx={{ flex: 1, textAlign: 'center', position: 'relative', minWidth: 0 }}>
                  <Typography
                    sx={{
                      color: isToday ? '#2563EB' : '#B1B5C3',
                      fontWeight: isToday ? 700 : 500,
                      borderRadius: '50%',
                      background: isToday ? '#fff' : 'transparent',
                      px: 1.5,
                      py: 0.5,
                      border: isToday ? '2px solid #2563EB' : 'none',
                      display: 'inline-block',
                      fontSize: { xs: 15, md: 18 },
                    }}
                  >
                    {d.date()}
                  </Typography>
                  <Typography sx={{ color: '#B1B5C3', fontSize: { xs: 11, md: 13 }, fontWeight: 500 }}>{d.format('ddd')}</Typography>
                </Box>
              );
            })}
          </Box>
          {/* Timeline Rows */}
          <Box sx={{ position: 'relative', minHeight: 300, width: '100%' }}>
            {/* Vertical grid lines for each day */}
            <Box sx={{ position: 'absolute', top: 0, left: 100, right: 0, bottom: 0, zIndex: 0, display: 'flex', width: 'calc(100% - 100px)' }}>
              {weekDays.map((_, i) => (
                <Box key={i} sx={{ flex: 1, borderLeft: '1px solid #F4F5F6', height: '100%' }} />
              ))}
            </Box>
            {/* Room rows and booking bars */}
            <Box sx={{ position: 'relative', zIndex: 1, width: '100%' }}>
              {rooms.map((room, rowIdx) => (
                <Box key={room._id} sx={{ display: 'flex', alignItems: 'center', height: 36, mb: 1 }}>
                  <Typography sx={{ minWidth: 100, color: '#23262F', fontWeight: 500, fontSize: { xs: 14, md: 16 } }}>{room.roomNumber}</Typography>
                  <Box sx={{ display: 'flex', flex: 1, position: 'relative', height: 32, width: '100%' }}>
                    {bookings.filter(b => b.room && b.room._id === room._id).map(b => {
                      const checkIn = dayjs(b.checkIn);
                      const checkOut = dayjs(b.checkOut);
                      // Only show if booking overlaps with this week
                      if (checkOut.isBefore(weekStart, 'day') || checkIn.isAfter(weekStart.add(6, 'day'), 'day')) return null;
                      // Clamp bar to week
                      const barStart = checkIn.isBefore(weekStart, 'day') ? 0 : checkIn.diff(weekStart, 'day');
                      const barEnd = checkOut.isAfter(weekStart.add(6, 'day'), 'day') ? 6 : checkOut.diff(weekStart, 'day');
                      const days = Math.max(1, barEnd - barStart + 1);
                      const status = getBookingStatus(b);
                      return (
                        <Box
                          key={b._id}
                          sx={{
                            position: 'absolute',
                            left: `calc(${(barStart / 7) * 100}% )`,
                            width: `calc(${(days / 7) * 100}% )`,
                            height: 28,
                            bgcolor: STATUS_COLORS[status],
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            px: 1.5,
                            color: STATUS_TEXT_COLORS[status],
                            fontWeight: 600,
                            fontSize: { xs: 13, md: 15 },
                            boxShadow: '0 1px 4px #e6e8ec33',
                            border: isTodayInRange(checkIn, checkOut) ? '2px solid #2563EB' : 'none',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {b.User || b.guestName || b.guest?.name || 'Booking'}
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

// Helper to highlight if today is in the booking range
function isTodayInRange(checkIn, checkOut) {
  const today = dayjs().startOf('day');
  return today.isSame(checkIn, 'day') || today.isSame(checkOut, 'day') || (today.isAfter(checkIn) && today.isBefore(checkOut));
} 