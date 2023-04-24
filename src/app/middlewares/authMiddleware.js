const jwt = require('jsonwebtoken')
const cookie = require('cookie')

class AuthMiddleware {

    // Check if not logged in
    async notAuth(req, res, next) {
        try {
            jwt.verify(cookie.parse(req.headers.cookie || '').token, process.env.JWTKEY)
            res.redirect('/')
        } catch (err) {
            next()
        }
    }

    // Check if logged in
    async isAuth(req, res, next) {
        try {
            jwt.verify(cookie.parse(req.headers.cookie || '').token, process.env.JWTKEY)
            next()
        } catch (err) {
            res.redirect('/auth/login')
        }
    }

    // Check if right user
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