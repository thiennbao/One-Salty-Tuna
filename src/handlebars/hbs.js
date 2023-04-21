const exphbs = require('express-handlebars')
const path = require('path')

const hbs = exphbs.create({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, '../resources/views/layouts'),
    partialsDir: path.join(__dirname, '../resources/views/partials'),

    helpers: {
        match: function(variable, value, option) {
            if (variable == value) {
                return option.fn(this)
            }
        }
    }
})

module.exports = hbs