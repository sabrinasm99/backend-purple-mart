const router = require('express').Router();
const controller = require('../controller/product.controller');
const fileUpload = require("express-fileupload");
const checkLogin = require('../utils/checkLogin');
const checkAdmin = require('../utils/checkAdmin');

router.get('/get-product', controller.getAllProduct);
router.get('/get-product/:id', controller.getSpecificProduct);
router.post('/upload-product', checkLogin(), checkAdmin(), fileUpload(), controller.uploadProduct);
router.put('/update-product/:id', checkLogin(), checkAdmin(), fileUpload(), controller.updateProduct);
router.delete('/remove-product/:id', checkLogin(), checkAdmin(), controller.removeProduct);

module.exports = router;