const express = require('express')
const router = express.Router()

const AuthController = require('../../app/controllers/authController')

// Login
router.get('/login', AuthController.login)
router.post('/login', AuthController.loginForm)

// Sign up
router.get('/signup', AuthController.signup)
router.post('/signup', AuthController.signupForm)

module.exports = router;
