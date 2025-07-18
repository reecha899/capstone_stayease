# StayEase Customer Backend

Customer backend service for StayEase hotel booking with environment-specific configurations.

## Environment Setup

This service supports three environments: **development**, **test**, and **production**.

### Environment Files
```
config/
├── config.env          # Default configuration
├── config.dev.env      # Development environment
├── config.test.env     # Test environment
└── config.prod.env     # Production environment
```

### Environment Configurations

#### Development Environment
- **Port**: 5001
- **Database**: `capstone_stayease_dev`
- **Logging**: Debug level enabled
- **CORS**: Localhost origins allowed
- **JWT**: 24-hour expiration

#### Test Environment
- **Port**: 5003
- **Database**: `capstone_stayease_test`
- **Logging**: Error level only
- **CORS**: Test-specific origins
- **JWT**: 1-hour expiration

#### Production Environment
- **Port**: 5001
- **Database**: `capstone_stayease_prod`
- **Logging**: Warn level enabled
- **CORS**: Production domain origins
- **JWT**: 12-hour expiration
- **Performance**: Compression and caching enabled

## Installation

```bash
npm install
```

## Running the Service

### Development Mode
```bash
npm run dev
# or
npm run dev:customer
```

### Test Mode
```bash
npm run test
# or
npm run test:customer
```

### Production Mode
```bash
npm run prod
# or
npm run prod:customer
```

### Default Start (Production)
```bash
npm start
```

## Environment Variables

- `CUSTOMER_PORT`: Server port (default: 5001)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing secret
- `JWT_EXPIRE`: JWT expiration time
- `FRONTEND_URL`: Frontend URL for CORS
- `LOG_LEVEL`: Logging level (debug, warn, error)
- `ENABLE_LOGGING`: Enable/disable logging
- `CORS_ORIGINS`: Allowed CORS origins

## API Routes

- `/api/auth` - Customer authentication routes

## Security Features

- Environment-specific JWT secrets
- Different CORS configurations per environment
- Separate database instances
- Environment-specific logging levels
- Production-specific security measures 