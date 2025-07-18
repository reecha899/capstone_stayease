const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const { init: initEnv } = require('./config/env');

// Initialize environment configuration
const envConfig = initEnv();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
    origin: envConfig.corsOrigins, // Use environment-specific origins
    credentials: true, // Allow cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Token-Expiry-Warning']
};

// Middleware
app.use(cors(corsOptions));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/users', require('./routes/users'));
app.use('/api/deals', require('./routes/deals'));
app.use('/api/rates', require('./routes/rates'));
app.use('/api/guests', require('./routes/guests'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = envConfig.port;
app.listen(PORT, () => {
    console.log(`Admin server running on port ${PORT} in ${envConfig.nodeEnv} mode`);
}); 