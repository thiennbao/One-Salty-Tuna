
const bcrypt = require('bcrypt')

const handlebarsUtil = require('../../util/handlebarsUtil')

const User = require('../../database/model/user')

class UserController {

    // User page
    async user(req, res) {
        const user = await User.findOne({phone: handlebarsUtil.getPhone(req)})
        res.render('user', {
            page: 'user',
            phone: user.phone,
            info: {
                name: user.name,
                dob: user.dob,
                email: user.email,
                card: user.card
            }
        })
    }

    // Change infomation
    changeInfo(req, res) {
        const phone = handlebarsUtil.getPhone(req)
        User.findOneAndUpdate({phone: phone}, req.body)
        .then( () => {
            res.redirect(phone)
        })
    }

    changeCard(req, res) {
        const phone = handlebarsUtil.getPhone(req)
        User.findOneAndUpdate({phone: phone}, {
            card: {
                cardnumber: req.body.cardnumber,
                exp: req.body.exp,
                ccv: req.body.ccv,
                cardname: req.body.cardname,
                billingaddr: req.body.billingaddr,
                postalcode: req.body.postalcode
            }
        })
        .then( () => {
            res.redirect(phone)
        })
    }

    async changePass(req, res) {
        const phone = handlebarsUtil.getPhone(req)

        // Check password
        const user = await User.findOne({phone: phone})
        const match = await bcrypt.compare(req.body.pass, user.pass)
        if (match) {
            // Update
            bcrypt.hash(req.body.newpass, 10, (err, hash) => {
                user.updateOne({
                    pass: hash,
                })
                .then(() => {
                    res.redirect(phone)
                })
            })
        } else {
            res.render('user', {
                page: 'user',
                phone: user.phone,
                info: {
                    name: user.name,
                    dob: user.dob,
                    email: user.email,
                    card: user.card
                },
                warning: 1
            })
        }
    }

}

module.exports = new UserController