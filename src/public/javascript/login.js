function validate() {
    var user = $('#username').val()
    var pass = $('#password').val()

    $('label[for="username"]').text('')

    // Submit button
    if (user.length != 0 && pass.length != 0) {
        document.getElementById('submit').removeAttribute("disabled")
    } else {
        document.getElementById('submit').setAttribute("disabled", "disabled")
    }
}

function usernameValidate() {
    var user = $('#username').val()
    if (user) {
        
    }
}