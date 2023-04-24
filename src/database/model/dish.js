const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Dish = Schema({
    type: {type: String},
    name: {type: String},
    price: {type: Number},
    description: {type: String},
    image: {type: String}
})

module.exports = mongoose.model('Dish', Dish);