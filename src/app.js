const http = require('http');
const path = require('path');
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const listEndpoints = require('express-list-endpoints')
const config = require('./config/environment');
const databaseConfig = require('../src/config/database/mongo.config');

const app = express();
const api = require('./api');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api/file', express.static(path.join(__dirname, 'config/upload')));
app.use( expressValidator() );

databaseConfig();
api.register(app);
console.log(listEndpoints(app));
const server = http.createServer(app);
server.listen(config.port, () => {
  console.log(`App running port: ${config.port}, to environment: ${process.env.NODE_ENV}`);
});

module.exports = app;