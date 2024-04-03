// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const logger = require('./config/winston');
const expressLogger = require('./middleware/expressLogger');
// const ensureRole = require('./middleware/ensureRole');
const Routes = require('./routes');

// Create an instance of the Express application
const app = express();

// Use CORS middleware to handle Cross-Origin Resource Sharing
app.use(cors());

// Use body parser middleware for parsing JSON in request bodies
app.use(express.json());

// Log detailed information about each request using custom middleware
app.use(expressLogger);

const sessionTime = parseInt(process.env.SESSION_TIME, 10);
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: sessionTime * 1000 * 60 * 60,
        },
    }),
);
app.use(passport.initialize());
app.use(passport.session());
// Test route to ensure the server is working
app.get('/', (req, res) => {
    res.send('Routes Working');
});

// Define routes for different parts of the application
// Unauthenticated routes
app.use('/auth', Routes.auth);

// should be removed following routes use for testing
app.use('/admin', Routes.admin);

// // Authenticated routes
// app.use('/admin', ensureRole('admin'), Routes.admin);

// Connect to MongoDB Atlas database
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        // Log successful database connection
        logger.info('Connected to MongoDB Atlas!');
        console.log('Connected to MongoDB Atlas!');
    })
    .catch((error) => {
        // Log error if database connection fails
        logger.error('Error connecting to MongoDB:');
        logger.error(error.message);
        console.error('Error connecting to MongoDB:', error.message);
    });

// Run the server on the specified port
const serverPort = parseInt(process.env.SERVER_PORT, 10);
app.listen(serverPort, () => {
    // Log server startup message
    logger.info(`Server is running at localhost:${serverPort}`);
    console.log(`Server is running at localhost:${serverPort}`);
});
