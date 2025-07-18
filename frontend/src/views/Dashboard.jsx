import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, Chip, Divider, IconButton, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const roomStatus = {
  occupied: 104,
  available: 20,
  clean: 90,
  dirty: 4,
  inspected: 60,
  availableClean: 30,
  availableDirty: 19,
  availableInspected: 30,
};

const occupancyStats = [
  { month: 'May', value: 60 },
  { month: 'Jun', value: 80 },
  { month: 'Jul', value: 70 },
  { month: 'Aug', value: 90 },
  { month: 'Sep', value: 75 },
  { month: 'Oct', value: 85 },
  { month: 'Nov', value: 60 },
  { month: 'Dec', value: 70 },
  { month: 'Jan', value: 80 },
  { month: 'Feb', value: 60 },
];

const feedback = [
  { name: 'Mark', comment: 'Food could be better.', room: 'A201' },
  { name: 'Christian', comment: 'Facilities are not enough for amount paid.', room: 'A101' },
  { name: 'Alexander', comment: 'Room cleaning could be better.', room: 'A301' },
];

function Dashboard({ fetchWithAuth }) {
  const [overview, setOverview] = useState([
    { label: "Today's Check-in", value: '-' },
    { label: "Today's Check-out", value: '-' },
    { label: 'Total In hotel', value: '-' },
    { label: 'Total Available room', value: '-' },
    { label: 'Total Occupied room', value: '-' },
    { label: 'Total Reserved room', value: '-' },
  ]);
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      setLoading(true);
      try {
        const res = await fetchWithAuth(`${process.env.REACT_APP_API_URL}/dashboard/overview`);
        const data = await res.json();
        setOverview([
          { label: "Today's Check-in", value: data.todaysCheckIn },
          { label: "Today's Check-out", value: data.todaysCheckOut },
          { label: 'Total In hotel', value: data.inHotel },
          { label: 'Total Available room', value: data.availableRoom },
          { label: 'Total Occupied room', value: data.occupiedRoom },
          { label: 'Total Reserved room', value: data.reservedRoom },
        ]);
      } catch (err) {
        setOverview([
          { label: "Today's Check-in", value: '-' },
          { label: "Today's Check-out", value: '-' },
          { label: 'Total In hotel', value: '-' },
          { label: 'Total Available room', value: '-' },
          { label: 'Total Occupied room', value: '-' },
          { label: 'Total Reserved room', value: '-' },
        ]);
      }
      setLoading(false);
    };
    fetchOverview();
  }, [fetchWithAuth]);

  useEffect(() => {
    const fetchRooms = async () => {
      setRoomsLoading(true);
      try {
        const res = await fetchWithAuth(`${process.env.REACT_APP_API_URL}/dashboard/rooms-summary`);
        const data = await res.json();
        setRooms(data);
      } catch (err) {
        setRooms([]);
      }
      setRoomsLoading(false);
    };
    fetchRooms();
  }, [fetchWithAuth]);

  return (
    <Box className="w-full" sx={{ maxWidth: 1400, mx: 'auto' }}>
      {/* Overview */}
      <Paper elevation={0} className="mb-6" sx={{ p: 3, borderRadius: 3, boxShadow: '0 1px 4px #e6e8ec33', background: '#fff' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Overview</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 },
            justifyContent: 'space-between',
            alignItems: 'stretch',
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
          }}
        >
          {overview.map((item, idx) => (
            <Box
              key={item.label}
              sx={{
                flex: 1,
                minWidth: 0,
                background: '#F4F5F6',
                borderRadius: 2,
                p: 2,
                mx: { xs: 0, sm: idx !== 0 ? 2 : 0 },
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                boxShadow: 'none',
              }}
            >
              <Typography variant="body2" sx={{ color: '#777E90', fontWeight: 400, fontSize: 14, mb: 0.5, lineHeight: 1.2 }}>
                {item.label.replace('Total ', '')}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#3772FF', fontSize: 24, lineHeight: 1.1 }}>
                {loading ? '...' : item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Rooms */}
      <Paper elevation={0} className="mb-6" sx={{ p: 3, borderRadius: 3, boxShadow: '0 1px 4px #e6e8ec33', background: '#fff' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#23262F', fontSize: 18 }}>Rooms</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            overflowX: { xs: 'auto', sm: 'auto' },
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
            pb: 1,
            '::-webkit-scrollbar': { height: 8 },
            '::-webkit-scrollbar-thumb': { background: '#e6e8ec', borderRadius: 4 },
          }}
        >
          {roomsLoading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <Box key={idx} sx={{ minWidth: 220, maxWidth: 260, flex: '0 0 220px', bgcolor: '#F4F5F6', borderRadius: 2, p: 3, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', height: 140 }}>
                <Typography variant="subtitle2" sx={{ color: '#B1B5C3', fontWeight: 500, mt: 2 }}>Loading...</Typography>
              </Box>
            ))
          ) : (
            rooms.map((room, idx) => (
              <Box
                key={room.type}
                sx={{
                  minWidth: 220,
                  maxWidth: 260,
                  flex: '0 0 220px',
                  bgcolor: '#F4F5F6',
                  borderRadius: 2,
                  p: 3,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  height: 140,
                  boxShadow: 'none',
                }}
              >
                {/* Reserve space for badge */}
                <Box sx={{ height: 28, width: '100%' }}>
                  {room.deals > 0 && (
                    <Chip label={`${room.deals} Deals`} size="small" sx={{ position: 'static', background: '#E6F7EC', color: '#45B36B', fontWeight: 700, fontSize: 13, px: 1.5, height: 24, borderRadius: 1.5, mb: 0.5 }} />
                  )}
                </Box>
                <IconButton size="small" sx={{ position: 'absolute', top: 8, right: 8, color: '#B1B5C3' }}>
                  <MoreVertIcon fontSize="small" />
                </IconButton>
                <Typography variant="subtitle2" sx={{ color: '#777E90', fontWeight: 500, fontSize: 16, mb: 0.5 }}>{room.type}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#23262F', fontSize: 22, lineHeight: 1.1 }}>{room.count}</Typography>
                <Typography variant="subtitle2" sx={{ color: '#3772FF', fontWeight: 700, fontSize: 20, mt: 1 }}>
                  $ {room.price?.toLocaleString()} <span style={{ color: '#B1B5C3', fontWeight: 400, fontSize: 16 }}>/day</span>
                </Typography>
              </Box>
            ))
          )}
        </Box>
      </Paper>

      <Grid container spacing={2}>
        {/* Room status */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, boxShadow: '0 1px 4px #e6e8ec33', mb: 2 }}>
            <Typography variant="subtitle2" sx={{ color: '#777E90', fontWeight: 600, mb: 2 }}>Room status</Typography>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: '#B1B5C3' }}>Occupied rooms</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{roomStatus.occupied}</Typography>
                <Typography variant="body2" sx={{ color: '#B1B5C3' }}>Clean</Typography>
                <Typography variant="body2">{roomStatus.clean}</Typography>
                <Typography variant="body2" sx={{ color: '#B1B5C3' }}>Dirty</Typography>
                <Typography variant="body2">{roomStatus.dirty}</Typography>
                <Typography variant="body2" sx={{ color: '#B1B5C3' }}>Inspected</Typography>
                <Typography variant="body2">{roomStatus.inspected}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: '#B1B5C3' }}>Available rooms</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{roomStatus.available}</Typography>
                <Typography variant="body2" sx={{ color: '#B1B5C3' }}>Clean</Typography>
                <Typography variant="body2">{roomStatus.availableClean}</Typography>
                <Typography variant="body2" sx={{ color: '#B1B5C3' }}>Dirty</Typography>
                <Typography variant="body2">{roomStatus.availableDirty}</Typography>
                <Typography variant="body2" sx={{ color: '#B1B5C3' }}>Inspected</Typography>
                <Typography variant="body2">{roomStatus.availableInspected}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {/* Floor status */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, boxShadow: '0 1px 4px #e6e8ec33', mb: 2, height: '100%' }}>
            <Typography variant="subtitle2" sx={{ color: '#777E90', fontWeight: 600, mb: 2 }}>Floor status</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 140 }}>
              <svg width="120" height="80">
                <path d="M20,70 A50,50 0 1,1 100,70" fill="none" stroke="#E6E8EC" strokeWidth="12" />
                <path d="M20,70 A50,50 0 1,1 100,70" fill="none" stroke="#45B36B" strokeWidth="12" strokeDasharray="160" strokeDashoffset="32" />
                <text x="60" y="60" textAnchor="middle" fontSize="28" fill="#23262F" fontWeight="bold">80%</text>
              </svg>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: '#45B36B', mr: 0.5 }} />
                  <Typography variant="caption">Completed</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 2 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: '#E6E8EC', mr: 0.5 }} />
                  <Typography variant="caption">Yet to Complete</Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
        {/* Customers feedback */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, boxShadow: '0 1px 4px #e6e8ec33', mb: 2, height: '100%' }}>
            <Typography variant="subtitle2" sx={{ color: '#777E90', fontWeight: 600, mb: 2 }}>Customers feedback</Typography>
            {feedback.map((item, idx) => (
              <Box key={item.name} sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.name}</Typography>
                <Typography variant="body2" sx={{ color: '#B1B5C3' }}>{item.comment}</Typography>
                <Typography variant="caption" sx={{ color: '#777E90' }}>{item.room}</Typography>
                {idx !== feedback.length - 1 && <Divider sx={{ my: 1 }} />}
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>

      {/* Occupancy Statistics */}
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, boxShadow: '0 1px 4px #e6e8ec33', height: 300 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle2" sx={{ color: '#777E90', fontWeight: 600 }}>Occupancy Statistics</Typography>
              <Button size="small" sx={{ background: '#F4F5F6', color: '#23262F', borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>Monthly</Button>
            </Box>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={occupancyStats} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="#B1B5C3" />
                <YAxis axisLine={false} tickLine={false} stroke="#B1B5C3" domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="value" fill="#3772FF" radius={[8, 8, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard; 