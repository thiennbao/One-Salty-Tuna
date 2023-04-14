const mongooseUtil = require('../../util/mongoose')

const Dish = require('../../database/model/dish')

class siteController {
    // Home
    async home(req, res) {
        const dish = await Dish.find({}).skip( Math.random() * (await Dish.count({}) - 8) ).limit(8)
        res.render('home', {
            page: 'home',
            dish: mongooseUtil.getData(dish)
        })
    }

    // About
    async about(req, res) {
        res.render('about', {
            page: 'about'
        })
    }

    // Menu
    async menu(req, res) {
        const dish = await Dish.find({})
        res.render('menu', {
            page: 'menu',
            dish: mongooseUtil.getData(dish)
        })
    }

    // Contact
    async contact(req, res) {
        res.render('contact', {
            page: 'contact'
        })
    }
}

module.exports = new siteController