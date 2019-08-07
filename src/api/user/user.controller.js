const _ = require('lodash');
const unless = require('express-unless');
const config = require("../../config/environment");
const userService = require('./user.service');
const Constants = require("../../common/constants/consts").Constants;
const jwt = require('jsonwebtoken');



exports.detailById = (req, res) => {
  req.checkParams('id')
    .notEmpty().withMessage('User id is required.')
    .isMongoId().withMessage('User id invalid.');
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({error: errors, message: Object.values(errors)[0].msg})
  }

  userService.detailById(req.params.id)
    .then(user => {
      return res.json({user})
    })
    .catch(error => {
      return res.status(400).json({error})
    })
};

exports.order = (req, res) => {
  req.checkBody('itemId')
    .notEmpty()
    .withMessage('Product is require')
    .isMongoId()
    .withMessage('Product id invalid.');
  req.checkBody('itemNumber')
    .notEmpty()
    .withMessage('The number of item is require')
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({error: errors, message: Object.values(errors)[0].msg})
  }
  
  userService.addProduct(req.user._id, { orders: { product: req.body.itemId, numOfItem: req.body.itemNumber} })
  .then(user => {
    return res.status(200).json({user})
  })
  .catch(error => {
    return res.status(400).json({error})
  })
}

exports.loginRequired = function(options) {
  const roleAccept = options['role'] || [Constants.ROLES.CLIENT];
  if (!options || !options.secret) throw new Error('secret should be set');
  const middleware = function(req, res, next) {
    if (req.user) {
      userService.detailById(req.user._id).then((user)=> {
        if( roleAccept.indexOf(user.role)  > -1) {
          next()
        } else {
          res.status(401).json({ message: 'Unauthorized user!' })
        }
      }).catch((err) => res.status(404).json({ message: 'User not exist' }))
    } else {
      return res.status(401).json({ message: 'Unauthorized user!' });
    }
  }
  middleware.unless = unless;
  return middleware;
}
exports.createRootAdmin = function() {
  userService.createRoot({...config.rootAdmin, role: 'super admin', name: 'The Root Admin'});
}

exports.listAll = (req, res) => {
    userService.list()
      .then(users => {
        return res.json({users})
      })
      .catch(error => {
        return res.status(400).json({error})
      })
  };


exports.verifyUser = function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    jwt.verify(req.headers.authorization.split(' ')[1], `${config.jwtSecret}`, function(err, decode) {
      if (err) {
        req.user = undefined;
      } else {
        req.user = decode;
      }
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
}