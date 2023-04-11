const mongooseUtil = require('../../util/mongoose')

const Dish = require('../../database/model/dish')

class siteController {
    // Home
    home(req, res) {
        Dish.find({})
        .then( dish => {
            res.render('home', {
                page: 'home',
                dish: mongooseUtil.getData(dish)
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    // About
    about(req, res) {
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
}

module.exports = new siteController