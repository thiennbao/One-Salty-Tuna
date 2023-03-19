

class siteController {
    // Home
    home(req, res) {
        res.render('home', {
            page: "home"
        })
    }

    // About
    about(req, res) {
        res.render('about', {
            page: 'about'
        })
    }
}

module.exports = new siteController