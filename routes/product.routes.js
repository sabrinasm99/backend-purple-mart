const router = require('express').Router();
const controller = require('../controller/product.controller');
const fileUpload = require("express-fileupload");

router.get('/get-product', controller.getAllProduct);
router.get('/get-product/:id', controller.getSpecificProduct);
router.post('/upload-product', fileUpload(), controller.uploadProduct);
router.put('/update-product/:id', fileUpload(), controller.updateProduct);
router.delete('remove-product/:id', controller.removeProduct);

module.exports = router;