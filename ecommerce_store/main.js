const cartBtn = document.querySelector("#cart-btn")
const searchInput = document.querySelector("#search-input")
const categoryFilter = document.querySelector("#category-filter")
const productGrid = document.querySelector("#product-grid")
const cartItems = document.querySelector("#cart-items")
const totalAmount = document.querySelector("#total-amount")
const cartPanel = document.querySelector(".cart-panel")
const modalImg = document.querySelector("#modal-img")
const modalName = document.querySelector("#modal-name")
const modalPrice = document.querySelector("#modal-price")
const modalCategory = document.querySelector("#modal-category")
const modalStock = document.querySelector("#modal-stock")
const modalDescription = document.querySelector("#modal-description")
const modalOverlay = document.querySelector("#modal-overlay")
const closeBtn = document.querySelector("#close-btn")

function renderProducts(list) {
    productGrid.innerHTML = ""
    list.forEach((product) => {
        const productCard = document.createElement("div")
        productCard.classList.add("product-card")
        const image = document.createElement("img")
        image.src = product.image
        image.alt = product.name
        image.classList.add("product-img")
        const productName = document.createElement("h3")
        productName.classList.add("product-name")
        productName.textContent = product.name
        const productPrice = document.createElement("p")
        productPrice.classList.add("product-price")
        productPrice.textContent = product.price + " TL"
        const addToCart = document.createElement("button")
        addToCart.classList.add("add-btn")
        addToCart.textContent = "Sepete ekle"
        productCard.addEventListener("click", () => {
            openProductDetail(product)
        })
        if (product.stock === 0) {
            addToCart.disabled = true
            addToCart.textContent = "Stokta yok"
        }
        addToCart.addEventListener("click", (e) => {
            e.stopPropagation()
            const cart = getCart()
            const existing = cart.find((p) => p.id === product.id)
            if (!existing) {
                cart.push({ id: product.id, quantity: 1 })
            }
            else {
                if (existing.quantity < product.stock) {
                    existing.quantity++
                }
                else {
                    alert("Stok miktarından fazla ürün eklenemez")
                }
            }
            saveCart(cart)
            renderCart()
        })
        productCard.append(image, productName, productPrice, addToCart)
        productGrid.appendChild(productCard)
    })
}
renderProducts(getProducts())
searchInput.addEventListener("input", () => {
    const filterValue = searchInput.value.toLowerCase().trim()
    const products = getProducts()
    const filtered = products.filter((p) => p.name.toLowerCase().includes(filterValue))
    renderProducts(filtered)
})
function renderCategories() {
    categoryFilter.innerHTML = ""
    const allBtn = document.createElement("button")
    allBtn.textContent = "Tümü"
    allBtn.classList.add("all-btn","button")
    allBtn.addEventListener("click", () => {
        renderProducts(getProducts())
    })
    categoryFilter.appendChild(allBtn)
    const products = getProducts()
    const categories = products.map((p) => p.category)
    const unique = [...new Set(categories)]
    unique.forEach((category) => {
        const categoryBtn = document.createElement("button")
        categoryBtn.classList.add("category-btn","button")
        categoryBtn.textContent = category
        categoryBtn.addEventListener("click", () => {
            const products = getProducts()
            const filtered = products.filter((p) => p.category === category)
            renderProducts(filtered)
        })
        categoryFilter.appendChild(categoryBtn)
    })
}
renderCategories()
function renderCart() {
    cartItems.innerHTML = ""
    const cart = getCart()
    const products = getProducts()
    let total = 0

    cart.forEach((item) => {
        const addedProduct = products.find((p) => p.id === item.id)
        if (!addedProduct) return
        const name = document.createElement("p")
        name.classList.add("name-in-cart")
        name.textContent = addedProduct.name
        const quantity = document.createElement("p")
        quantity.classList.add("quantity-in-cart")
        quantity.textContent = item.quantity
        const subtotal = document.createElement("p")
        subtotal.classList.add("subtotal-in-cart")
        const itemTotal = item.quantity * addedProduct.price
        subtotal.textContent = itemTotal + " TL"
        const decreaseBtn = document.createElement("button")
        decreaseBtn.classList.add("btn", "decrease")
        decreaseBtn.textContent = "-"
        decreaseBtn.addEventListener("click", () => {
            const cart = getCart()
            const existing = cart.find((c) => c.id === item.id)
            if (existing.quantity > 1) {
                existing.quantity--
            }
            saveCart(cart)
            renderCart()
        })
        const increaseBtn = document.createElement("button")
        increaseBtn.classList.add("btn", "increase")
        increaseBtn.textContent = "+"
        increaseBtn.addEventListener("click", () => {
            const cart = getCart()
            const existing = cart.find((c) => c.id === item.id)
            if (existing.quantity < addedProduct.stock) {
                existing.quantity++
            }
            else {
                alert("Stok miktarından fazla ürün eklenemez")
            }
            saveCart(cart)
            renderCart()
        })
        const removeBtn = document.createElement("button")
        removeBtn.classList.add("remove-btn")
        removeBtn.textContent = "Sil"
        removeBtn.addEventListener("click", () => {
            const cart = getCart()
            const updated = cart.filter((c) => c.id !== item.id)
            saveCart(updated)
            renderCart()
        })
        const addedDetails = document.createElement("div")
        addedDetails.classList.add("added-details")
        addedDetails.append(name, quantity, subtotal, decreaseBtn, increaseBtn, removeBtn)
        cartItems.appendChild(addedDetails)
        total = total + itemTotal

    })
    totalAmount.textContent = total + " TL"
}
renderCart()
cartBtn.addEventListener("click", () => {
    cartPanel.classList.toggle("hidden")
})
function openProductDetail(product) {
    modalImg.src = product.image
    modalImg.alt = product.name
    modalName.textContent = product.name
    modalPrice.textContent = product.price + " TL"
    modalCategory.textContent = product.category
    modalStock.textContent = product.stock + " adet"
    modalDescription.textContent = product.description
    modalOverlay.classList.remove("hidden")
}
closeBtn.addEventListener("click", () => {
  modalOverlay.classList.add("hidden")
})