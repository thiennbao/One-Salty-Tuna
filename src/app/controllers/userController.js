
const handlebarsUtil = require('../../util/handlebarsUtil')

class UserController {

    // User page
    user(req, res) {
        res.render('user', {
            page: 'user',
            phone: handlebarsUtil.getPhone(req)
        })
    }

}

module.exports = new UserController