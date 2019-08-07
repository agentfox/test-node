const _ = require('lodash');

const all = {};

module.exports = _.merge(
    all,
    require(`./${process.env.NODE_ENV}`)
);