const mongoose = require('mongoose');
const _ = require('lodash');
const Constants = require("../../common/constants/consts").Constants;

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
}, Constants.SCHEMA_OPTIONS);
CommentSchema.set('timestamps', true);


module.exports = mongoose.model('Comment', CommentSchema);