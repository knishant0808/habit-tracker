// Import the express module to create a new server
const express = require('express');
// Import the path module for handling and transforming file paths
const path = require('path');
// Import the body-parser module for parsing incoming request bodies
const bodyParser = require('body-parser');
// Import the database connection function
const connectDB = require('./server/config/db');
// Import the passport module for authentication
const passport = require('./server/config/passport');
// Import the cookie-parser module for parsing cookie headers
const cookieParser = require('cookie-parser');

// Create a new express application
const app = express();

// Connect to the database
connectDB();

// Set the views directory and view engine for the express application
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

// Use the cookie-parser middleware
app.use(cookieParser());
// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, 'client')));
// Use the body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Initialize passport for authentication
app.use(passport.initialize());

// Use the router for all '/' routes
app.use('/', require('./server/routes/indexRoutes'));

// Define the port the server will listen on
const port = 5000;
// Start the server and log a message to the console
app.listen(port, () => console.log(`Server running on port ${port}`));