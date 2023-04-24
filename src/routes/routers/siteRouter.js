
const express = require('express')
const router = express.Router()

const SiteController = require('../../app/controllers/siteController')
const AuthMiddleware = require('../../app/middlewares/authMiddleware')

// Site
router.get('/', SiteController.home)
router.get('/about', SiteController.about)
router.get('/menu', SiteController.menu)
router.get('/contact', SiteController.contact)

// Order
router.post('/cart', AuthMiddleware.isAuth, SiteController.cart)
router.post('/order', SiteController.order)

module.exports = router