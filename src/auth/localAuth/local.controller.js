const userService = require('../../api/user/user.service');
const config = require("../../config/environment");
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const authenticate = async (body) => {
    try {
      const user = await userService.detailByCondition({email: body.email});
      if(!user) { return { error: 'Authentication failed. User not found.' } }
      if( !user.comparePassword(body.password) ) {
        return { error: 'Authentication failed. Wrong password.' }
      }
      return { token: jwt.sign({ email: user.email, name: user.name, _id: user._id, role: user.role}, `${config.jwtSecret}`) }
                    
    } catch (error) {
      return {  error: 'Authentication failed' }
    }
}
exports.authenticate = authenticate;

exports.signIn = (req, res) => {
    req.checkBody('email')
      .notEmpty().withMessage('User email is required.')
    req.checkBody('password')
    .notEmpty().withMessage('User password is required.')
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({error: errors, message: Object.values(errors)[0].msg})
    }
    authenticate(req.body).then((result) => {
      if(result.error) { return res.status(401).json({ message: result.error }) }
      return res.json(result);
    }).catch(err => console.log(err))
};

exports.create = (req, res) => {
    req.checkBody('name', 'User name is required.').notEmpty();
    req.checkBody('email', 'Email is required.').notEmpty();
    req.checkBody('password')
      .notEmpty().withMessage('Password is required.')
      .isLength({min: 8, max: 20});
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({error: errors, message: Object.values(errors)[0].msg})
    }
  
    const body = _.pick(req.body, ['name', 'password', 'address', 'email']);
    userService.create(body)
      .then(user => {
        return res.json({user:  _.omit(user._doc, ['password'])})
      })
      .catch(error => {
        console.log(error);
        return res.status(400).json({error})
      })
  };
  
exports.createAdmin = (req, res) => {
    req.checkBody('name', 'User name is required.').notEmpty();
    req.checkBody('email', 'Email is required.').notEmpty();
    req.checkBody('password')
        .notEmpty().withMessage('Password is required.')
        .isLength({min: 8, max: 20});
    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({error: errors, message: Object.values(errors)[0].msg})
    }
    if (req.user && req.user.role === 'super admin') {
        const body = _.pick(req.body, ['name', 'password', 'address', 'email']);
        body['role'] = 'admin';
        userService.create(body)
        .then(user => {
            return res.json({user:  _.omit(user._doc, ['password'])})
        })
        .catch(error => {
            console.log(error);
            return res.status(400).json({error})
        })
    } else {
        res.status(401).json({ message: 'Unauthorized user!' })
    }

};