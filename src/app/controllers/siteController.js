

class siteController {
    // Home
    home(req, res) {
        res.render('home', {
            page: "home"
        })
    }
}

module.exports = new siteController