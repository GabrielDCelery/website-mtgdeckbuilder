var express = require('express');
var router = express.Router();

var auth = require('./auth');

router.post('/auth/users', auth.users);
router.post('/auth/login', auth.login);
router.post('/auth/register', auth.register);
router.post('/auth/resetmail', auth.resetmail);
router.post('/auth/reset', auth.reset);
router.post('/auth/token', auth.token);

module.exports = router;