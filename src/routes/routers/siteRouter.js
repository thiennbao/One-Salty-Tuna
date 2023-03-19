const express = require('express')
const router = express.Router()

const siteController = require('../../app/controllers/siteController')

// Site
router.get('/', siteController.home)
router.get('/about', siteController.about)

module.exports = router