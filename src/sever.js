const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

require('dotenv').config()
const app = express()

// Static file
app.use(express.static(path.join(__dirname, 'public')))

// View engine
app.engine('hbs', exphbs.engine({extname: 'hbs'}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

// Route init
const route = require('./routes/route')
route(app)

app.listen(process.env.PORT, function() {
    console.log("Connect successfully !!!")
})