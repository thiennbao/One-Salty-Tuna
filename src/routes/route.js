const siteRouter = require('./routers/siteRouter')

function route(app) {
    app.use('/', siteRouter)
}

module.exports = route