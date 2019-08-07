const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Constants = require("../../common/constants/consts").Constants;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  role: {
    type: String,
    enum: _.values(Constants.ROLES),
    required: true,
    default: Constants.ROLES.CLIENT
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  store: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'
  }],
  orders: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    numOfItem: Number
  }]
}, Constants.SCHEMA_OPTIONS);

UserSchema.pre('save', async function (next) {
  await bcrypt.hash(this.password, 10).then((res) => { this.password = res } );
  return next();
});

UserSchema.methods.comparePassword = function(password){
  return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);