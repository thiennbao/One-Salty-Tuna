
const mongooseUtil = require('../../util/mongooseUtil')
const handlebarsUtil = require('../../util/handlebarsUtil')

const Dish = require('../../database/model/dish')
const News = require('../../database/model/news')
const User = require('../../database/model/user')
const Order = require('../../database/model/order')

class SiteController {

    // Home
    async home(req, res) {
        res.render('home', {
            page: 'home',
            dishes: await mongooseUtil.getRandom(Dish, 8),
            news: await mongooseUtil.getLatest(News, 4),
            phone: handlebarsUtil.getPhone(req)
        })
    }
    
    // About
    async about(req, res) {
        res.render('about', {
            page: 'about',
            counter: {
                staff: await User.find({role: 'staff'}).count(),
                dish: await Dish.count(),
                user: await User.find({role: 'user'}).count()
            },
            phone: handlebarsUtil.getPhone(req)
        })
    }

    // Menu
    async menu(req, res) {
        res.render('menu', {
            page: 'menu',
            dishes: await mongooseUtil.getData(Dish),
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

    // Cart
    async cart(req, res) {
        const user = await User.findOne({phone: handlebarsUtil.getPhone(req)})
        res.render('cart', {
            page: 'cart',
            phone: user.phone,
            info: {
                name: user.name,
                address: user.address,
                card: user.card
            },

            cart: await mongooseUtil.getOrderContent(Dish, req.body.cart)
        })
    }

    // Order
    async order(req, res) {
        await Order.create({
            phone: handlebarsUtil.getPhone(req),

            contact: req.body.contact,
            name: req.body.name,
            address: req.body.address,
            message: req.body.message,
        
            payment: req.body.payment,
            card: req.body.payment == 'card' ? {
                cardnumber: req.body.cardnumber,
                exp: req.body.exp,
                ccv: req.body.ccv,
                cardname: req.body.cardname,
                billingaddr: req.body.billingaddr,
                postalcode: req.body.postalcode
            } : undefined,
        
            content: await mongooseUtil.getOrderContent(Dish, req.body.content)
        })

        res.redirect('menu')
    }

}

module.exports = new SiteController