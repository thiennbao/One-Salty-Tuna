
function usernameValidate() {
    username = $('#username').val()
    
    if (username.length < 4 || username.length > 50) {
        $('label[for="username"]').text('User name must be between 4 and 50 characters in length')
        $('#username').css('border-bottom', 'var(--main-color) solid 1px')
    } else if (username.search(/\W/g) != -1) {
        $('label[for="username"]').text('Only characters a-z, A-Z, 0-9 are allowed')
        $('#username').css('border-bottom', 'var(--main-color) solid 1px')
    } else {
        $('label[for="username"]').text('')
        $('#username').css('border-bottom', 'lightgreen solid 1px')
    }
}
