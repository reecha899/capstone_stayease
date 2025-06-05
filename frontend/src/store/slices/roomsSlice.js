import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rooms: [
    { id: 101, type: 'Deluxe', price: '$200', status: 'Available', capacity: 2 },
    { id: 102, type: 'Suite', price: '$300', status: 'Occupied', capacity: 4 },
    { id: 103, type: 'Standard', price: '$150', status: 'Available', capacity: 2 },
  ],
  loading: false,
  error: null,
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    addRoom: (state, action) => {
      state.rooms.push(action.payload);
    },
    updateRoom: (state, action) => {
      const index = state.rooms.findIndex((room) => room.id === action.payload.id);
      if (index !== -1) {
        state.rooms[index] = action.payload;
      }
    },
    deleteRoom: (state, action) => {
      state.rooms = state.rooms.filter((room) => room.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addRoom, updateRoom, deleteRoom, setLoading, setError } =
  roomsSlice.actions;

export default roomsSlice.reducer; 