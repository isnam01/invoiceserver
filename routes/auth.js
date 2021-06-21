const express = require('express');
const router = express.Router();
const users = require('../controller/auth');
const { authenticateLogin } = require('../middleware/authenticateLogin');
const { isAdmin } = require('../middleware/isAdmin')
// const { isLoggedIn } = require('../middleware')
// const { isAdmin } = require('../middleware')

router.route('/signin')
    .post(users.postlogin)


router.route('/signup')
    .post(authenticateLogin, isAdmin, users.postregister)


module.exports = router;