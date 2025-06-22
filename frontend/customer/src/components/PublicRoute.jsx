import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const PublicRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default PublicRoute; 