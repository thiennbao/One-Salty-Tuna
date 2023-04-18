var mongooseUtil = {

    getData(data) {
        return data.map(data => data.toObject())
    }
}

module.exports = mongooseUtil