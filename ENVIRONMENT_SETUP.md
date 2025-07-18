# Environment Setup Guide

This guide explains how to set up and manage environments for the StayEase project across development, testing, and production.

## 📁 Environment Structure

```
capstone_stayease/
├── backend/
│   ├── admin/
│   │   └── config/
│   │       ├── config.dev.template      # Development template
│   │       ├── config.test.template     # Test template
│   │       ├── config.prod.template     # Production template
│   │       ├── config.dev.env           # Actual dev config (not in git)
│   │       ├── config.test.env          # Actual test config (not in git)
│   │       └── config.prod.env          # Actual prod config (not in git)
│   └── customer/
│       └── config/
│           ├── config.dev.template      # Development template
│           ├── config.test.template     # Test template
│           ├── config.prod.template     # Production template
│           ├── config.dev.env           # Actual dev config (not in git)
│           ├── config.test.env          # Actual test config (not in git)
│           └── config.prod.env          # Actual prod config (not in git)
└── frontend/
    ├── env.dev.template                 # Development template
    ├── env.test.template                # Test template
    ├── env.prod.template                # Production template
    ├── env.dev                          # Actual dev config (not in git)
    ├── env.test                         # Actual test config (not in git)
    ├── env.prod                         # Actual prod config (not in git)
    └── customer/
        ├── env.dev.template             # Development template
        ├── env.test.template            # Test template
        ├── env.prod.template            # Production template
        ├── env.dev                      # Actual dev config (not in git)
        ├── env.test                     # Actual test config (not in git)
        └── env.prod                     # Actual prod config (not in git)
```

## 🚀 Initial Setup

### Step 1: Copy Templates to Actual Environment Files

#### Backend Admin
```bash
cd backend/admin/config
copy config.dev.template config.dev.env
copy config.test.template config.test.env
copy config.prod.template config.prod.env
```

#### Backend Customer
```bash
cd backend/customer/config
copy config.dev.template config.dev.env
copy config.test.template config.test.env
copy config.prod.template config.prod.env
```

#### Frontend Admin
```bash
cd frontend
copy env.dev.template env.dev
copy env.test.template env.test
copy env.prod.template env.prod
```

#### Frontend Customer
```bash
cd frontend/customer
copy env.dev.template env.dev
copy env.test.template env.test
copy env.prod.template env.prod
```

### Step 2: Customize Environment Files (Optional)

The templates already contain the actual configuration values, but you can modify them if needed:

- **MongoDB URI**: Currently set to your actual MongoDB cluster
- **JWT Secrets**: Already configured with secure secrets
- **Ports**: Pre-configured for each environment
- **URLs**: Set to appropriate localhost/production URLs

## 🔧 Environment Configurations

### Development Environment
- **Admin Backend**: Port 5000
- **Customer Backend**: Port 5001
- **Admin Frontend**: Port 3000
- **Customer Frontend**: Port 3001
- **Database**: Same MongoDB cluster
- **Logging**: Debug level enabled

### Test Environment
- **Admin Backend**: Port 5002
- **Customer Backend**: Port 5003
- **Admin Frontend**: Port 3002
- **Customer Frontend**: Port 3003
- **Database**: Same MongoDB cluster
- **Logging**: Error level only

### Production Environment
- **Admin Backend**: Port 5000
- **Customer Backend**: Port 5001
- **Admin Frontend**: Port 3000
- **Customer Frontend**: Port 3001
- **Database**: Same MongoDB cluster
- **Logging**: Warn level enabled

## 🏃‍♂️ Running Services

### Development Mode
```bash
# Admin Backend
cd backend/admin && npm run dev

# Customer Backend
cd backend/customer && npm run dev

# Admin Frontend
cd frontend && npm run dev

# Customer Frontend
cd frontend/customer && npm run dev
```

### Test Mode
```bash
# Admin Backend
cd backend/admin && npm run test

# Customer Backend
cd backend/customer && npm run test

# Admin Frontend
cd frontend && npm run test

# Customer Frontend
cd frontend/customer && npm run test
```

### Production Mode
```bash
# Admin Backend
cd backend/admin && npm start

# Customer Backend
cd backend/customer && npm start

# Admin Frontend
cd frontend && npm start

# Customer Frontend
cd frontend/customer && npm start
```

## 📤 GitHub Deployment

### What Gets Committed to Git
✅ **Templates** (safe to commit):
- `config.dev.template`
- `config.test.template`
- `config.prod.template`
- `env.dev.template`
- `env.test.template`
- `env.prod.template`

❌ **Actual Configs** (not committed):
- `config.dev.env`
- `config.test.env`
- `config.prod.env`
- `env.dev`
- `env.test`
- `env.prod`
- `.env`

### Git Commands
```bash
# Add all templates
git add **/*.template

# Add source code
git add .

# Commit
git commit -m "Add environment templates and source code"

# Push to GitHub
git push origin main
```

## 🔒 Security Notes

1. **Templates are Safe**: All sensitive data has been replaced with actual working values
2. **Same Database**: All environments use the same MongoDB cluster for simplicity
3. **JWT Secrets**: Each environment has unique JWT secrets for security
4. **CORS**: Properly configured for each environment
5. **Logging**: Appropriate levels for each environment

## 🆘 Troubleshooting

### Environment Not Loading
- Check if environment files exist in the correct locations
- Verify file permissions
- Ensure no syntax errors in environment files

### Port Conflicts
- Each environment uses different ports to avoid conflicts
- Check if ports are available before starting services

### Database Connection
- All environments use the same MongoDB cluster
- Verify MongoDB connection string is correct
- Check network connectivity

## 📝 Environment Variables Reference

### Backend Variables
- `NODE_ENV`: Environment name (development, test, production)
- `PORT`/`CUSTOMER_PORT`: Server port
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing secret
- `JWT_EXPIRE`: JWT expiration time
- `FRONTEND_URL`: Frontend URL for CORS
- `LOG_LEVEL`: Logging level
- `ENABLE_LOGGING`: Enable/disable logging
- `CORS_ORIGINS`: Allowed CORS origins

### Frontend Variables
- `REACT_APP_NODE_ENV`: Environment name
- `REACT_APP_API_URL`: Backend API URL
- `REACT_APP_FRONTEND_URL`: Frontend URL
- `REACT_APP_ENABLE_LOGGING`: Enable/disable logging
- `REACT_APP_LOG_LEVEL`: Logging level 