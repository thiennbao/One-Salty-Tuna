const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const User = Schema({
    phone: {type: String},
    pass: {type: String},

    name: {type: String},
    dob: {type: String},
    address: {type: String},
    email: {type: String},
    card: {type: Object},

    cart: {type: String},

    role: {type: String}
})

module.exports = mongoose.model('User', User)