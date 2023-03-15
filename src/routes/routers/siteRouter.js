const express = require('express')
const router = express.Router()

const siteController = require('../../app/controllers/siteController')

// Site
router.get('/', siteController.home)

module.exports = router