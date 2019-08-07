const Comments = require('./comment.collection');

exports.create = async (params) => {
  const newComment = new Comments(params);
  return await newComment.save();
};

exports.listAll = async () => {
  return Comments
    .find()
    .sort('createdAt')
    .exec();
};
