const express = require('express');

const router = express.Router();
const controller = require('../controllers');

console.log(controller, 'controllers');
router.get('/auth/login', controller.authentication.get);
router.get('/auth/callback', controller.authenticationCallback.get);
router.get('/auth/token', controller.getToken.get);

module.exports = router;
