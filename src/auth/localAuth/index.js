const express = require('express');
const localCtrl = require('./local.controller');
const router = express.Router();
// const localCtrl = new LocalController();

router.post('/register', localCtrl.create);
router.post('/login', localCtrl.signIn);
router.post('/admin/register', localCtrl.createAdmin);
module.exports = router;