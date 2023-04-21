const catalogItem = $('#catalog > div')
const formItem = $('#form-container > div')
formItem.hide()
$(formItem[0]).show()

catalogItem.each((index, item) => {
    $(item).click(() => {
        
        $('#catalog > div.current').removeClass('current')
        $(item).addClass('current')

        formItem.hide()
        $(formItem[index]).show()
    })
})