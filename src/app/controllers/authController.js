
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../../database/model/user')

class authController {
    // Login
    login(req, res) {
        res.render('login', {
            page: 'login'
        })
    }

    async loginForm(req, res) {
        const user = await User.findOne({username: req.body.username})
        if (user) {
            const match = await bcrypt.compare(req.body.password, user.password)
            if (match) {
                const token = jwt.sign({
                    _id: user._id
                }, process.env.JWTKEY, {
                    expiresIn: '6h'
                })
                res.cookie('user', user.username)
                res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: 'strict'
                })
                res.redirect('/')
            } else {
                res.render('login', {
                    page: 'login',
                    warning: 2, // Wrong password
                    info: req.body
                })
            }
        } else {
            res.render('login', {
                page: 'login',
                warning: 0, // Not exist
                info: req.body
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
                        warning: 1 // Not available
                    })
                } else {
                    if (!user) {
                        User.create({
                            phone: req.body.phone
                        })
                    }
                    res.render('signup', {
                        page: 'signup',
                        step: 2,
                        phone: req.body.phone
                    })
                }
                break
            case '2':
                // Password
                user = await User.findOne({phone: req.body.phone})
                if (user && user.pass && user.name) {
                    res.redirect('siginup')
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        User.findOneAndUpdate({phone: req.body.phone}, {
                            pass: hash
                        })
                        .then( () => {
                            res.render('signup', {
                                page: 'signup',
                                step: 3,
                                phone: req.body.phone
                            })
                        })
                    })
                }
                break
            case '3':
                // Information
                user = await User.findOne({phone: req.body.phone})
                if (user && user.pass && user.name) {
                    res.redirect('siginup')
                } else {
                    User.findOneAndUpdate({phone: req.body.phone}, {
                        name: req.body.name,
                        dob: req.body.dob,
                        email: req.body.email
                    })
                    .then( () => {
                        res.redirect('login')
                    })
                }
                break
        }
    }
}

module.exports = new authController