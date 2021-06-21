
const User = require('../models/user');
const Invoice = require('../controller/invoice');

module.exports.isAuthor = async (req, res, next) => {
    const invoice = await Invoice.findOne({ _id: req.body.id })
    const user = awaitUser.findOne({ _id: req.user })
    if (invoice.createdBy === req.user || user.designation === "Admin") {
        next()
    }
    else {
        res.status(401).json("You are not authorized")
    }
}
