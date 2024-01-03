const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('./server/config/db');
const passport = require('./server/config/passport');
const cookieParser = require('cookie-parser');

const app = express();

connectDB();

app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

// Use the router for all '/' routes
app.use('/', require('./server/routes/indexRoutes'));

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
