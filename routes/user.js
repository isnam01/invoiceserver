const express = require('express');
const router = express.Router();
const users = require('../controller/user');
const { authenticateLogin } = require('../middleware/authenticateLogin');
const { isAdmin } = require('../middleware/isAdmin')

router.route('/getusers')
    .get(users.getusers)

router.route('/getuser')
    .get(authenticateLogin, users.getuser)
    .delete(authenticateLogin, isAdmin, users.deluser)

module.exports = router;