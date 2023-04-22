const jwt = require('jsonwebtoken')
const cookie = require('cookie')

const User = require('../../database/model/user')

class AuthMiddleware {

    // Check if logged in
    async checkLoggedin(req, res, next) {
        try {
            const cookies = cookie.parse(req.headers.cookie || '')
            const token = cookies.token
            const data = jwt.verify(token, process.env.JWTKEY)
            const user = await User.findOne({phone: data.phone})
            switch (user.role) {
                case 'user':
                    res.redirect('/')
                    break
            }

        } catch (err) {
            // Next if there is no valid token
            next()
        }
    }

    async checkUser(req, res, next) {
        try {
            const user = req.params.user
            const cookies = cookie.parse(req.headers.cookie || '')
            const token = cookies.token
            const data = jwt.verify(token, process.env.JWTKEY)
            if (data.phone == user) {
                next()
            } else {
                res.send('403')
            }
        } catch (err) {
            res.redirect('/auth/login')
        }
    }
}

module.exports = new AuthMiddleware