
Validator({
    formSelector: '#login-form',
    msgSelector: '.form-msg',
    rules: [
        Validator.isRequired('#phone'),
        Validator.isNumber('#phone'),
        Validator.minLength('#phone', 7, 'Invalid phone number'),
        Validator.maxLength('#phone', 12, 'Invalid phone number'),

        Validator.isRequired('#pass'),
    ]
})