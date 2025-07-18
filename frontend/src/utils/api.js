import { config } from '../config/env';

// Initialize environment configuration
const { init } = require('../config/env');
init();

// Base API URL from environment configuration
const API_BASE_URL = config.apiUrl;

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
    return `${API_BASE_URL}${endpoint}`;
};

// Fetch with authentication
export const fetchWithAuth = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');
    const url = endpoint.startsWith('http') ? endpoint : getApiUrl(endpoint);
    
    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers,
        },
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
};

// Fetch without authentication
export const fetchWithoutAuth = async (endpoint, options = {}) => {
    const url = endpoint.startsWith('http') ? endpoint : getApiUrl(endpoint);
    
    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
};

// API endpoints
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        ME: '/auth/me',
    },
    ROOMS: '/rooms',
    BOOKINGS: '/bookings',
    GUESTS: '/guests',
    DEALS: '/deals',
    RATES: '/rates',
    USERS: '/users',
    DASHBOARD: {
        OVERVIEW: '/dashboard/overview',
        ROOMS_SUMMARY: '/dashboard/rooms-summary',
    },
}; 