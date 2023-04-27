
const productContent = document.querySelector(".product-content .row")
const cartContent = document.querySelector(".cart-content .container")
async function fetchProducts() {
    const res = await fetch("https://fakestoreapi.com/products/category/women's%20clothing?fbclid=IwAR2VfB8Hiecm_FHmePjt2CJ8OQojgRlNbRXF1t8TLgYpIkK9S-FQJVMPDso")
    const data = await res.json()
    getProducts(data)
}

fetchProducts()


function getProducts(array) {
    for (const item in array) {
        let col = document.createElement("div")
        col.className = 'col-lg-4 col-md-6 col-sm-12'
        let box = document.createElement("div")
        box.className = 'box mt-4'
        col.appendChild(box)
        let img = document.createElement('img')
        img.src = array[item].image;
        img.alt = array[item].title
        img.className = 'w-75'
        box.appendChild(img)
        let boxHead = document.createElement('h6')
        boxHead.className = 'item-head text-capitalize'
        boxHead.innerHTML = array[item].title
        box.appendChild(boxHead)
        let price = document.createElement('h6')
        price.className = 'item-head text-capitalize'
        price.innerHTML = `${array[item].price}$`
        box.appendChild(price)
        let rate = document.createElement('div')
        rate.className = 'rate'
        for (let i = 0; i < 5; i++) {
            let rateIcon = document.createElement('i')
            rateIcon.className = 'bx bx-star'
            rate.appendChild(rateIcon)
        }
        box.appendChild(rate)
        let cartBtn = document.createElement('button')
        cartBtn.className = 'cart-btn btn btn-danger text-capitalize'
        cartBtn.innerHTML = 'add to cart'
        box.appendChild(cartBtn)
        if (productContent !== null ) {
            productContent.appendChild(col)
        }
    }
    let btns = document.querySelectorAll(".cart-btn")
    alertCart(btns, array)
}


const cartArray = []
function alertCart(btns, items) {
    btns.forEach(el => {
        el.addEventListener('click', () => {
            const condition = confirm('you sure to add this product to cart')
            if (condition) {
                // window.location.href = 'cart.html'
                const name = el.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML
                let newArray = items.map(ele => {
                    return el.name = name ? ele : ''
                })
                console.log(newArray)
                for (let index in newArray) {
                    if (newArray[index].title === name) {
                        console.log(newArray[index])
                        cartArray.push(newArray[index])
                    }
                }
                window.location.href = 'cart.html'
                // saveDataInLocaSorage()
            }
            saveDataInLocaSorage()
            getItemsFromLocalStorage()
        })
    });
}

function saveDataInLocaSorage() {
    localStorage.setItem("cartItems", JSON.stringify(cartArray))
}

function getItemsFromLocalStorage() {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems !== null) {
        const jsObject = JSON.parse(cartItems)
        for (data in jsObject) {
            let box = document.createElement('div')
            box.className = 'box mt-4 d-flex align-items-center justify-content-between'
            const img = document.createElement('img')
            img.src = jsObject[data].image;
            img.alt = jsObject[data].title
            img.className = 'w-25'
            box.appendChild(img)
            let info = document.createElement('div')
            info.className = 'text-center'
            let head = document.createElement('h6')
            head.className = 'ms-2'
            head.innerHTML = jsObject[data].title
            info.appendChild(head)
            let price = document.createElement('h6')
            price.className = 'price'
            price.innerHTML = `${jsObject[data].price}$`
            info.appendChild(price)
            box.appendChild(info)
            let icon = document.createElement('div')
            icon.className = 'icon fs-3'
            icon.style.cursor = 'pointer'
            icon.innerHTML = `<i class='bx bxs-trash-alt text-danger'></i>`
            box.appendChild(icon)
            if (cartContent !== null) {
                cartContent.appendChild(box)
            }
        }
        let icon = document.querySelectorAll('.icon')
        icon.forEach((el) => {
            el.addEventListener('click', function () {
                const name = el.previousElementSibling.firstChild.innerHTML
                const newCart = jsObject.filter(el => {
                    return el.title !== name
                })
                localStorage.setItem('cartItems', JSON.stringify(newCart))
                location.reload()
            })
        })
    }
}
getItemsFromLocalStorage()