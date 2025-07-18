#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0] || 'dev';

console.log(`Starting Admin Frontend in ${command} mode...`);

// Environment file mapping
const envFiles = {
    dev: 'env.dev',
    test: 'env.test',
    prod: 'env.prod'
};

const envFile = envFiles[command] || envFiles.dev;
const envPath = path.join(__dirname, envFile);
const targetEnvPath = path.join(__dirname, '.env');

// Copy environment file
if (fs.existsSync(envPath)) {
    fs.copyFileSync(envPath, targetEnvPath);
    console.log(`Environment file copied: ${envFile} -> .env`);
} else {
    console.error(`Environment file not found: ${envFile}`);
    process.exit(1);
}

// Start React app - always use 'start' to run the application
const reactScript = 'start';
const child = spawn('react-scripts', [reactScript], {
    stdio: 'inherit',
    shell: true,
    env: {
        ...process.env,
        REACT_APP_NODE_ENV: command === 'prod' ? 'production' : command
    }
});

child.on('error', (error) => {
    console.error('Error starting Admin Frontend:', error);
});

child.on('exit', (code) => {
    console.log(`Admin Frontend exited with code ${code}`);
    // Clean up .env file
    if (fs.existsSync(targetEnvPath)) {
        fs.unlinkSync(targetEnvPath);
    }
    process.exit(code);
});

// Handle process termination
process.on('SIGINT', () => {
    console.log('\nShutting down Admin Frontend...');
    child.kill('SIGINT');
});

process.on('SIGTERM', () => {
    console.log('\nShutting down Admin Frontend...');
    child.kill('SIGTERM');
});

console.log('Admin Frontend started. Press Ctrl+C to stop.'); 