
const cookie = require('cookie')
const jwt = require('jsonwebtoken')

var handlebarsUtil = {

    getPhone(req) {
        var cookies = cookie.parse(req.headers.cookie || '')
        var token = cookies.token
        try {
            var decoded = jwt.verify(token, process.env.JWTKEY)
            return decoded.phone
        } catch (err) {
            return undefined
        }
    }
}

module.exports = handlebarsUtil