const dotenv = require('dotenv');
const path = require('path');

// Load environment variables based on NODE_ENV
const loadEnvironment = () => {
    const env = process.env.NODE_ENV || 'development';
    let envPath;

    switch (env) {
        case 'production':
            envPath = path.join(__dirname, 'config.prod.env');
            break;
        case 'test':
            envPath = path.join(__dirname, 'config.test.env');
            break;
        case 'development':
        default:
            envPath = path.join(__dirname, 'config.dev.env');
            break;
    }

    const result = dotenv.config({ path: envPath });
    
    if (result.error) {
        console.warn(`Warning: Could not load environment file: ${envPath}`);
        // Fallback to default config
        dotenv.config({ path: path.join(__dirname, 'config.env') });
    }

    console.log(`Environment loaded: ${env}`);
    return env;
};

// Environment configuration object - will be created after loading environment
let config = null;

// Validate required configuration
const validateConfig = () => {
    const required = ['mongoUri', 'jwtSecret'];
    const missing = required.filter(key => !config[key]);
    
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
};

// Initialize environment
const init = () => {
    loadEnvironment();
    
    // Create config object after environment is loaded
    config = {
        // Server configuration
        port: process.env.CUSTOMER_PORT || 5001,
        nodeEnv: process.env.NODE_ENV || 'development',
        
        // Database configuration
        mongoUri: process.env.MONGODB_URI,
        
        // JWT configuration
        jwtSecret: process.env.JWT_SECRET,
        jwtExpire: process.env.JWT_EXPIRE || '24h',
        
        // Frontend configuration
        frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
        
        // Logging configuration
        logLevel: process.env.LOG_LEVEL || 'info',
        enableLogging: process.env.ENABLE_LOGGING === 'true',
        
        // CORS configuration
        corsOrigins: process.env.CORS_ORIGINS ? 
            process.env.CORS_ORIGINS.split(',') : 
            ['http://localhost:3000', 'http://localhost:3001'],
        
        // Performance configuration
        enableCompression: process.env.ENABLE_COMPRESSION === 'true',
        enableCache: process.env.ENABLE_CACHE === 'true',
        
        // Test configuration
        enableTestMode: process.env.ENABLE_TEST_MODE === 'true'
    };
    
    validateConfig();
    return config;
};

module.exports = {
    config,
    init,
    loadEnvironment,
    validateConfig
}; 