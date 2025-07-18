const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { init: initEnv } = require('./config/env');

// Initialize environment configuration
const envConfig = initEnv();

const authRoutes = require('./routes/auth');

const app = express();

// CORS Configuration
const corsOptions = {
    origin: envConfig.corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Mount routers
app.use('/api/auth', authRoutes);

const PORT = envConfig.port;

// Connect to MongoDB
mongoose.connect(envConfig.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB Connected');
  app.listen(PORT, () => console.log(`Customer server running on port ${PORT} in ${envConfig.nodeEnv} mode`));
})
.catch(err => {
  console.error(err.message);
  process.exit(1);
}); 