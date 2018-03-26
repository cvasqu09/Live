const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb://jstuve22:joshs22@liveapp-cluster-shard-00-00-jy1qa.mongodb.net:27017,liveapp-cluster-shard-00-01-jy1qa.mongodb.net:27017,liveapp-cluster-shard-00-02-jy1qa.mongodb.net:27017/LiveDB?ssl=true&replicaSet=LiveApp-Cluster-shard-0&authSource=admin');
// API file for interacting with MongoDB
const api = require('./server/routes/api');
const eventsRoutes = require('./server/routes/events');
const userRoutes = require('./server/routes/users');
const smsRoutes = require('./server/routes/sms');
const appRoutes = require('./server/routes/app');

// Parser for incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// Allows for cross origin resource sharing since our Mongo may or may not be one the same serving machine
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allows for requests from any domain.
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

// Initial Angular application route
app.use('/', appRoutes);

// API locations
app.use('/api/users', userRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/sms', smsRoutes);
app.use('/api', api);

app.all('*', function (req, res) {
  res.redirect('/'); // Redirect to main screen if invalid path given
});

// Set Port
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
