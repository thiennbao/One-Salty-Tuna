
const express = require('express')
const router = express.Router()

const UserController = require('../../app/controllers/userController')

const AuthMiddleware = require('../../app/middlewares/authMiddleware')

// User page
router.get('/:user', AuthMiddleware.checkUser, UserController.user)

// Update infomation
router.post('/changeInfo', UserController.changeInfo)
router.post('/changeCard', UserController.changeCard)
router.post('/changePass', UserController.changePass)

module.exports = router