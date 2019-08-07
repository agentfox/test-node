const _ = require('lodash');
const ProductService = require('./product.service');
const UserService = require('../user/user.service');

exports.create = (req, res) => {
  req.checkBody('name', 'Product name is required.').notEmpty();
  req.checkBody('price', 'Price is required.').notEmpty();
  req.checkBody('size', 'Size is required.').notEmpty();
  req.checkBody('color', 'Color is required.').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({error: errors, message: Object.values(errors)[0].msg})
  }

  const body = _.pick(req.body, ['name', 'price', 'color','size']);
  body['admin'] = req.user._id;
  ProductService.create(body)
    .then(product => {
      UserService.addProduct(req.user._id, { store: product._id });
      return res.json({product:  _.omit(product._doc, ['rates'])})
    })
    .catch(error => {
      return res.status(400).json({error})
    })
};

exports.detailById = (req, res) => {
  req.checkParams('id')
    .notEmpty().withMessage('Product id is required.')
    .isMongoId().withMessage('Product id is invalid.');
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({error: errors, message: Object.values(errors)[0].msg})
  }

  ProductService.detailById(req.params.id)
    .then(product => {
      const data = _.pick(product, ['_id','name', 'price', 'color','size','Rating', 'admin', 'comments']);
      return res.json({product: data})
    })
    .catch(error => {
      return res.status(400).json({error})
    })
  
};

exports.updateRate = (req, res) => {
    req.checkBody('id')
      .notEmpty().withMessage('Product id is required.')
      .isMongoId().withMessage('Product id is invalid.');
    req.checkBody('rate', 'Rate is required.').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({error: errors, message: Object.values(errors)[0].msg})
    }
    const body = _.pick(req.body, ['id','rate']);
    body['user_id'] = req.user._id;
    ProductService.findAndUpdateRate(body)
      .then(product => {
        const data = _.pick(product, ['_id','name', 'price', 'color','size','Rating']);
        return res.json({product: data})
      })
      .catch(error => {
        return res.status(400).json({error})
      })
};

exports.updateInfo = async (req, res) => {
    req.checkParams('id')
      .notEmpty().withMessage('Product id is required.')
      .isMongoId().withMessage('Product id is invalid.');
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({error: errors, message: Object.values(errors)[0].msg})
    }
    let isUserValid = await UserService.verifyAuthor(req.user._id, req.params.id); // only author can update product
    if (isUserValid) {
      const body = _.pick(req.body, ['name', 'price', 'color','size']);
      if (body.price) { body.price = parseInt(body.price) }
      return ProductService.findAndUpdateInfo(req.params.id, body)
        .then(product => {
          const data = _.pick(product, ['_id','name', 'price', 'color','size','Rating', 'admin', 'comments']);
          return res.json({product: data})
        })
        .catch(error => {
          return res.status(400).json({error})
        })
    }
    return res.status(401).json({ message: 'Unauthorized user!' });
};

exports.listAll = (req, res) => {
    ProductService.list({})
      .then(products => {
        return res.json({products})
      })
      .catch(error => {
        return res.status(400).json({error})
      })
};

exports.deleteById = async (req, res) => {
  req.checkParams('id')
  .notEmpty().withMessage('Product id is required.')
  .isMongoId().withMessage('Product id is invalid.');
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({error: errors, message: Object.values(errors)[0].msg})
  }
  let isUserValid = await UserService.verifyAuthor(req.user._id, req.params.id); // only author can update product
  if(isUserValid) {
    return ProductService.deleteById(req.params.id)
    .then( (product) => {
      console.log(product,'ok')
      UserService.deleteProduct(req.user._id, { store: req.params.id })
      return res.status(200).json({message: 'Delete success'})
    })
    .catch(error => {
      return res.status(400).json({error})
    })
  }
  return res.status(401).json({ message: 'Unauthorized user!' });
}