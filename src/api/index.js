const router = require('express').Router();
const {loginRequired, verifyUser, createRootAdmin } = require('./user/user.controller');
const useWithUrl = require("../auth/services/expressJwtService").useWithUrl;
const config = require("../config/environment");
// const Constant = require("../common/constants/consts").Constants;
const ignoreApis = require("../common/constants/ignore-api").ignoreApi;
const authRouter = require("../auth/localAuth");
(function() {
  createRootAdmin();
})();
exports.register = function (app) {
  app.use(verifyUser);
  app.use("/api", loginRequired({secret: config.jwtSecret, role: ['admin', 'client', 'super admin'] }).unless({
    path: [...ignoreApis.auth, ignoreApis["admin-api"] ]
  }));
  app.use("/api",useWithUrl( ignoreApis["admin-api"] ,loginRequired({secret: config.jwtSecret, role: ['admin', 'super admin'] }) ) );
  router.use('/user', require('./user'));
  router.use('/product', require('./product') );
  router.use('/auth', authRouter);
  app.use("/api", router);
};