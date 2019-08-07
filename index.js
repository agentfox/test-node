process.env.NODE_ENV = process.env.NODE_ENV || process.argv[2] || 'production';
module.exports = require('./src/app');