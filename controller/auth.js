const User = require('../models/user');
const Joi = require('joi');
const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

module.exports.postregister = async (req, res) => {
    const { name, email, password, department, number } = req.body

    const userSchema = Joi.object({
        name: Joi.string().required(),
        number: Joi.number().min(10).max(10).required(),
        address: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(5).required(),
        designation: Joi.string().required(),

    })
    try {

        userSchema.validateAsync(req.body)
        User.findOne({ email: email })
            .then((savedUser) => {
                if (savedUser) {
                    return res.status(422).json({ error: "User already exists with that email" })
                }
                bcrypt.hash(password, 15)
                    .then((hashedpw) => {
                        const user = new User({
                            name,
                            email,
                            password: hashedpw,
                            department,
                            number,
                            designation
                        })
                        user.save()
                            .then((user) => {

                                return res.status(200).json({ message: "User created Succesfully" })

                            })
                            .catch((err) => {
                                console.log(err)
                            })

                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
    }
    catch (error) {
        if (error) {
            const msg = error.details.map(el => el.message).join(',')
            res.status(422).json({ error: msg })
            console.log(error)
        }
    }

}

module.exports.postlogin = async (req, res) => {

    const { email, password } = req.body
    const userSchema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()

    })
    try {
        userSchema.validateAsync(req.body)
        User.findOne({ email: email })
            .then((savedUser) => {
                if (!savedUser) {
                    return res.status(422).json({ error: "User doesnot exist with that email" })
                }
                bcrypt.compare(password, savedUser.password)
                    .then(match => {
                        if (!match) {
                            return res.status(400).json({ error: "Invalid email or passowrd" })

                        }
                        const token = jwt.sign({ id: savedUser._id }, JWT_SECRET)
                        const { _id, name } = savedUser
                        return res.status(200).json({ token, user: { _id, name }, message: "Loggen In Succesfully" })
                    })

            })
            .catch((err) => {
                console.log(err)
            })
    }
    catch (err) {
        if (error) {
            const msg = error.details.map(el => el.message).join(',')
            res.status(422).json({ error: msg })
            console.log(error)
        }
    }

}