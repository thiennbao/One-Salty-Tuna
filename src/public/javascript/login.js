function validate() {
    var user = $('#username').val()
    var pass = $('#password').val()

    console.log(0)

    if (user.length != 0 && pass.length != 0) {
        document.getElementById('submit').removeAttribute("disabled")
    } else {
        document.getElementById('submit').setAttribute("disabled", "disabled")
    }
}