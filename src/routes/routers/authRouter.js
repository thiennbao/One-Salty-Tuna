
const express = require('express')
const router = express.Router()

const AuthController = require('../../app/controllers/authController')
const AuthMiddleware = require('../../app/middlewares/authMiddleware')

// Login
router.get('/login', AuthMiddleware.checkLoggedin, AuthController.login)
router.post('/login', AuthController.loginForm)

// Sign up
router.get('/signup', AuthMiddleware.checkLoggedin, AuthController.signup)
router.post('/signup', AuthController.signupForm)

// Log out
router.get('/logout', AuthController.logout)

module.exports = router;
