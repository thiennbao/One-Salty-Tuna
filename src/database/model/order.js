const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Order = Schema({
    phone: {type: String},

    contact: {type: String},
    name: {type: String},
    address: {type: String},
    message: {type: String},

    payment: {type: String},
    card: {type: Object},

    content: {type: String}
})

module.exports = mongoose.model('Order', Order)