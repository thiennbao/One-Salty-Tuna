
var mongooseUtil = {

    async getData(Model) {
        var data = await Model.find()
        return data.map(data => data.toObject())
    },

    async getRandom(Model, size) {
        var data = await Model.find()
        data = data.map(data => data.toObject())
        const ranData = []
        var ranIndex
        for (let i=0; i<8; i++) {
            ranIndex = Math.floor(Math.random() * data.length)
            ranData.push(data[ranIndex])
            data.splice(ranIndex, 1)
        }
        return ranData
    },

    async getOrderContent(DishModel, contentJSON) {
        const content = JSON.parse(contentJSON)

        const filter = []
        content.forEach((item) => {
            filter.push({name: item.name})
        })
        const dishes = await DishModel.find().or(filter)

        content.forEach((item) => {
            dishes.forEach((dish) => {
                if (item.name == dish.name) {
                    item['price'] = dish.price
                }
            })
        })

        return JSON.stringify(content)
    }
}

module.exports = mongooseUtil