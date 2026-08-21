const productName = document.querySelector("#product-name")
const productPrice = document.querySelector("#product-price")
const productCategory = document.querySelector("#product-category")
const productStock = document.querySelector("#product-stock")
const productDescription = document.querySelector("#product-description")
const addBtn = document.querySelector("#btn-add")
const productList = document.querySelector("#product-list")
const imageInput = document.querySelector("#product-image")
const imagePreview = document.querySelector("#image-preview")
let editingId = null
let currentImage = null

imageInput.addEventListener("change", () => {
    const file = imageInput.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
        const img = new Image()
        img.onload = () => {
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")
            const maxWidth = 400
            const ratio = img.height / img.width
            const newHeight = maxWidth * ratio
            canvas.width = maxWidth
            canvas.height = newHeight
            ctx.drawImage(img, 0, 0, maxWidth, newHeight)
            currentImage = canvas.toDataURL("image/jpeg", 0.7)
            imagePreview.src = currentImage
            console.log(currentImage.length)
        }
        img.src = reader.result
    }
    reader.readAsDataURL(file)
})
function saveProduct() {
    const name = productName.value.trim()
    const price = Number(productPrice.value.trim())
    const category = productCategory.value.trim()
    const stock = Number(productStock.value.trim())
    const description = productDescription.value.trim()
    if (!name || !price || !category) {
        alert("İsim ve fiyat bilgisi girilmesi zorunludur")
        return
    }
    if (Number.isNaN(price)) {
        alert("Fiyat geçerli bir sayı olmalı")
        return
    }

    const products = getProducts()
    if (editingId === null) {
        const product = {
            id: Date.now(),
            name: name,
            price: price,
            category: category,
            stock: stock,
            description: description,
            image: currentImage
        }
        products.push(product)
    }
    else {
        const product = products.find((p) => p.id === editingId)
        product.name = name
        product.price = price
        product.category = category
        product.stock = stock
        product.description = description
        if (currentImage !== null) {
            product.image = currentImage
        }
    }
    saveProducts(products)
    productName.value = ""
    productPrice.value = ""
    productCategory.value = ""
    productStock.value = ""
    productDescription.value = ""
    currentImage = null
    imageInput.value = ""
    imagePreview.src = ""
    editingId = null
    addBtn.textContent = "Ekle"
    renderProducts()
}
addBtn.addEventListener("click", saveProduct)
function renderProducts() {
    productList.innerHTML = ""
    const products = getProducts()
    products.forEach(function (product) {
        const addedList = document.createElement("div")
        addedList.classList.add("added-list")
        const detailsCard = document.createElement("div")
        detailsCard.classList.add("details-card")
        const btnCard = document.createElement("div")
        btnCard.classList.add("btn-card")
        const name = document.createElement("h3")
        name.classList.add("added-name")
        name.textContent = product.name
        const info = document.createElement("p")
        info.textContent = product.price + " TL · " + product.category + " · " + product.stock + " adet"
        const image = document.createElement("img")
        image.src = product.image
        image.alt = product.name
        const edit = document.createElement("button")
        edit.classList.add("edit-btn")
        edit.textContent = "Düzenle"
        edit.addEventListener("click", () => {
            productName.value = product.name
            productPrice.value = product.price
            productCategory.value = product.category
            productStock.value = product.stock
            productDescription.value = product.description
            imagePreview.src = product.image
            editingId = product.id
            addBtn.textContent = "Güncelle"
        })
        const remove = document.createElement("button")
        remove.classList.add("remove-btn")
        remove.textContent = "Sil"
        detailsCard.append(image, name, info)
        btnCard.append(edit, remove)
        remove.addEventListener("click", () => {
            const products = getProducts()
            const updated = products.filter((p) => p.id !== product.id)
            saveProducts(updated)
            renderProducts()
        })
        addedList.append(detailsCard, btnCard)
        productList.appendChild(addedList)
    })
}
renderProducts()
