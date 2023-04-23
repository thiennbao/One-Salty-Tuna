
const mongooseUtil = require('../../util/mongooseUtil')
const handlebarsUtil = require('../../util/handlebarsUtil')

const Dish = require('../../database/model/dish')

class SiteController {

    // Home
    async home(req, res) {
        const dishes  = await Dish.find()
        res.render('home', {
            page: 'home',
            dishes: mongooseUtil.getRandom(dishes, 8),
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
        if (!Object.keys(req.query).length) {
            // Menu page
            const dishes = await Dish.find()
            res.render('menu', {
                page: 'menu',
                dishes: mongooseUtil.getData(dishes),
                phone: handlebarsUtil.getPhone(req)
            })
        } else {
            // Menu searching
            var dishes
            if (req.query.cost) {
                dishes = await Dish.find().or([{name: RegExp(req.query.key, 'i')}, {description: RegExp(req.query.key, 'i')}, ]).where('cost').lte(req.query.cost)
            } else {
                dishes = await Dish.find().or([{name: RegExp(req.query.key, 'i')}, {description: RegExp(req.query.key, 'i')}, ])
            }
            res.send(dishes)
        }
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