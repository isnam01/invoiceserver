
const User = require('../models/user');
const Joi = require('joi');

module.exports.getuser = (req, res) => {
    User.findOne({ _id: req.user })
        .then((user) => {
            if (user) {
                return res.status(200).json(user)
            }
            else {
                return res.status(500).json({ error: "Unable to fetch" })
            }
        })
        .catch((err) => { console.log("error") })
}

module.exports.deluser = (req, res) => {
    User.findOneAndDelete({ _id: req.body.id })
        .then(() => {
            return res.status(200).json({ message: "Deleted Successfully" })
        }
        )
        .catch((err) => { console.log("error") })
}

module.exports.getusers = (req, res) => {
    User.find({})
        .then((users) => {
            console.log(users)
            if (users) {
                return res.status(200).json(users)
            }
            else {
                return res.status(500).json({ error: "Unable to fetch" })
            }
        })
        .catch((err) => { console.log("error") })
}