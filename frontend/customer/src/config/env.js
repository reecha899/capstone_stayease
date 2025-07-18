// Environment configuration for Customer Frontend
const env = process.env.REACT_APP_NODE_ENV || 'development';

// Environment configuration object
const config = {
    // Environment
    nodeEnv: env,
    isDevelopment: env === 'development',
    isTest: env === 'test',
    isProduction: env === 'production',
    
    // API Configuration
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
    authApiUrl: process.env.REACT_APP_AUTH_API_URL || 'http://localhost:5001/api',
    
    // Frontend URLs
    frontendUrl: process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3001',
    adminUrl: process.env.REACT_APP_ADMIN_URL || 'http://localhost:3000',
    
    // Logging Configuration
    enableLogging: process.env.REACT_APP_ENABLE_LOGGING === 'true',
    logLevel: process.env.REACT_APP_LOG_LEVEL || 'info',
    
    // Feature Flags
    enableDebugMode: env === 'development',
    enableTestMode: env === 'test',
    enableProductionMode: env === 'production'
};

// Validate required configuration
const validateConfig = () => {
    const required = ['apiUrl', 'frontendUrl'];
    const missing = required.filter(key => !config[key]);
    
    if (missing.length > 0) {
        console.error(`Missing required environment variables: ${missing.join(', ')}`);
        return false;
    }
    
    return true;
};

// Initialize environment
const init = () => {
    const isValid = validateConfig();
    
    if (config.enableLogging) {
        console.log(`Customer Frontend Environment: ${env}`);
        console.log(`API URL: ${config.apiUrl}`);
        console.log(`Frontend URL: ${config.frontendUrl}`);
    }
    
    return { config, isValid };
};

export { config, init, validateConfig };
export default config; 