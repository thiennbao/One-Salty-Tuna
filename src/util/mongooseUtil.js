const { query } = require("express")
const dish = require("../database/model/dish")

var mongooseUtil = {

    getData(data) {
        return data.map(data => data.toObject())
    },

    getRandom(data, size) {
        data = data.map(data => data.toObject())
        const ranData = []
        var ranIndex
        for (let i=0; i<8; i++) {
            ranIndex = Math.floor(Math.random() * data.length)
            ranData.push(data[ranIndex])
            data.splice(ranIndex, 1)
        }
        return ranData
    }
}

module.exports = mongooseUtil