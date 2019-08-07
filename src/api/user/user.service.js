const Users = require('./user.collection');

exports.create = async (params) => {
  const newUser = new Users(params);
  return await newUser.save();
};

exports.createRoot = async (params) => {
  const admin = await Users.findOne({role: 'super admin'}).exec();
  if(admin) {
    return null
  }
  const rootAdmin = new Users(params);
  return await rootAdmin.save();
}

exports.detailById = async (id) => {
  return Users
    .findById(id)
    .exec()
};

exports.verifyAuthor = async (uid, pid) => {
  const user = await this.detailById(uid);
  return user.store.some( p => p.toString() === pid );
}
exports.deleteProduct = (uid, params) => {
  return Users
    .findByIdAndUpdate(uid, {$pull: params}, {new: true})
    .populate('orders.product')
    .select('-password')
    .exec()
}

exports.deleteOrder = (uid, params) => {
  return Users
    .findByIdAndUpdate(uid, {$pull: params}, {new: true})
    .populate('orders.product')
    .select('-password')
    .exec()
}

exports.addProduct = (uid, params) => {
  return Users
  .findByIdAndUpdate(uid, {$push: params}, {new: true})
  .populate('orders.product')
  .select('-password')
  .exec()
}


exports.findAndUpdate = async (id, params) => {
    return Users
    .findByIdAndUpdate(id, {$set: params})
    .exec()
}

exports.detailByCondition = async (condition) => {
  return Users
    .findOne(condition)
    .exec();
};

exports.list = async (condition) => {
  return Users
    .find(condition)
    .populate('orders.product')
    .select('-password')
    .exec();
};