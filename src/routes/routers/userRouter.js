
const express = require('express')
const router = express.Router()

const UserController = require('../../app/controllers/userController')

// User page
router.get('/:user', UserController.user)

module.exports = router