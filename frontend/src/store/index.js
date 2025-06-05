import { configureStore } from '@reduxjs/toolkit';
import roomsReducer from './slices/roomsSlice';
import bookingsReducer from './slices/bookingsSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    bookings: bookingsReducer,
    users: usersReducer,
  },
}); 