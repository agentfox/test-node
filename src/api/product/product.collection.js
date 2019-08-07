const mongoose = require('mongoose');
const _ = require('lodash');
const Constants = require("../../common/constants/consts").Constants;
const UserService = require("../user/user.service");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  rates: [{
    level: { type: Number, enum: [0, 1, 2, 3, 4, 5] },
    rater: { type: Schema.Types.ObjectId, ref: 'User' }
  }]
}, Constants.SCHEMA_OPTIONS);

ProductSchema.virtual('Rating').get(function () {
    return _.meanBy(this.rates, function(o) { return parseInt(o.level, 10); });
});

module.exports = mongoose.model('Product', ProductSchema);