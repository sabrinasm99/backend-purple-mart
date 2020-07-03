const router = require('express').Router();
const controller = require('../controller/user.controller');

router.post('/register-admin', controller.registerAdmin);
router.post('/login-admin', controller.loginAdmin);
router.post('/register-member', controller.registerMember);
router.post('/login-member', controller.loginMember);
router.post('/check-token', controller.checkToken);

module.exports = router;