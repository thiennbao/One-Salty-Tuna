const express = require('express')
const router = express.Router()

const authController = require('../../app/controllers/authController')

// Auth
router.get('/login', authController.login)

module.exports = router;
