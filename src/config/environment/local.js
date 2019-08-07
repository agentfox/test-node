'use strict';

/*configuration specific production*/
const path = require("path");

module.exports = {
  host: 'localhost',
  jwtSecret: 'qwertyuiop',
  port: 8888,
  rootAdmin: {
    email: 'rootad@mail.com',
    password: 'rootadmin'
  },
  mongodb: {
    server_config: {
      username: '',
      password: '',
      host: 'localhost',
      port: 27017
    },
    dbName: 'todo-app-local',
  },
};
