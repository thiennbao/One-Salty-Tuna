
Validator({
    formSelector: '#signup-form',
    msgSelector: '.form-msg',
    rules: [
        Validator.isRequired('#phone'),
        Validator.isNumber('#phone'),
        Validator.minLength('#phone', 7, 'Invalid phone number'),
        Validator.maxLength('#phone', 12, 'Invalid phone number'),

        Validator.isRequired('#pass'),
        Validator.minLength('#pass', 8),
        Validator.isRequired('#cfpass'),
        Validator.isMatched('#cfpass', '#pass'),

        Validator.isRequired('#name'),
        Validator.isText('#name'),
        Validator.isRequired('#dob'),
        Validator.isRequired('#email'),
        Validator.isEmail('#email'),
    ]
})