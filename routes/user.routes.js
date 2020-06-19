const router = require('express').Router();
const controller = require('../controller/user.controller');

router.post('/register-admin', controller.registerAdmin);
router.post('/login-admin', controller.loginAdmin);

module.exports = router;