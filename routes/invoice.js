const express = require('express');
const router = express.Router();
const invoice = require('../controller/invoice');
const { authenticateLogin } = require('../middleware/authenticateLogin');
const { isAuthor } = require('../middleware/isAuthor');


router.route('/invoice')
    .post(authenticateLogin, invoice.postinvoice)
    .get(authenticateLogin, invoice.getinvoice)
    .delete(authenticateLogin, isAuthor, invoice.delinvoice)
    .put(authenticateLogin, isAuthor, invoice.editinvoice)


module.exports = router;