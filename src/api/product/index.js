const router = require('express').Router();
const productCtrl = require('./product.controller');
const commentCtrl = require('../comment/comment.controller');
const userCtrl = require('../user/user.controller');

router.post('/', productCtrl.create);
router.get('/', productCtrl.listAll);
router.put('/rate', productCtrl.updateRate);
router.put('/detail/:id', productCtrl.updateInfo);
router.get('/detail/:id', productCtrl.detailById);
router.delete('/detail/:id', productCtrl.deleteById);
router.post('/comment/:id', commentCtrl.create);
router.post('/order', userCtrl.order);

module.exports = router;