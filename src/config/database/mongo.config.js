'use strict';
const signale = require('signale');
const mongoose = require('mongoose');
const config = require('../environment');

function connectDB() {
  let isConnectedBefore = false;
  const uri = `mongodb://${config.mongodb.server_config.host}:`
    + `${config.mongodb.server_config.port}/${config.mongodb.dbName}`;
  const connectionOptions = {
    useNewUrlParser: true,
    // https://mongoosejs.com/docs/deprecations.html
    useFindAndModify: false,
    useCreateIndex: true
  };
//   if (['development', 'production'].indexOf(process.env.NODE_ENV) !== -1) {
//     connectionOptions.user = config.mongodb.server_config.username;
//     connectionOptions.pass = config.mongodb.server_config.password;
//   }
  connect();

  function connect() {
    if (isConnectedBefore) {
      signale.await('Db reconnecting...');
    }
    mongoose.connect(uri, connectionOptions);
  }

  mongoose.connection.on('connected', function () {
    isConnectedBefore = true;
    signale.success(`[Mongodb] "${config.mongodb.dbName}" has connected successfully!`);
  });
  mongoose.connection.on('error', function (err) {
    signale.error('Could not connect to Mongodb: ', err);
  });
  mongoose.connection.on('disconnected', function () {
    signale.error('Db has lost connection...');
    if (!isConnectedBefore) {
      setTimeout(connect, 5000);
    }
  });
}

module.exports = connectDB;