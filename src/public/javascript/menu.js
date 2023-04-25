
const dishesElm = $('#dishes > div > div')

// Menu searching
$('#searchBtn').click(() => {
    const key = RegExp($('#key').val(), 'i')
    const price = $('#price').val()

    dishesElm.parent().show()
    dishesElm.each((index, dish) => {
        if (!key.test($(dish).children('.dish-name').text()) && !key.test($(dish).children('.describe').text())) {
            $(dish).parent().hide()
        }
        if (price && Number($(dish).children('.price').text().replace('$', '')) > price) {
            $(dish).parent().hide()
        }
    })

})
$('#clearBtn').click(() => {
    dishesElm.parent().show()
})

// Cart table
class Dish {
    constructor (name, price, quantity) {
        this.name = name,
        this.price = price,
        this.quantity = quantity
    }
}
const dishes = []
const cart = []

dishesElm.each((index, dish) => {
    // Get dish info
    dishes[index] = new Dish(dish.children[1].innerText, Number(dish.children[3].innerText.replace('$', '')), 0)

    // Add button function
    dish.children[4].children[0].onclick = function() {
        if (dishes[index].quantity != 0) {
            dishes[index].quantity--
            // Remove from cart
            if (dishes[index].quantity == 0) {
                cart.forEach( (item, i) => {
                    if (item.name == dishes[index].name) {
                        cart.splice(i, 1);
                    }
                })
            }
        }
        dish.children[4].children[1].innerText = dishes[index].quantity
        printTable()
    }
    dish.children[4].children[2].onclick = function() {
        dishes[index].quantity++
        // Add to cart
        if (dishes[index].quantity == 1) {
            cart.push(dishes[index])
        }
        dish.children[4].children[1].innerText = dishes[index].quantity
        printTable()
    }
})

function printTable() {
    const table = $('#cart-table tbody')
    table.html('')
    var total = 0
    cart.forEach( (item, index) => {
        table.append(`<tr class="row"><td class="col l-1 m-1 s-1">${index+1}</td><td class="col l-5 m-5 s-5">${item.name}</td><td class="col l-2 m-2 s-2">${item.price}$</td><td class="col l-2 m-2 s-2">${item.quantity}</td><td class="col l-2 m-2 s-2">${(item.price*item.quantity).toFixed(1)}$</td></tr>`)
        total += item.price * item.quantity
    })
    $('#cart-table tfoot tr td span').text(`${total.toFixed(1)} $`)
}

// Order submit
$('#order-form').submit((event) => {
    const cart = []
    var cartItem = $('#cart-table tbody tr')
    cartItem.each((index, item) => {
        cart.push({
            name: $(item.children[1]).text(),
            quantity: Number($(item.children[3]).text())
        })
    })
    const cartJSON = JSON.stringify(cart)
    $('#cart-content').val(cartJSON)

    if (cart.length == 0) {
        event.preventDefault()
    }
})