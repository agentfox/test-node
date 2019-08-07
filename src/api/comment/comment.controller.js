const _ = require('lodash');
const CommentService = require('./comment.service');
const ProductService = require('../product/product.service');

exports.create = (req, res) => {
  req.checkBody('content', 'Comment content is required.').notEmpty();
  req.checkParams('id', 'Product id is required')
    .notEmpty()
    .isMongoId()
    .withMessage('Product id invalid.');
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({error: errors, message: Object.values(errors)[0].msg})
  }

  const body = { content : req.body.content, product : req.params.id, user : req.user._id  };
  CommentService.create(body)
    .then(comment => {
      ProductService.addNewComment(req.params.id, comment._id);
      return res.json({comment})
    })
    .catch(error => {
      return res.status(400).json({error})
    })
};

// exports.listAll = (req, res) => {
//     CommentService.list({})
//       .then(products => {
//         const data = _.pick(products, ['_id','name', 'price', 'color','size','Rating']);
//         return res.json({products: data})
//       })
//       .catch(error => {
//         return res.status(400).json({error})
//       })
// };