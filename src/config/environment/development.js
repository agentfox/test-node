const path = require('path');

module.exports = {
  host: '54.179.188.254',
  port: '8888',
  jwtSecret: 'qwertyuiop',
  rootAdmin: {
    email: 'rootad@mail.com',
    password: 'rootadmin'
  },
  mongodb: {
    server_config: {
      username: '',
      password: '',
      host: 'localhost',
      port: '27017'
    },
    dbName: 'todo-app-dev',
  },
};