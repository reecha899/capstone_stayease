import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookings: [
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
  ],
  loading: false,
  error: null,
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    updateBooking: (state, action) => {
      const index = state.bookings.findIndex(
        (booking) => booking.id === action.payload.id
      );
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    },
    deleteBooking: (state, action) => {
      state.bookings = state.bookings.filter(
        (booking) => booking.id !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addBooking,
  updateBooking,
  deleteBooking,
  setLoading,
  setError,
} = bookingsSlice.actions;

export default bookingsSlice.reducer; 