const express = require('express')
const path = require('path')
const db = require('./database/connection')

require('dotenv').config()
const app = express()

// Database
db.connect();

// Static file
app.use(express.static(path.join(__dirname, 'public')))

// View engine
const hbs = require('./handlebars/hbs')
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

// Data
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Route init
const route = require('./routes/route')
route(app)

app.listen(process.env.PORT, function() {
    console.log("Connect successfully !!!")
})