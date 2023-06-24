
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../../database/model/user')

class AuthController {
    
    // Login
    login(req, res) {
        res.render('login', {
            page: 'login'
        })
    }

    async loginForm(req, res) {
        const user = await User.findOne({phone: req.body.phone})
        if (user && user.pass) {
            const match = await bcrypt.compare(req.body.pass, user.pass)
            if (match) {
                const token = jwt.sign({
                    phone: user.phone
                }, process.env.JWTKEY, {
                    expiresIn: '6h'
                })
                res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: 'strict'
                })
                res.redirect('/')
            } else {
                res.render('login', {
                    page: 'login',
                    warning: 2, // Wrong password
                    loginPhone: req.body.phone
                })
            }
        } else {
            res.render('login', {
                page: 'login',
                warning: 1, // Account does not exist
                loginPhone: req.body.phone
            })
        }
    }

    // Sign up
    signup(req, res) {
        res.render('signup', {
            page: 'signup',
            step: 1
        })
    }

    async signupForm(req, res) {

        switch (req.query.step) {
            case '1':
                // Phone number
                var user = await User.findOne({phone: req.body.phone})
                if (user && user.pass && user.name) {
                    res.render('signup', {
                        page: 'signup',
                        step: 1,
                        warning: 1, // Not available
                        signupPhone: req.body.phone
                })
                } else {
                    if (!user) {
                        User.create({
                            phone: req.body.phone,
                            role: 'user'
                        })
                    }
                    res.render('signup', {
                        page: 'signup',
                        step: 2,
                        signupPhone: req.body.phone
                    })
                }
                break
            case '2':
                // Password
                user = await User.findOne({phone: req.body.phone})
                if (user && user.pass && user.name) {
                    res.redirect('siginup')
                } else {
                    bcrypt.hash(req.body.pass, 10, (err, hash) => {
                        User.findOneAndUpdate({phone: req.body.phone}, {
                            pass: hash
                        })
                        .then( () => {
                            res.render('signup', {
                                page: 'signup',
                                step: 3,
                                signupPhone: req.body.phone
                            })
                        })
                    })
                }
                break
            case '3':
                // Information
                user = await User.findOne({phone: req.body.phone})
                if (user && user.pass && user.name) {
                    res.redirect('signup')
                } else {
                    User.findOneAndUpdate({phone: req.body.phone}, {
                        name: req.body.name,
                        dob: req.body.dob,
                    })
                    .then( () => {
                        res.redirect('login')
                    })
                }
                break
        }
    }

    logout(req, res) {
        res.clearCookie('token')
        res.redirect('/')
    }
}

module.exports = new AuthController