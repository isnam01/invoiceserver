const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartInvSchema = new Schema({
    depart: {
        type: String
    },
    num: {
        type: Number
    }
})

module.exports = mongoose.model('Department', DepartInvSchema);
