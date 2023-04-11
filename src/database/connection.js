const mongoose = require('mongoose')

function connect() {
    mongoose.set('strictQuery', true);
    mongoose
    .connect('mongodb+srv://thiennbao204:' + process.env.DBPASSWORD + '@onesaltytuna.90eqbjk.mongodb.net/onesaltytuna?retryWrites=true&w=majority')
    .catch(error => {
        console.log(error);
    })
}

module.exports = {connect}