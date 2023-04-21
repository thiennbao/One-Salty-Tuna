
const mongooseUtil = require('../../util/mongooseUtil')
const handlebarsUtil = require('../../util/handlebarsUtil')

const Dish = require('../../database/model/dish')

class SiteController {

    // Home
    async home(req, res) {

        const dish = await Dish.find({}).skip( Math.random() * (await Dish.count({}) - 8) ).limit(8)
        res.render('home', {
            page: 'home',
            dish: mongooseUtil.getData(dish),
            phone: handlebarsUtil.getPhone(req)
        })
    }

    // About
    about(req, res) {
        res.render('about', {
            page: 'about',
            phone: handlebarsUtil.getPhone(req)
        })
    }

    // Menu
    async menu(req, res) {
        const dish = await Dish.find({})
        res.render('menu', {
            page: 'menu',
            dish: mongooseUtil.getData(dish),
            phone: handlebarsUtil.getPhone(req)
        })
    }

    // Contact
    contact(req, res) {
        res.render('contact', {
            page: 'contact',
            phone: handlebarsUtil.getPhone(req)
        })
    }
}

module.exports = new SiteController