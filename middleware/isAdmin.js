
const User = require('../models/user');

module.exports.isAdmin = async (req, res, next) => {
    const user = await User.findOne({ _id: req.user })
    if (user.designation === "Admin") {
        next()
    }
    else {
        res.status(401).json("You are not authorized")
    }
}
