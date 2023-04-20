const express = require('express')
const router = express.Router()

const SiteController = require('../../app/controllers/siteController')

// Site
router.get('/', SiteController.home)
router.get('/about', SiteController.about)
router.get('/menu', SiteController.menu)
router.get('/contact', SiteController.contact)

module.exports = router