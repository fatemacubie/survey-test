const fs = require('fs');
const path = require('path');
const winston = require('winston');
const expressWinston = require('express-winston');

const { combine, timestamp, printf, splat } = winston.format;

// Constants for log file settings
const MAX_FILES = 10; // maximum log files
const MAX_SIZE_MB = 10; // maximum size of each log file

// Function to generate a unique log ID
const generateLogId = () => Math.random().toString(36).substring(7);

const logFormat = printf(({ level, message, timestamp, ...meta }) => {
    const logId = generateLogId();
    const metaString = Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : '';
    return `${timestamp} [${level.toUpperCase()}] [${logId}]: ${message}${metaString}`;
});

// Create a 'logs' directory if it doesn't exist
const logsDir = 'logs';
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Calculate max size in bytes based on the constant
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

// Create a single transport for all logs with maxFiles and maxsize options
const transport = new winston.transports.File({
    filename: path.join(logsDir, 'all-detail-logs.log'),
    maxFiles: MAX_FILES,
    maxsize: MAX_SIZE_BYTES,
});

const expressLogger = expressWinston.logger({
    transports: [transport],
    format: combine(timestamp(), splat(), logFormat),
    meta: true,
    msg: (req, res) => `[${req.method}] ${req.url} - ${res.statusCode}: ${res.responseTime}ms`,
    expressFormat: false,
    colorize: false,
    statusLevels: true,
});

module.exports = expressLogger;
