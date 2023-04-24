
const formItem = $('#form-container > div')
const catalogItem = $('#catalog > div')

function showForm(index) {
    $('#catalog > div.current').removeClass('current')
    $(catalogItem[index]).addClass('current')

    formItem.hide()
    $(formItem[index]).show()
}

// Set up
if ($('#pass + span').text()) {
    showForm(2)
} else {
    showForm(0)
}

// Show & hide by calatog buttons
catalogItem.each((index, item) => {
    $(item).click(() => {
        showForm(index)
    })
})

// Show and hide by prev next buttons
const prevBtn = $('.prev')
prevBtn.each((index, item) => {
    $(item).click(() => {
        showForm(index-1 < 0 ? 2 : index-1)
    })
})
const nextBtn = $('.next')
nextBtn.each((index, item) => {
    $(item).click(() => {
        showForm(index+1 > 2 ? 0 : index+1)
    })
})

Validator({
    formSelector: '#info-form',
    msgSelector: '.form-msg',
    rules: [
        Validator.isRequired('#name'),
        Validator.isText('#name'),
        Validator.isRequired('#dob'),
        Validator.isRequired('#address'),
        Validator.isRequired('#email'),
        Validator.isEmail('#email'),
    ]
})
Validator({
    formSelector: '#card-form',
    msgSelector: '.form-msg',
    rules: [
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
Validator({
    formSelector: '#pass-form',
    msgSelector: '.form-msg',
    rules: [
        Validator.isRequired('#pass'),
        Validator.isRequired('#newpass'),
        Validator.minLength('#newpass', 8),
        Validator.isRequired('#cfpass'),
        Validator.isMatched('#cfpass', '#newpass')
    ]
})