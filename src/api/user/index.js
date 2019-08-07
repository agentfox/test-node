const router = require('express').Router();
const userCtrl = require('./user.controller');

router.get('/', userCtrl.listAll);
router.get('/:id', userCtrl.detailById);

module.exports = router;