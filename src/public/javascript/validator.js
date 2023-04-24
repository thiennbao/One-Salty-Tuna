
// Validator object
function Validator(option) {

    var inputRules = {}

    // Get form element
    var formElm = $(option.formSelector)
    if (formElm) {

        // Loop through all rules
        option.rules.forEach((rule) => {

            // Save multi rules for each input
            if (inputRules[rule.selector]) {
                inputRules[rule.selector].push(rule.test)
            } else {
                inputRules[rule.selector] = [rule.test]
            }
        })

        // Loop through all inputs and set event
        Object.keys(inputRules).forEach((selector) => {
            var inputElm = $(selector)

            // Blur event
            inputElm.blur(() => {
                var value = inputElm.val()
                var errMsg

                // Validate all rules of the input
                for (let i=0; i<inputRules[selector].length; i++) {
                    errMsg = inputRules[selector][i](value)
                    if (errMsg) {
                        break
                    }
                }
                // Display message if invalid
                var msgElm = $(selector + '+' + option.msgSelector)
                if (errMsg) {
                    msgElm.text(errMsg)
                    inputElm.removeClass('valid')
                    inputElm.addClass('invalid')
                } else {
                    msgElm.text('')
                    inputElm.removeClass('invalid')
                    inputElm.addClass('valid')
                }
            })

            // Input event
            inputElm.on('input', () => {
                var msgElm = $(selector + '+' + option.msgSelector)
                msgElm.text('')
                inputElm.removeClass('invalid')
            })
        })

        // Submit form
        formElm.submit((event) => {
            // Validate all input
            var isAllValid = true
            Object.keys(inputRules).forEach((selector) => {
                var inputElm = $(selector)
                if (inputElm.length) {
                    var value = inputElm.val()
                    var errMsg

                    // Validate all rules of the input
                    for (let i=0; i<inputRules[selector].length; i++) {
                        errMsg = inputRules[selector][i](value)
                        if (errMsg) {
                            break
                        }
                    }

                    // Display message if invalid
                    var msgElm = $(selector + '+' + option.msgSelector)
                    if (errMsg && !$(selector).attr("disabled")) {
                        isAllValid = false
                        msgElm.text(errMsg)
                        inputElm.addClass('invalid')
                    }
                }
            })

            // Prevent submit if invalid
            if (!isAllValid) {
                event.preventDefault()
            }
        })
    }
}

// Rules

Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : message || 'Please fill out this field'
        }
    }
}

Validator.minLength = function(selector, min, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : message || `Please enter at least ${min} characters`
        }
    }
}

Validator.maxLength = function(selector, max, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.length <= max ? undefined : message || `Please enter at most ${max} characters`
        }
    }
}

Validator.isText = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var pattern = /[^a-zA-Z0-9 ]/
            return !pattern.test(value) ? undefined : message || 'Only characters a-z, A-Z and number 0-9 are allowed'
        }
    }
}

Validator.isNumber = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var pattern = /[^0-9]/
            return !pattern.test(value) ? undefined : message || 'Characters are not allowed'
        }
    }
}

Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return pattern.test(value) ? undefined : message || 'Invalid email'
        }
    }
}

Validator.isMatched = function(selector, confirmSelector, message) {
    return {
        selector: selector,
        test: function(value) {
            var confirmValue = $(confirmSelector).val()
            return value == confirmValue ? undefined : message || 'Not matched'
        }
    }
}