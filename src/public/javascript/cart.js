
Validator({
    formSelector: '#order-form',
    msgSelector: '.form-msg',
    rules: [
        Validator.isRequired('#name'),
        Validator.isText('#name'),
        Validator.isRequired('#phone'),
        Validator.isNumber('#phone'),
        Validator.minLength('#phone', 7, 'Invalid phone number'),
        Validator.maxLength('#phone', 12, 'Invalid phone number'),
        Validator.isRequired('#address'),

        Validator.isRequired('#cardnumber'),
        Validator.isNumber('#cardnumber'),
        Validator.isRequired('#exp'),
        Validator.isRequired('#ccv'),
        Validator.isNumber('#ccv'),
        Validator.isRequired('#cardname'),
        Validator.isText('#cardname'),
        Validator.isRequired('#billingaddr'),
        Validator.isRequired('#postalcode'),
        Validator.isNumber('#postalcode'),
    ]
})

// Show card form
const cardForm = $('#card-form')
const cardInputs = $('#card-form input')

var paymentMethod
cardForm.hide()
cardInputs.attr('disabled', 'true')

$('input[name="payment"]').click(() => {
    paymentMethod = $('input[name="payment"]:checked').val()
    if (paymentMethod == 'card') {
        cardForm.show()
        cardInputs.removeAttr('disabled')
    } else {
        cardForm.hide()
        cardInputs.attr('disabled', 'true')
    }

})

// Cart table
const cartJSON = $('#content').val()
const cart = JSON.parse(cartJSON)
const table = $('#cart-table tbody')
table.html('')
var total = 0
cart.forEach((item, index) => {
    table.append(`<tr class="row"><td class="col l-1 m-1 s-1">${index+1}</td><td class="col l-5 m-5 s-5">${item.name}</td><td class="col l-2 m-2 s-2">${item.price}$</td><td class="col l-2 m-2 s-2">${item.quantity}</td><td class="col l-2 m-2 s-2">${(item.price*item.quantity).toFixed(1)}$</td></tr>`)
    total += item.price * item.quantity
})
$('#cart-table tfoot tr td span').text(`${total.toFixed(1)} $`)