const siteRouter = require('./routers/siteRouter')
const authRouter = require('./routers/authRouter')
const userRouter = require('./routers/userRouter')

function route(app) {
    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    app.use('/', siteRouter)
}

module.exports = route