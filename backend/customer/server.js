const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load env vars
dotenv.config({ path: '../config/config.env' });

const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount routers
app.use('/api/auth', authRoutes);

const PORT = process.env.CUSTOMER_PORT || 5001;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB Connected');
  app.listen(PORT, () => console.log(`Customer server running on port ${PORT}`));
})
.catch(err => {
  console.error(err.message);
  process.exit(1);
}); 