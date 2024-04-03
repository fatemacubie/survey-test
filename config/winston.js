const fs = require('fs');
const path = require('path');
const winston = require('winston');

const { combine, timestamp, printf, splat } = winston.format;

const logFormat = printf(({ level, message, timestamp, ...meta }) => {
    const metaString = Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : '';
    return `${timestamp} [${level.toUpperCase()}]: ${message}${metaString}`;
});

// Create a 'logs' directory if it doesn't exist
const logsDir = 'logs';
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Create a combined logger configuration
const logger = winston.createLogger({
    format: combine(timestamp(), splat(), logFormat),
    transports: [
        new winston.transports.File({ filename: path.join(logsDir, 'all-logs.log') }), // Combined file for all log levels
    ],
});

module.exports = logger;
