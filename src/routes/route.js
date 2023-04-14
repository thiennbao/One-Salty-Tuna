const siteRouter = require('./routers/siteRouter')
const authRouter = require('./routers/authRouter')

function route(app) {
    app.use('/', siteRouter)
    app.use('/auth', authRouter)
}

module.exports = route