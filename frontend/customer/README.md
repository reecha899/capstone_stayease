# StayEase Customer Frontend

Customer frontend application for hotel booking with environment-specific configurations.

## Environment Setup

This application supports three environments: **development**, **test**, and **production**.

### Environment Files
```
├── env.dev          # Development environment
├── env.test         # Test environment
└── env.prod         # Production environment
```

### Environment Configurations

#### Development Environment
- **Port**: 3001
- **API URL**: http://localhost:5001/api
- **Admin URL**: http://localhost:3000
- **Logging**: Debug level enabled
- **Features**: Debug mode enabled

#### Test Environment
- **Port**: 3003
- **API URL**: http://localhost:5003/api
- **Admin URL**: http://localhost:3002
- **Logging**: Error level only
- **Features**: Test mode enabled

#### Production Environment
- **Port**: 3001
- **API URL**: https://api.stayease-hotel.com/api
- **Admin URL**: https://admin.stayease-hotel.com
- **Logging**: Warn level enabled
- **Features**: Production optimizations

## Installation

```bash
npm install
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Test Mode
```bash
npm run test
```

### Production Mode
```bash
npm start
```

## Building the Application

### Production Build
```bash
npm run build
```

### Development Build
```bash
npm run build:dev
```

### Test Build
```bash
npm run build:test
```

## Environment Variables

- `REACT_APP_NODE_ENV`: Environment name (development, test, production)
- `REACT_APP_API_URL`: Backend API URL
- `REACT_APP_FRONTEND_URL`: Customer frontend URL
- `REACT_APP_ADMIN_URL`: Admin frontend URL
- `REACT_APP_ENABLE_LOGGING`: Enable/disable logging
- `REACT_APP_LOG_LEVEL`: Logging level (debug, warn, error)

## Using Environment Configuration

Import the environment configuration in your components:

```javascript
import { config, init } from './src/config/env';

// Initialize environment
const { config: envConfig, isValid } = init();

// Use configuration
const apiUrl = config.apiUrl;
const isDevelopment = config.isDevelopment;
```

## Features

- Environment-specific API endpoints
- Different logging levels per environment
- Feature flags for environment-specific functionality
- Automatic environment detection
- Configuration validation
