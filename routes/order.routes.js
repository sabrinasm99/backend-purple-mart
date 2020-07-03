const router = require('express').Router();
const controller = require('../controller/order.controller');
const checkLogin = require('../utils/checkLogin');

router.get('/get-order', controller.getOrderProduct);
router.post('/add-order', checkLogin(), controller.addOrderProduct);

module.exports = router;