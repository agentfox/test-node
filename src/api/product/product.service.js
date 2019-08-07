const Products = require('./product.collection');

exports.create = async (params) => {
  console.log(params)
  const newProduct = new Products(params);
  const savedProduct = await newProduct.save();
  console.log(savedProduct)
  const temp = await Products.findOne({name: params.name}).populate('admin', '-password -orders -store').exec();
  return temp;
};

exports.detailById = async (id) => {
  return Products
    .findById(id)
    .populate('admin', '-password -orders -store')
    .populate('comments')
    .exec()
};

exports.addNewComment = async (pid ,comments) => {
  console.log(pid,'dkdjdjk', comments)
  Products.findByIdAndUpdate(pid, {$push: { comments }}, {new: true}).exec();
}

exports.findAndUpdateRate = async (body) => { console.log(body)
    return Products
    .findByIdAndUpdate(body.id, {$push: { rates: { level: parseInt(body.rate, 10), rater: body.user_id }}}, {new: true})
    .exec()
}

exports.findAndUpdateInfo = async (id, body) => {
    return Products
    .findByIdAndUpdate(id, 
      {$set: body}, {new: true} )
    .populate('admin', '-password -orders -store')
    .populate('comments')
    .exec()
}

exports.detailByCondition = async (condition) => {
  return Products
    .findOne(condition)
    .exec();
};

exports.list = async (condition) => {
  return Products
    .find(condition)
    .select('-rates')
    .populate('admin', '-password -orders -store')
    .populate('comments')
    .exec();
};

exports.deleteById = async (_id) => {
  return Products.deleteOne({_id}).exec();
}