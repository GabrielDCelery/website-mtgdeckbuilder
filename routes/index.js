var express = require('express');
var router = express.Router();

var auth = require('./auth');

router.post('/auth/doesuserexist', auth.doesUserExist);
router.post('/auth/login', auth.login);
router.post('/auth/register', auth.register);
router.post('/auth/resetmail', auth.resetMail);
router.post('/auth/reset', auth.reset);
router.post('/auth/token', auth.token);

module.exports = router;