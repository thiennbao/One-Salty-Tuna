

class authController {
    // Login
    login(req, res) {
        res.render('login', {
            page: 'login'
        })
    }
}

module.exports = new authController